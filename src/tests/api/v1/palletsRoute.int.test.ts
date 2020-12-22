import db from '../../../models';
import { ETablesToSeed, seed } from '../_seed_util_';
import app from '../../../app';
import request from 'supertest';
import configs from '../../../pallets';
import { EPalletCategories, ESupportedPallets } from '../../../pallets/pallets.types';
import { IPalletEntity } from '../../../entities/pallet.entity';

describe("Pallets route test", () => {

  beforeAll(async () => {
    db.sync({ force: true });
    await seed(
      ETablesToSeed.PALLET,
      ETablesToSeed.PALLET_CATEGORIES,
      ETablesToSeed.PALLET_DEPENDENCIES,
      ETablesToSeed.PALLET_AUTHORS
    );
  })

  afterAll(async () => {
    db.close();
  })

  test("List pallets test",() => {
    return request(app)
      .get('/api/v1/pallets')
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        expect(response.body).toBeDefined();
        expect(response.body.result).toBeDefined();
        expect(Array.isArray(response.body.result)).toBeDefined()

        expect(response.body.result).toHaveLength(Object.keys(configs).length);
      })
  })

  test("List only pallets of a specific category", () => {
    return request(app)
      .get(`/api/v1/pallets?category=${EPalletCategories.IDENTITY}`)
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        expect(response.body).toBeDefined();
        expect(response.body.result).toBeDefined();
        expect(Array.isArray(response.body.result)).toBeDefined()

        response.body.result.map((result: IPalletEntity) => {
          expect(result.categories.includes(EPalletCategories.IDENTITY))
        })
      })
  })

  test("List should return 422 for non existing category", () => {
    return request(app)
      .get(`/api/v1/pallets?category=NONEXISTINGCATEGORY`)
      .set('Accept', 'application/json')
      .expect(422)
      .then(response => {
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.code).toBe(422);
        expect(response.body.error.message).toBeDefined();
      })
  })

  test("Fetching non existing pallet should yield not found", () => {
    return request(app)
      .get(`/api/v1/pallets/nonExistingPalletName`)
      .set('Accept', 'application/json')
      .expect(404)
      .then(response => {
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.code).toBe(404);
        expect(response.body.error.message).toBeDefined();
      })
  })

  test("Fetching pallet", () => {
    return request(app)
      .get(`/api/v1/pallets/${ESupportedPallets.PALLET_DEMOCRACY}`)
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        expect(response.body).toBeDefined();
        expect(response.body.result).toBeDefined();

        expect(response.body.result.size).toBeDefined();
        expect(response.body.result.downloads).toBeDefined();
        expect(response.body.result.packageName).toBeDefined();
        expect(response.body.result.version).toBeDefined();
        expect(response.body.result.license).toBeDefined();
        expect(response.body.result.updated).toBeDefined();
        expect(response.body.result.description).toBeDefined();
        expect(response.body.result.shortDescription).toBeDefined();
        expect(response.body.result.compatibility).toBeDefined();
        expect(response.body.result.categories).toBeDefined();
        expect(response.body.result.authors).toBeDefined();
        expect(response.body.result.dependencies).toBeDefined();
        expect(response.body.result.dependencies.using).toBeDefined();
        expect(response.body.result.dependencies.usedBy).toBeDefined();
      })
  })
})

import db from '../../../models';
import { ETablesToSeed, seed } from '../_seed_util_';
import request from 'supertest';
import app from '../../../app';
import TemplatesRouteDefinitions from '../../../api/v1/definitions/templates.route';
import { ESupportedPallets } from '../../../pallets/pallets.types';
import { ModelsMockData } from '../../models/_mock_data_';
import IPostTemplateRequestBody = TemplatesRouteDefinitions.IPostTemplateRequestBody;

describe("Templates route test", () => {

  beforeAll(async (done) => {
    await db.sync({ force: true });
    await seed(
      ETablesToSeed.PALLET,
      ETablesToSeed.USER,
      ETablesToSeed.TEMPLATE,
      ETablesToSeed.TEMPLATE_DEPENDENCIES
    );

    done();
  })

  afterAll(async (done) => {
    db.close();

    done()
  })

  test("Template creation without logged in user", (done) => {
    return request(app)
      .post('/api/v1/templates')
      .expect(401)
      .then(() => {
        done()
      })
  })

  test("Template creation route", async (done) => {
    //@ts-ignore
    app.request.isAuthenticated = () => true;
    //@ts-ignore
    app.request.user = ModelsMockData.user;

    const payload: IPostTemplateRequestBody = {
      dependencies: [
        ESupportedPallets.PALLET_DEMOCRACY,
        ESupportedPallets.PALLET_MEMBERSHIP
      ],
      description: 'Example template',
      templateName: 'Template 1'
    }

    return request(app)
      .post('/api/v1/templates')
      .send(payload)
      .expect(200)
      .then(response => {
        expect(response.body).toBeDefined();
        expect(response.body.result).toBeDefined();
        done();
      })
  })

  test("Template creation with bad data should return validation error", async (done) => {
    //@ts-ignore
    app.request.isAuthenticated = () => true;
    //@ts-ignore
    app.request.user = ModelsMockData.user;

    const payload: any = {
      dependencies: [
        'asd',
        ESupportedPallets.PALLET_MEMBERSHIP
      ],
      description: 'Example template',
      templateName: true
    }

    return request(app)
      .post('/api/v1/templates')
      .send(payload)
      .expect(422)
      .then(response => {
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();

        expect(response.body.details.dependencies).toBeDefined();
        expect(response.body.details.templateName).toBeDefined();
        expect(response.body.details.description).toBeFalsy();

        done();
      })
  })

  test("Template list fetch", async (done) => {
    //@ts-ignore
    app.request.isAuthenticated = () => true;
    //@ts-ignore
    app.request.user = ModelsMockData.user;

    return request(app)
      .get('/api/v1/templates')
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        expect(response.body).toBeDefined();
        expect(response.body.result).toBeDefined();
        expect(Array.isArray(response.body.result)).toBeTruthy()

        expect(response.body.result).toHaveLength(2);

        expect(response.body.result[0].id).toBeDefined();
        expect(response.body.result[0].name).toBeDefined();
        expect(response.body.result[0].description).toBeDefined();
        expect(response.body.result[0].author).toBeDefined();
        expect(response.body.result[0].author.username).toBeDefined();
        expect(response.body.result[0].dependencies).toBeDefined();

        done()
      })
  })
})

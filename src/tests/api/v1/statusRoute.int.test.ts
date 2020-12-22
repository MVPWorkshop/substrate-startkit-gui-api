import request from 'supertest';
import app from '../../../app';

describe("Pallets route test", () => {
  test("List pallets test",(done) => {
    return request(app)
      .get('/api/v1/status')
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        expect(response.body).toBeDefined();
        expect(response.body.result).toBeDefined();
        expect(response.body.result.message).toBe("Server is alive.");

        done();
      })
  })
})

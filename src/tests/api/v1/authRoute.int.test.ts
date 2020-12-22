import app from '../../../app';
import { ModelsMockData } from '../../models/_mock_data_';
import request from 'supertest';
import { mapUserEntity } from '../../../entities/user.entity';

describe("Auth route test", () => {
  test("Me function works properly", async (done) => {
    //@ts-ignore
    app.request.isAuthenticated = () => true;
    //@ts-ignore
    app.request.user = mapUserEntity(ModelsMockData.user);

    return request(app)
      .get('/api/v1/me')
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        expect(response.body).toBeDefined();
        expect(response.body.result).toBeDefined();

        expect(response.body.result.id).toBe(ModelsMockData.user.id);
        expect(response.body.result.githubUserId).toBe(ModelsMockData.user.github_user_id);
        expect(response.body.result.githubUsername).toBe(ModelsMockData.user.github_username);

        done()
      })
  })
})

import db from '../../models';
import Session from '../../models/Session.model';
import { ModelsMockData } from './_mock_data_';

describe("Session model test", () => {
  beforeAll(async (done) => {
    await db.sync({force: true});
    done();
  })

  afterAll(async () => {
    await db.close();
  })

  describe("Session can be created", () => {
    it("Creates a new session entry", async () => {
      const dbData = await Session.create(ModelsMockData.session);

      expect(dbData).toBeTruthy();
      expect(dbData.sid).toBe(ModelsMockData.session.sid)
    })
  });

  describe("Session can be fetched", () => {
    it("Fetches a session based on SID", async () => {
      const dbData = await Session.findOne({
        where: {
          sid: ModelsMockData.session.sid
        }
      });

      expect(dbData).toBeTruthy();
      expect(dbData.sid).toBe(ModelsMockData.session.sid)
    })
  })
})

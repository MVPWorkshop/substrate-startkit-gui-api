import db from '../../models';
import Template from '../../models/Template.model';
import { ModelsMockData } from './_mock_data_';
import User from '../../models/User.model';
import TemplateDependency from '../../models/TemplateDependency.model';

describe("Template dependency model test", () => {
  beforeAll(async (done) => {
    await db.sync({force: true});
    done();
  })

  afterAll(async () => {
    await db.close();
  })

  describe("Template dependency creation", () => {
    test("Dependency can be created for an existing template", async () => {
      await User.create(ModelsMockData.user);
      await Template.create(ModelsMockData.template);

      const dbData = await TemplateDependency.create(ModelsMockData.templateDependency);

      expect(dbData).toBeTruthy();
      expect(dbData.id).toBe(ModelsMockData.templateDependency.id);
    })
  })

  describe("Template dependency can be fetched", () => {
    test("Template dependency can be fetched through the template_dependency table", async () => {
      const dbData = await TemplateDependency.findOne({
        where: {
          id: ModelsMockData.templateDependency.id
        }
      });

      expect(dbData).toBeTruthy();
      expect(dbData.id).toBe(ModelsMockData.templateDependency.id);
    })

    test("Template dependencies can be fetched through template table by relation", async () => {
      const templateDependencies = (await Template.findOne({
        where: {
          id: ModelsMockData.templateDependency.template_id
        },
        include: [
          { model: TemplateDependency }
        ]
      })).dependencies;

      expect(templateDependencies).toBeTruthy();
      expect(templateDependencies).toHaveLength(1);
    })
  })
})

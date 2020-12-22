import { mocked } from 'ts-jest/utils';
import TemplatesService from '../../services/templates.service';
import Template from '../../models/Template.model';
import TemplateDependency from '../../models/TemplateDependency.model';
import User from '../../models/User.model';
import { Op } from 'sequelize';
import { ESupportedPallets } from '../../pallets/pallets.types';

jest.mock('../../models/Template.model');
jest.mock('../../models/TemplateDependency.model');

describe("Templates Service test", () => {
  const MockedTemplateModel = mocked(Template, true);
  const MockedTemplateDependencyModel = mocked(TemplateDependency, true);

  beforeEach(() => {
    MockedTemplateModel.mockClear();
    MockedTemplateDependencyModel.mockClear();
  })

  describe("Template list function", () => {
    TemplatesService.list();

    test("Template model find all is called", () => {
      expect(MockedTemplateModel.findAll).toBeCalled();
    })

    test("User and template dependency joins are includes", () => {
      expect(MockedTemplateModel.findAll).toBeCalledWith({
        where: expect.anything(),
        include: [
          { model: User },
          { model: TemplateDependency }
        ]
      })
    })

    test("Only public templates are listed", () => {
      expect(MockedTemplateModel.findAll).toBeCalledWith({
        where: {
          [Op.or]: [ { public: true }, expect.anything() ]
        },
        include: expect.anything()
      })
    })
  })

  describe("Templates list function with user provided", () => {
    TemplatesService.list({
      githubUserId: 'testId',
      githubUsername: 'testUsername',
      id: '1234'
    });

    test("User is included in where clause", () => {
      expect(MockedTemplateModel.findAll).toBeCalledWith({
        where: {
          [Op.or]: [
            { public: true },
            { author_id: '1234' }
          ]
        },
        include: expect.anything()
      })
    })
  })

  describe("Finding template", () => {
    TemplatesService.getTemplateByName("templateExample");

    test("Find one on template model is called", () => {
      expect(MockedTemplateModel.findOne).toBeCalled();
    })

    test("Where clause includes \"templateExample\"", () => {
      expect(MockedTemplateModel.findOne).toBeCalledWith({
        where: {
          name: "templateExample"
        }
      })
    })
  })

  describe("Creating template", () => {
    const txMock = mocked({
      commit: jest.fn(),
      rollback: jest.fn()
    }, true)

    test("Template is created", async () => {
      await TemplatesService.createTemplate({
        dependencies: [
          ESupportedPallets.PALLET_ASSETS,
          ESupportedPallets.PALLET_TREASURY,
          ESupportedPallets.PALLET_MEMBERSHIP
        ],
        authorUserId: '1234',
        description: 'descriptionExample',
        public: true,
        templateName: 'templateNameExample'
        // @ts-ignore
      }, txMock)

      expect(MockedTemplateModel.create).toBeCalled();
    })
  })
});

import Template from '../models/Template.model';
import User from '../models/User.model';
import TemplateDependency from '../models/TemplateDependency.model';
import { IUser } from '../entities/user.entity';
import { Op, WhereOptions, Transaction } from 'sequelize';
import { ESupportedPallets } from '../pallets/pallets.types';

class TemplatesService {
  public static async list(user?: IUser): Promise<Template[]> {

    let condition: WhereOptions = {
      [Op.or]: [
        { public: true },
        user && { author_id: user.id }
      ]
    }

    return Template.findAll({
      where: condition,
      include: [
        { model: User },
        { model: TemplateDependency }
      ]
    });
  }

  public static async getTemplateByName(templateName: string): Promise<Template> {
    return Template.findOne({
      where: {
        name: templateName
      }
    })
  }

  public static async delete(templateName: string): Promise<void> {

  }

  public static async createTemplate(data: {
    templateName: string;
    authorUserId: string;
    description: string;
    public: boolean;
    dependencies: ESupportedPallets[];
  }, tx: Transaction): Promise<Template> {
    try {
      const dbTemplate = await Template.create({
        name: data.templateName,
        description: data.description,
        author_id: data.authorUserId,
        public: data.public
      }, { transaction: tx });


      const dpTemplateDependencies = data.dependencies.map(dependency => (
        TemplateDependency.create({
          template_name: dbTemplate.name,
          dependency_name: dependency
        }, { transaction: tx })
      ))

      await Promise.all(dpTemplateDependencies);

      await tx.commit();

      return dbTemplate.reload({
        include: [
          { model: User },
          { model: TemplateDependency }
        ]
      });
    } catch (error) {
      tx.rollback();
    }
  }
}

export default TemplatesService;

import { ESupportedPallets } from '../pallets/pallets.types';
import Template from '../models/Template.model';
import { mapTemplateDependencyEntity } from './templateDependency.entity';

export interface ITemplateEntity {
  id: string;
  name: string;
  description: string;
  author: {
    username: string;
  };
  dependencies: ESupportedPallets[];
}

export function mapTemplateEntity(template: Template): ITemplateEntity {
  return {
    id: template.id,
    name: template.name,
    author: {
      username: template.author.github_username
    },
    description: template.description,
    dependencies: template.dependencies.map(dependency => {
      return mapTemplateDependencyEntity(dependency).dependencyName
    })
  }
}

export function mapTemplateEntities(templates: Template[]): ITemplateEntity[] {
  return templates.map(template => mapTemplateEntity(template));
}

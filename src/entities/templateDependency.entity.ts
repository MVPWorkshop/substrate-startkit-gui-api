import { ESupportedPallets } from '../pallets/pallets.types';
import TemplateDependency from '../models/TemplateDependency.model';

export interface ITemplateDependencyEntity {
  id: string;
  templateId: string;
  dependencyName: ESupportedPallets;
}

export function mapTemplateDependencyEntity(templateDependency: TemplateDependency): ITemplateDependencyEntity {
  return {
    id: templateDependency.id,
    dependencyName: templateDependency.dependency_name,
    templateId: templateDependency.template_id
  }
}

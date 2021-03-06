import { IPalletAttributes } from '../../models/Pallet.model';
import { EPalletCategories, ESubstrateVersion, ESupportedPallets } from '../../pallets/pallets.types';
import moment from 'moment';
import { IPalletAuthorAttributes } from '../../models/PalletAuthor.model';
import { v4 } from 'uuid';
import { IPalletCategoryAttributes } from '../../models/PalletCategory.model';
import { IPalletDependencyAttributes } from '../../models/PalletDependency.model';
import { IUserAttributes } from '../../models/User.model';
import { ISessionAttributes } from '../../models/Session.model';
import { ITemplateAttributes } from '../../models/Template.model';
import { ITemplateDependencyAttributes } from '../../models/TemplateDependency.model';

const pallet: IPalletAttributes = {
  name: ESupportedPallets.PALLET_TREASURY,
  size: 1000,
  downloads: 0,
  package_name: 'pallet-treasury',
  version: '2.0.0',
  license: 'Apache',
  package_last_update: moment('18.10.2020', 'DD.MM.YYYY').toDate(),
  description: 'Long description',
  short_description: 'Short Description',
  compatibility: ESubstrateVersion.TWO,
}

const generateMockPallet = (palletName: ESupportedPallets, packageName: string): IPalletAttributes => {
  return {
    ...pallet,
    name: palletName,
    package_name: packageName
  }
}

const palletAuthor: IPalletAuthorAttributes = {
  id: v4(),
  author: 'TEST_AUTHOR',
  pallet_name: pallet.name
}

const palletCategory: IPalletCategoryAttributes = {
  id: v4(),
  category: EPalletCategories.GOVERNANCE,
  pallet_name: pallet.name
}

const palletDependency: IPalletDependencyAttributes = {
  id: v4(),
  dependency_pallet_name: ESupportedPallets.PALLET_MEMBERSHIP,
  pallet_name: pallet.name
}

const dependantPallet: IPalletDependencyAttributes = {
  id: v4(),
  dependency_pallet_name: pallet.name,
  pallet_name: ESupportedPallets.PALLET_DEMOCRACY
}

const user: IUserAttributes = {
  id: v4(),
  github_user_id: '42151917',
  github_username: 'pajicf'
}

const user2: IUserAttributes = {
  id: v4(),
  github_user_id: '42151918',
  github_username: 'username'
}

const session: ISessionAttributes = {
  data: 'testData',
  expires: moment('18.10.2020', 'DD.MM.YYYY').toDate(),
  sid: 'session_id'
}

const template: ITemplateAttributes = {
  id: v4(),
  author_id: user.id,
  description: 'example-description',
  name: 'Public template',
  public: true
}

const privateTemplate: ITemplateAttributes = {
  id: v4(),
  author_id: user2.id,
  description: 'private-example-description',
  name: 'Private template',
  public: false
}

const templateDependency: ITemplateDependencyAttributes = {
  id: v4(),
  dependency_name: ESupportedPallets.PALLET_DEMOCRACY,
  template_id: template.id
}

const privateTemplateDependency: ITemplateDependencyAttributes = {
  id: v4(),
  dependency_name: ESupportedPallets.PALLET_MEMBERSHIP,
  template_id: privateTemplate.id
}

export const ModelsMockData = {
  pallet,
  palletAuthor,
  palletCategory,
  palletDependency,
  dependantPallet,
  user,
  user2,
  session,
  template,
  privateTemplate,
  templateDependency,
  privateTemplateDependency,
  generateMockPallet
}

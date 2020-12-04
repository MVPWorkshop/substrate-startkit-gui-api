import { ICargoComplexDependency, IPalletConfig } from '../pallets/pallets.types';
import { tabs } from './common.util';

interface IGenerateCodeReturn {
  runtimeManifest: string;
}

class SubstrateManifestUtil {

  private _palletConfig: IPalletConfig<string>;
  private _runtimeManifest: string;

  constructor(palletConfig: IPalletConfig<string>, runtimeManifest: string) {
    this._palletConfig = palletConfig;
    this._runtimeManifest = runtimeManifest;
  }

  private regex = {
    simpleDependencies: new RegExp(/\[dependencies\]/),
    features: new RegExp(/\[features\][\s\S]+std\s+=\s+\[(?<stdDeps>[\s\S]+)\]/)
  }

  public get palletName() {
    return this._palletConfig.name;
  }

  public get palletAlias() {
    return this._palletConfig.dependencies.pallet.alias;
  }

  private generateComplexDependencyConfig(config: ICargoComplexDependency): string {

    const {
      version,
      package: palletPackageName,
      gitRepo,
      alias,
      defaultFeatures,
      tag,
      branch
    } = config;

    let dependencyCode = '';
    dependencyCode += `[dependencies.${alias}]\n`;
    dependencyCode += `default-features = ${defaultFeatures}\n`;
    gitRepo && (dependencyCode += `git = '${gitRepo}'\n`);
    dependencyCode += `package = '${palletPackageName}'\n`;
    tag && (dependencyCode += `tag = '${tag}'\n`);
    branch && (dependencyCode += `branch = '${branch}'\n`);
    dependencyCode += `version = '${version}'\n\n`;

    return dependencyCode;
  }

  private getManifestFeaturesCode() {
    const manifestFeatures = this.regex.features.exec(this._runtimeManifest);

    if (!manifestFeatures) {
      throw new Error("No manifest '[features]' found");
    }

    return manifestFeatures;
  }

  private getManifestSimpleDeps() {
    const simpleDeps = this.regex.simpleDependencies.exec(this._runtimeManifest);

    if (!simpleDeps) {
      throw new Error("No '[dependencies]' found inside code");
    }

    return simpleDeps;
  }

  private addPalletToManifest() {
    let dependencyCode = this.generateComplexDependencyConfig(this._palletConfig.dependencies.pallet)

    const stdCode = `${tabs(1)}'${this.palletAlias}/std',\n`

    const manifestFeatures = this.getManifestFeaturesCode();
    const oldManifestFeaturesCode = manifestFeatures[0];
    let newManifestFeaturesCode = dependencyCode + oldManifestFeaturesCode;

    const oldStd = manifestFeatures.groups.stdDeps;
    const newStd = oldStd + stdCode

    newManifestFeaturesCode = newManifestFeaturesCode.replace(oldStd, newStd);

    this._runtimeManifest = this._runtimeManifest.replace(manifestFeatures[0], newManifestFeaturesCode);
  }

  private addAdditionalDependencies() {
    if (!this._palletConfig.dependencies.additionalDeps) {
      return;
    }

    const manifestFeatures = this.getManifestFeaturesCode();
    const oldManifestFeaturesCode = manifestFeatures[0];
    let newManifestFeaturesCode = oldManifestFeaturesCode;

    const oldStd = manifestFeatures.groups.stdDeps;
    let newStd = oldStd;

    const simpleDependencies = this.getManifestSimpleDeps();
    const oldSimpleDependenciesCode = simpleDependencies[0];
    let newSimpleDependenciesCode = oldSimpleDependenciesCode;

    for (const dependency of this._palletConfig.dependencies.additionalDeps) {
      if (dependency.simple === true) {
        newSimpleDependenciesCode += `\n${dependency.package} = '${dependency.version}'`;
      } else {
        newManifestFeaturesCode = this.generateComplexDependencyConfig(dependency) + newManifestFeaturesCode;
        newStd += `${tabs(1)}'${dependency.alias}/std',\n`
      }
    }

    newManifestFeaturesCode = newManifestFeaturesCode.replace(oldStd, newStd);

    this._runtimeManifest = this._runtimeManifest.replace(oldManifestFeaturesCode, newManifestFeaturesCode);
    this._runtimeManifest = this._runtimeManifest.replace(oldSimpleDependenciesCode, newSimpleDependenciesCode);
  }

  public generateCode(): IGenerateCodeReturn {

    this.addPalletToManifest();
    this.addAdditionalDependencies();

    return {
      runtimeManifest: this._runtimeManifest
    }
  }
}

export default SubstrateManifestUtil;

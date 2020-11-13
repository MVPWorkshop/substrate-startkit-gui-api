import { IPalletConfig } from '../pallets/pallets.types';
import { tabs, toPascalCase, toSnakeCase } from './common.util';

interface IGenerateCodeReturn {
  runtimeLib: string;
  chainSpec: string;
}

class SubstrateRuntimeUtil {
  private _palletConfig: IPalletConfig<string>;
  private _runtimeCode: string;
  private _chainSpecCode: string;

  public regex: {
    palletTrait: RegExp;
    constructRuntime: RegExp;
    additionalCode: RegExp;
    additionalGenesisVariables: RegExp;
    genesisConfig: RegExp;
  }

  constructor(palletConfig: IPalletConfig<string>, runtimeCode: string, chainSpecCode: string) {
    this._palletConfig = palletConfig;
    this._runtimeCode = runtimeCode;
    this._chainSpecCode = chainSpecCode;

    this.regex = {
      palletTrait: new RegExp(/`^impl\s+/ + this.palletName + /::Trait\s+for\s+Runtime\s+\{{[^\}}]+\}}`/),
      constructRuntime: new RegExp(/construct_runtime!\(\s+pub\s+enum\s+Runtime[^{]+\{(?<pallets>[\s\S]+)\}\s+\);/),
      additionalCode: new RegExp(/\/\/Additional code/),
      additionalGenesisVariables: new RegExp(/\/\/Additional genesis variables/),
      genesisConfig: new RegExp(/fn\s+testnet_genesis[^{]+\{[\s\S]+GenesisConfig\s+\{(?<configs>[\s\S]+)\}\s+\}/)
    }

    if (!this.regex.constructRuntime.test(runtimeCode)) {
      throw new Error("Couldn't find construct runtime inside the provided code");
    }
  }

  public get palletName() {
    return this._palletConfig.name;
  }

  public get palletAlias() {
    return this._palletConfig.dependencies.pallet.alias;
  }

  public checkIfPalletImplemented() {
    // Testing with regex if pallet of same alias is already present in the code
    return this.regex.palletTrait.test(this._runtimeCode);
  }

  private updateConstructRuntime(newCode: string) {
    const updatedCode = this._runtimeCode.replace(this.regex.constructRuntime, newCode);

    this._runtimeCode = updatedCode;
  }

  // Function used to implement pallet traits inside the code
  private addPalletTraits() {
    let traitImplementation = `impl ${toSnakeCase(this.palletAlias)}::Trait for Runtime { \n`;
    let parameterTypes = `parameter_types! { \n`;

    // Counter which indicates if we should add parameterTypes to the code
    let customParameterCounter = 0;

    // Looping through the pallets traits in order to generate the code inside macros for them
    for (const traitName in this._palletConfig.runtime.palletTraits) {
      const trait = this._palletConfig.runtime.palletTraits[traitName];

      if (typeof trait === 'string') {
        // If trait is a string, we just copy the value to the right side of the trait name
        traitImplementation += `${tabs(1)}type ${traitName} = ${trait};\n`;
      } else {
        // If object, it's a bit more sophisticated so we need to first add it to the
        // parameter types and then we can use it
        parameterTypes += `${tabs(1)}pub ${trait.isNotConst ? '' : 'const'} ${traitName}: ${trait.type} = ${trait.value};\n`

        // Adding the trait
        traitImplementation += `${tabs(1)}type ${traitName} = ${traitName};\n`;

        // We add +1 to the counter
        customParameterCounter++;
      }
    }

    traitImplementation += '}\n\n';
    parameterTypes += '}\n\n';

    // We find the "construct_runtime" macro inside the runtime/lib.rs code so that we can modify it
    let constructRuntime = this.regex.constructRuntime.exec(this._runtimeCode)[0];

    // We add the implementation of the pallet for the runtime trait
    constructRuntime = traitImplementation + constructRuntime;

    // If needed we also add the parameter types macro
    if (customParameterCounter) {
      constructRuntime = parameterTypes + constructRuntime;
    }

    this.updateConstructRuntime(constructRuntime);
  }

  // Adds the pallet to construct runtime macro
  private addPalletToConstructRuntime() {
    let constructRuntimeModule = `${tabs(2)}${toPascalCase(this.palletAlias)}: ${toSnakeCase(this.palletAlias)}::{`;

    const numberOfModules = this._palletConfig.runtime.constructRuntime.modules.length
    for (let i = 0; i < numberOfModules; i++) {
      const module = this._palletConfig.runtime.constructRuntime.modules[i];

      let isGenericModule = false;
      if (this._palletConfig.runtime.constructRuntime.generic) {
        // @ts-ignore Because it won't really matter if we index it with a key that doesn't exist it will return undefined
        isGenericModule = !!this._palletConfig.runtime.constructRuntime.generic[module];
      }
      const generateDash = numberOfModules - 1 === i ? '' : ',';

      if (isGenericModule) {
        constructRuntimeModule += `${module}<T>${generateDash} `
      } else {
        constructRuntimeModule += `${module}${generateDash} `
      }
    }

    constructRuntimeModule += '},\n'

    let constructRuntime = this.regex.constructRuntime.exec(this._runtimeCode)[0];
    constructRuntime = constructRuntime.slice(0, -6) + constructRuntimeModule + constructRuntime.slice(-6);

    this.updateConstructRuntime(constructRuntime);
  }

  // Function which adds any additional code needed for the code to compile
  private addAdditionalCode(existingCode: string, additionalCode: string[], testRegex: RegExp): string {

    if (!additionalCode || !additionalCode.length) {
      return existingCode;
    }

    let additionalRuntimeCode = '';

    // Mapping through additional code
    additionalCode.map(additionalCode => {
      additionalRuntimeCode = additionalRuntimeCode + `${additionalCode}\n`;
    })

    const additionalCodeRegex = testRegex.exec(existingCode);

    if (!additionalCodeRegex) {
      throw new Error("Provided code doesn't contain additional code flag")
    }

    const positionOfAdditionalCode = additionalCodeRegex.index + additionalCodeRegex[0].length;

    return existingCode.slice(0, positionOfAdditionalCode) + '\n\n' + additionalRuntimeCode + existingCode.slice(positionOfAdditionalCode)
  }

  // Function which adds configuration to the genesis config (chain_spec.rs file)
  private addChainSpecCode() {
    if (!this._palletConfig.runtime.genesisConfig) {
      return;
    }

    const genesisConfig = this.regex.genesisConfig.exec(this._chainSpecCode);

    if (!genesisConfig) {
      throw new Error("No genesis config inside code!")
    }

    let genesisConfigCode = genesisConfig.groups.configs;

    const { configStructName, structFields } = this._palletConfig.runtime.genesisConfig;

    genesisConfigCode += `${tabs(1)}`;
    genesisConfigCode += `${toSnakeCase(this.palletAlias)}: Some(${configStructName} {\n`;

    for (const structField in structFields) {
      // Adds the property of the struct
      genesisConfigCode += `${tabs(3)}${structField}: `;
      // Gives the value to the property
      genesisConfigCode += `${structFields[structField]},\n`;
    }

    genesisConfigCode += `${tabs(2)}}),\n`

    this._chainSpecCode = this._chainSpecCode.replace(genesisConfig.groups.configs, genesisConfigCode);
  }

  private addAdditionalChainSpecCode() {
    if (!this._palletConfig.runtime.additionalChainSpecCode) {
      return;
    }

    this._chainSpecCode = this.addAdditionalCode(
      this._chainSpecCode,
      this._palletConfig.runtime.additionalChainSpecCode.additionalCode,
      this.regex.additionalCode
    );

    this._chainSpecCode = this.addAdditionalCode(
      this._chainSpecCode,
      this._palletConfig.runtime.additionalChainSpecCode.additionalVariables,
      this.regex.additionalGenesisVariables
    )
  }

  private addAdditionalRuntimeCode() {
    this._runtimeCode = this.addAdditionalCode(
      this._runtimeCode,
      this._palletConfig.runtime.additionalRuntimeLibCode,
      this.regex.additionalCode
    )
  }

  public generateCode(): IGenerateCodeReturn {

    // We check if pallet implemented so we don't write double code
    if (!this.checkIfPalletImplemented()) {
      this.addPalletTraits();
      this.addPalletToConstructRuntime();
      this.addAdditionalRuntimeCode();
      this.addChainSpecCode();
      this.addAdditionalChainSpecCode();
    }

    return {
      chainSpec: this._chainSpecCode,
      runtimeLib: this._runtimeCode
    }
  }
}

export default SubstrateRuntimeUtil;

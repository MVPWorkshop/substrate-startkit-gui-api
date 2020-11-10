import { ESupportedPallets, IPalletConfig } from '../pallets/pallets.types';
import FileUtil from '../utils/file.util';
import { IUser } from '../entities/user.entity';
import Pallets from '../pallets';
import { palletsIncludedInTemplate } from '../config/constants.config';
import SubstrateRuntimeUtil from '../utils/substrateRuntime.util';
import SubstrateManifestUtil from '../utils/substrateManifest.util';

// Map indicating if the pallet has been generated or not
type GeneratedPalletsMap = Map<ESupportedPallets, boolean>;

class CodeGeneratorService {

  private _templatePath = './generator/template'
  private _generatedPallets: GeneratedPalletsMap = new Map<ESupportedPallets, boolean>();

  private _runtimeCode = '';
  private _runtimeManifestCode = '';
  private _chainspecCode = '';

  constructor() {
    // Setting the already "generated" pallet map for the pallets included by default
    palletsIncludedInTemplate.map(palletName => {
      this._generatedPallets.set(palletName, true)
    });
  }

  // Creates a new directory named after the userId and the time of generating,
  // after that it copies the template files into the newly created project
  private async createNewProject(userId: string): Promise<string> {
    const newProjectPath = await FileUtil.createDirectory(`./generator/temporary/${Date.now()}-${userId}`)
    await FileUtil.copyDirectory(this._templatePath, newProjectPath);

    return newProjectPath;
  }

  public static async removeProject(projectPath: string) {
    await FileUtil.removeDirectory(projectPath);
  }

  private updateRuntime(config: IPalletConfig<string>) {
    const substrateRuntimeUtil = new SubstrateRuntimeUtil(config, this._runtimeCode, this._chainspecCode);
    const { runtimeLib, chainSpec } = substrateRuntimeUtil.generateCode();

    this._runtimeCode = runtimeLib;
    this._chainspecCode = chainSpec;
  }

  private updateManifest(config: IPalletConfig<string>) {
    const substrateManifestUtil = new SubstrateManifestUtil(config, this._runtimeManifestCode);
    const { runtimeManifest } = substrateManifestUtil.generateCode();

    this._runtimeManifestCode = runtimeManifest;
  }

  private addPalletToCode(palletName: ESupportedPallets)  {

    const isPalletGenerated = this._generatedPallets.get(palletName);
    if (isPalletGenerated) {
      return; // Checking to see if this pallet was already generated, no point in doing it again.
    }

    const config = Pallets[palletName];

    // Checking if config specified any additional (dependant) pallets
    if (config.dependencies.additionalPallets) {
      // Loop through dependencies of each pallet to ensure that it's in code
      for (const palletDependency of config.dependencies.additionalPallets) {
        // We call this function recursively to add new pallets and by adding
        // the dependencies first we ensure the code is in correct order.
        if (palletDependency.shouldImplement) {
          this.addPalletToCode(palletDependency.palletName);
        }
      }
    }

    this.updateRuntime(config);
    this.updateManifest(config);
    this._generatedPallets.set(palletName, true);
  }

  /**
   * @description Function which generates a susbstrate runtime for the given combination of pallets
   * @param pallets
   * @param user
   * @return string Returns the path of the generated project
   */
  public async generateSubstrateProject(pallets: ESupportedPallets[], user: IUser): Promise<string> {
    const projectPath = await this.createNewProject(user.id);

    try {
      const runtimeLibPath = `${projectPath}/runtime/src/lib.rs`;
      const runtimeManifestPath = `${projectPath}/runtime/Cargo.toml`;
      const chainspecPath = `${projectPath}/node/src/chain_spec.rs`;

      // Reading the code from the file inside the temporary project folder
      this._runtimeCode = (await FileUtil.readFile(runtimeLibPath)).toString();
      this._runtimeManifestCode = (await FileUtil.readFile(runtimeManifestPath)).toString();
      this._chainspecCode = (await FileUtil.readFile(chainspecPath)).toString();
console.log(pallets)
      // Looping through given pallets to add them to code
      for (const pallet of pallets) {
        this.addPalletToCode(pallet);
      }

      await FileUtil.writeFile(runtimeLibPath, this._runtimeCode);
      await FileUtil.writeFile(chainspecPath, this._chainspecCode);
      await FileUtil.writeFile(runtimeManifestPath, this._runtimeManifestCode)

      return projectPath;

    } catch (error) {
      await CodeGeneratorService.removeProject(projectPath)

      throw error;
    }
  }
}

export default CodeGeneratorService;

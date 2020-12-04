import SubstrateManifestUtil from '../utils/substrateManifest.util';
import PalletValidatorSetConfig from '../pallets/configs/pallet_validator_set.config';

const manifestCode = '[package]\nauthors = [\'Substrate DevHub <https:\/\/github.com\/substrate-developer-hub>\']\nedition = \'2018\'\nhomepage = \'https:\/\/substrate.dev\'\nlicense = \'Unlicense\'\nname = \'node-template-runtime\'\nrepository = \'https:\/\/github.com\/substrate-developer-hub\/substrate-node-template\/\'\nversion = \'2.0.0\'\n\n[package.metadata.docs.rs]\ntargets = [\'x86_64-unknown-linux-gnu\']\n\n[build-dependencies]\nwasm-builder-runner = { package = \'substrate-wasm-builder-runner\', version = \'2.0.0\' }\n\n# alias \"parity-scale-code\" to \"codec\"\n[dependencies.codec]\ndefault-features = false\nfeatures = [\'derive\']\npackage = \'parity-scale-codec\'\nversion = \'1.3.4\'\n\n[dependencies]\nbigint = \'4.2.0\'\nhex-literal = { optional = true, version = \'0.3.1\' }\nserde = { features = [\'derive\'], optional = true, version = \'1.0.101\' }\n\n# Substrate dependencies\nframe-benchmarking = { default-features = false, optional = true, version = \'2.0.0\' }\nframe-executive = { default-features = false, version = \'2.0.0\' }\nframe-support = { default-features = false, version = \'2.0.0\' }\nframe-system = { default-features = false, version = \'2.0.0\' }\nframe-system-benchmarking = { default-features = false, optional = true, version = \'2.0.0\' }\nframe-system-rpc-runtime-api = { default-features = false, version = \'2.0.0\' }\npallet-aura = { default-features = false, version = \'2.0.0\' }\npallet-balances = { default-features = false, version = \'2.0.0\' }\npallet-grandpa = { default-features = false, version = \'2.0.0\' }\npallet-randomness-collective-flip = { default-features = false, version = \'2.0.0\' }\npallet-sudo = { default-features = false, version = \'2.0.0\' }\npallet-timestamp = { default-features = false, version = \'2.0.0\' }\npallet-transaction-payment = { default-features = false, version = \'2.0.0\' }\npallet-transaction-payment-rpc-runtime-api = { default-features = false, version = \'2.0.0\' }\nsp-api = { default-features = false, version = \'2.0.0\' }\nsp-block-builder = { default-features = false, version = \'2.0.0\' }\nsp-consensus-aura = { default-features = false, version = \'0.8.0\' }\nsp-core = { default-features = false, version = \'2.0.0\' }\nsp-inherents = { default-features = false, version = \'2.0.0\' }\nsp-offchain = { default-features = false, version = \'2.0.0\' }\nsp-runtime = { default-features = false, version = \'2.0.0\' }\nsp-session = { default-features = false, version = \'2.0.0\' }\nsp-std = { default-features = false, version = \'2.0.0\' }\nsp-transaction-pool = { default-features = false, version = \'2.0.0\' }\nsp-version = { default-features = false, version = \'2.0.0\' }\nsp-io = { default-features = false, version = \'2.0.0\' }\nsp-staking = { default-features = false, version = \'2.0.0\' }\n\n[features]\ndefault = [\'std\']\nruntime-benchmarks = [\n    \'hex-literal\',\n    \'frame-benchmarking\',\n    \'frame-support\/runtime-benchmarks\',\n    \'frame-system-benchmarking\',\n    \'frame-system\/runtime-benchmarks\',\n    \'pallet-balances\/runtime-benchmarks\',\n    \'pallet-timestamp\/runtime-benchmarks\',\n    \'sp-runtime\/runtime-benchmarks\',\n]\nstd = [\n    \'codec\/std\',\n    \'serde\',\n    \'frame-executive\/std\',\n    \'frame-support\/std\',\n    \'frame-system\/std\',\n    \'frame-system-rpc-runtime-api\/std\',\n    \'pallet-aura\/std\',\n    \'pallet-balances\/std\',\n    \'pallet-grandpa\/std\',\n    \'pallet-randomness-collective-flip\/std\',\n    \'pallet-sudo\/std\',\n    \'pallet-timestamp\/std\',\n    \'pallet-transaction-payment\/std\',\n    \'pallet-transaction-payment-rpc-runtime-api\/std\',\n    \'sp-api\/std\',\n    \'sp-block-builder\/std\',\n    \'sp-consensus-aura\/std\',\n    \'sp-core\/std\',\n    \'sp-inherents\/std\',\n    \'sp-offchain\/std\',\n    \'sp-runtime\/std\',\n    \'sp-session\/std\',\n    \'sp-std\/std\',\n    \'sp-transaction-pool\/std\',\n    \'sp-version\/std\',\n    \'sp-io\/std\',\n    \'sp-staking\/std\',\n]';

describe('Manifest is generated correctly for provided pallets', () => {

  const palletConfig = PalletValidatorSetConfig;
  const palletName = 'substrate-validator-set';
  const palletAlias = 'validator-set';

  const utilInstance = new SubstrateManifestUtil(palletConfig, manifestCode);

  test(`Pallet name should be ${palletName}`, () => {
    expect(utilInstance.palletName).toEqual(palletName);
  })
  test(`Pallet alias should be ${palletAlias}`, () => {
    expect(utilInstance.palletAlias).toEqual(palletAlias);
  })

  const newManifestCode = utilInstance.generateCode().runtimeManifest;

  test("Pallet is added to the manifest", () => {
    const isPalletPresent: boolean = newManifestCode.includes(
      `[dependencies.${palletAlias}]`
    );

    expect(isPalletPresent).toBeTruthy();
  })

  test("Std feature of pallet is added to the std list", () => {
    const isStdAdded: boolean = newManifestCode.includes(
      `${palletAlias}/std`
    );

    expect(isStdAdded).toBeTruthy();
  })
})

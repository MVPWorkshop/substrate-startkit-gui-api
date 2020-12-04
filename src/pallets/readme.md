# Writing pallet configs

Every pallet should have it's own config file defined inside the `/src/pallets/configs` folder

The config file should export a const object which implement the `IPalletConfig` interface

When implementing the interface we also define all possible `Traits` and `GenesisConfig` fields
of the implementing pallet.

The interface consist of `name`, `metadata`, `runtime` and `dependencies` fields

- `name` Defines the name of the pallet and is an enum value of `ESupportedPallets`,
   this is because when later we define dependencies of another pallet we can link it
   to existing config through the unique name using the enum
- `metada` It simply contains some relevant metadata of the pallet, nothing special here
- `runtime` This object contains most of the required data for generating the code for the
  pallet needed to insert into the node. It contains runtime modules needed for it to be
  implemented inside `construct_runtime`, values for Trait implementation and data
  for the genesis config. If some code is unique and couldn't easily been abstracted it's
  put inside the `additionalChainSpecCode` and `additionalRuntimeLibCode` fields
- `dependencies` This field defines the pallets dependency data to put inside the `Cargo.toml`
  file, additional pallets it needs (This is where the `ESupportedPallets` enum comes in handy,
  because we can now recursively find dependencies and insert them into the code if not already
  inserted), and also other standard deps needed for the pallet to function

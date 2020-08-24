# Substrate startkit gui API
API for substrate startkit gui frontend

# Requirements
- On your computer
    * Installed [yarn](https://yarnpkg.com/) package manager
    * Installed globally `nodemon`, `sequelize-cli`
    * Installed [PostgreSQL](https://www.postgresql.org/)
    * Installed [GIT](https://git-scm.com/) version control system

# Installation guide

Once you have cloned the repo on your computer you
can start configuring the backend application by
following next steps:

1. Navigate to the root of the project
2. Run `yarn` to install dependencies
3. Setup the postgres database
4. In the root of the project, create `.env` file
5. Fill the `.env` file, example of the values can
   be copied from the `.env.example` file (NOTE: All values should be filled)
   
   - `GITHUB_APP_CLIENT_ID` and `GITHUB_APP_CLIENT_SECRET`
     can be obtained by following this [guide](https://docs.github.com/en/developers/apps/creating-an-oauth-app)
        * For the callback URL you will use 
          `[HOST_ADDRESS]+'/api/v1/auth/github/callback'`
6. Build the project
    - Windows: `yarn windows:build`
    - Mac/Linux: `yarn build`
7. Run migrations
    - Windows: `yarn windows:migrate`
    - Mac/Linux: `yarn migrate`
8. Run seeders
    - Windows: `yarn windows:seed`
    - Mac/Linux: `yarn seed`
9. After everything has been completed, to run the
   app, use the `yarn dev` command for dev environment 
   or `yarn start` for production build

# Additional

**Note:** Below instructions were taken from nodegit *(0.27.0)* README which you can
read directly [here](https://github.com/nodegit/nodegit/blob/master/README.md)

---

If you receive errors about libstdc++, which are commonly experienced when
building on Travis-CI, you can fix this by upgrading to the latest
libstdc++-4.9.

In Ubuntu:

``` sh
sudo add-apt-repository ppa:ubuntu-toolchain-r/test
sudo apt-get update
sudo apt-get install libstdc++-4.9-dev
```

In Travis:

``` yaml
addons:
  apt:
    sources:
      - ubuntu-toolchain-r-test
    packages:
      - libstdc++-4.9-dev
```

In CircleCI:

``` yaml
  dependencies:
    pre:
      - sudo add-apt-repository -y ppa:ubuntu-toolchain-r/test
      - sudo apt-get update
      - sudo apt-get install -y libstdc++-4.9-dev
```

If you receive errors about *lifecycleScripts* preinstall/install you probably miss *libssl-dev*
In Ubuntu:
```
sudo apt-get install libssl-dev
```

You will need the following libraries installed on your linux machine:
  - libpcre
  - libpcreposix
  - libkrb5
  - libk5crypto
  - libcom_err

When building locally, you will also need development packages for kerberos and pcre, so both of these utilities must be present on your machine:
  - pcre-config
  - krb5-config

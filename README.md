# Substrate startkit gui API
API for substrate startkit gui frontend

# Requirements
- On your computer
    * If setting up using Docker
        * Installed [Docker](https://www.docker.com/)
        * Installed docker-compose (Bundled with the official Docker setup)
    * If setting up locally
        * Installed [yarn](https://yarnpkg.com/) package manager
        * Installed [PostgreSQL](https://www.postgresql.org/)
        * Installed [GIT](https://git-scm.com/) version control system

# Installation guide

Once you have cloned the repo on your computer you
can start configuring the backend application by
following next steps:

1. Navigate to the root of the project
2. In the root of the project, create `.env` file
3. Fill the `.env` file, example of the values can
   be copied from the `.env.example` file or `.env.example.docker` if using docker (NOTE: All values should be filled)
   
   - `GITHUB_APP_CLIENT_ID` and `GITHUB_APP_CLIENT_SECRET`
     can be obtained by following this [guide](https://docs.github.com/en/developers/apps/creating-an-oauth-app)
        * For the callback URL you will use 
          `[HOST_ADDRESS]+'/api/v1/auth/github/callback'`
---
After you complete the previous steps, the following instruction will vary based on that
if you're trying to run the project using docker or your local setup
---
## Docker setup
1. Run `docker-compose up`
2. That's it!

(Note) If you've pulled new code files you'll have to rebuild the Docker image using `docker-compose build --no-cache node_backend`

## Local setup
1. Run `yarn` to install dependencies
2. Setup the postgres database: `createdb <your_database_name>`
3. Build the project
    - Windows: `yarn windows:build`
    - Mac/Linux: `yarn build`
4. Run migrations
    - Windows: `yarn windows:migrate`
    - Mac/Linux: `yarn migrate`
5. Run seeders
    - Windows: `yarn windows:seed`
    - Mac/Linux: `yarn seed`
6. After everything has been completed, to run the
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

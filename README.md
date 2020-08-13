# Substrate startkit gui API
API for substrate startkit gui frontend

# Requirements
- On your computer
    * Installed [yarn](https://yarnpkg.com/) package manager
    * Installed globally `nodemon`, `sequelize-cli`
    * Installed [PostgreSQL](https://www.postgresql.org/)

# Installation guide

Once you have cloned the repo on your computer you
can start configuring the backend application by
following next steps:

1. Navigate to the root of the project
2. Run `yarn` to install dependencies
3. Setup the postgres database
4. In the root of the project, create `.env` file
5. Fill the `.env` file, example of the values can
   be copied from the `.env.example` file
   
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

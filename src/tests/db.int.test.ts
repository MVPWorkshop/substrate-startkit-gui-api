import db from '../models';

describe("Test if db works", () => {

  // Before any tests run, clear the DB and run migrations with Sequelize sync()
  beforeAll(async () => {
    await db.sync({ force: true })
  })

  test("Database connection can be established", async () => {
    await db.authenticate()
  })
})

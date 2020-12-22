import db from '../../models';

describe("Test if db works", () => {
  test("Database connection can be established", async () => {
    await db.authenticate()
  })
})

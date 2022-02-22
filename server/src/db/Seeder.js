/* eslint-disable no-console */
import { connection } from "../boot.js"
import userSeeder from "./seeders/userSeeder.js"
import modelSeeder from "./seeders/modelSeeder.js"


class Seeder {
  static async seed() {
    console.log("seeding models")
    await modelSeeder.seed()
    console.log("seeding admin")
    await userSeeder.seed()
    // include individual seed commands heressss
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
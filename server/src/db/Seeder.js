/* eslint-disable no-console */
import { connection } from "../boot.js"
import userSeeder from "./seeders/userSeeder.js"
import modelSeeder from "./seeders/modelSeeder.js"
import 'dotenv/config'


class Seeder {
  static async seed() {
    /* console.log("seeding models")
    await modelSeeder.seed()
    console.log("seeding admin")
    await userSeeder.seed() */
    console.log("start date")
    console.log(process.env.START_DATE)
    process.env.START_DATE = Date.now()
    console.log(process.env.START_DATE)
    // include individual seed commands heressss
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
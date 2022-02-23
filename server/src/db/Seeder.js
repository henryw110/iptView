/* eslint-disable no-console */
import { connection } from "../boot.js"
import userSeeder from "./seeders/userSeeder.js"
import modelSeeder from "./seeders/modelSeeder.js"
import bucketManager from "./seeders/cleanBuckets.js"
import 'dotenv/config'


class Seeder {
  static async seed() {
    console.log("seeding models")
    await modelSeeder.seed()
    console.log("cleaning buckets")
    await bucketManager.cleanBuckets()
    console.log("seeding admin")
    await userSeeder.seed()
    console.log("start date")
    process.env.START_DATE = Date.now()
    console.log(process.env.START_DATE)
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
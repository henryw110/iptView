/* eslint-disable no-console */
import { connection } from "../boot.js"
import userSeeder from "./seeders/userSeeder.js"
import modelSeeder from "./seeders/modelSeeder.js"
import bucketManager from "./seeders/cleanBuckets.js"
import seedBuckets from "./seeders/seedBuckets.js"
import 'dotenv/config'


class Seeder {
  static async seed() {
    console.log("cleaning buckets")
    await bucketManager.cleanBuckets()
    console.log("seeding user")
    await userSeeder.seed()
    
    await seedBuckets.seed()
    console.log("seeding models")
    //await modelSeeder.seed()
    await connection.destroy()
  }
}

export default Seeder
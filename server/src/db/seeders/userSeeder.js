import 'dotenv/config'

import { User } from "../../models/index.js";

class userSeeder {
  static async seed() {
    console.log("start date")
    console.log(process.env.START_DATE)
    process.env.START_DATE = Date.now()
    console.log(process.env.START_DATE)
    const modelData = [
      {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      }
    ]
    for (const singleUserData of modelData) {
      await User.query().insertAndFetch(singleUserData)
    }
  }
}
export default userSeeder
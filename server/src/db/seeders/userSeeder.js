import 'dotenv/config'

import { User, Bucket } from "../../models/index.js";

class userSeeder {
  static async seed() {
    const modelData = [
      {
        email: process.env.SEEDED_EMAIL,
        password: process.env.SEEDED_PASSWORD
      }
    ]
    for (const singleUserData of modelData) {
      await User.query().insertAndFetch(singleUserData)
    }

  }
}
export default userSeeder
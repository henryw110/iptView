
import pkg from "forge-apis"
import oauth from '../../routes/common/oauth.js'
const { getClient, getInternalToken } = oauth;
const { BucketsApi, ObjectsApi, PostBucketsPayload } = pkg
import config from '../../config.js';
import 'dotenv/config'
import { User, Bucket } from "../../models/index.js"


class seedBuckets {
  static async seed() {

    const token = await getInternalToken();
    const oauth_token = token;
    const oauth_client = getClient();

   await Bucket.query().insertAndFetch({ bucketKey: "aoagkn1r9smdh7lawgbytt5gaseamtpc-demo" })

    const usersList = await User.query().select("id", "email")

    await Promise.all(usersList.map(async (element) => {
      const regex = /[^-_.a-z0-9]/g
      let statusCode = 409
      const bucketKey = (config.credentials.client_id + "-" + (element.email.replace(regex, ""))).toLowerCase()
      while (statusCode != 404) {
        try {
          const testObjects = await new BucketsApi().getBucketDetails(bucketKey, oauth_client, oauth_token);
          statusCode = testObjects.statusCode
        }
        catch (err) {
          statusCode = err.statusCode
        }
      }
      console.log(`${element.email} bucket finished deleting!`)
      let payload = new PostBucketsPayload();
      payload.bucketKey = bucketKey
      payload.policyKey = "persistent"

      try {
        await new BucketsApi().createBucket(payload, {}, oauth_client, oauth_token);
      }
      catch (err) {
        console.log(err)
      }
      const newBucketObj = {
        bucketKey: bucketKey,
        userKey: element.id
      }
      return Bucket.query().insertAndFetch(newBucketObj)
    }))
  }
}
export default seedBuckets
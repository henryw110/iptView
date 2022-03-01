
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

    const bucketsList = await Bucket.query()
    console.log(bucketsList)
    const usersList = await User.query().select("id", "email")

    const buckets = await new BucketsApi().getBuckets({ limit: 100 }, oauth_client, oauth_token)
    console.log(buckets.body)
    const newEntryList = await Promise.all(usersList.map(async (element) => {
      console.log(element.email)
      const regex = /[^-_.a-z0-9]/g
      let statusCode = 409
      const bucketKey = (config.credentials.client_id + "-" + (element.email.replace(regex, ""))).toLowerCase()
      while (statusCode != 404) {
        try {
          const testObjects = await new BucketsApi().getBucketDetails(bucketKey, oauth_client, oauth_token);
          //console.log(testObjects)
          statusCode = testObjects.statusCode
        }
        catch (err) {
          //console.log(err)
          statusCode = err.statusCode
        }
      }
      console.log(`${element.email} bucket finished deleting!`)
      console.log(bucketKey)
      let payload = new PostBucketsPayload();
      payload.bucketKey = bucketKey
      payload.policyKey = "persistent"

      try {
        const newBucket = await new BucketsApi().createBucket(payload, {}, oauth_client, oauth_token);
        console.log(newBucket)

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
    console.log(newEntryList)
    /* usersList.forEach(async element => {
      const newBucketObj = {
      bucketKey: "testing",
      userKey: "testing"
    }
    console.log(newBucketObj)
    try {
      const newBucketEntry = await Bucket.query().insertAndFetch(newBucketObj)
      console.log(newBucketEntry)
    }
    catch (err) {
      console.log(err)
    }

    }) */


  }
}
export default seedBuckets
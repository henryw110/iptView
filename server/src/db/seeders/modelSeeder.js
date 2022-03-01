import pkg from "forge-apis"
import oauth from '../../routes/common/oauth.js'
const { getClient, getInternalToken } = oauth;
const { BucketsApi, ObjectsApi, PostBucketsPayload } = pkg
import config from '../../config.js';
import 'dotenv/config'
import { User, Bucket, cadModel } from "../../models/index.js"
class modelSeeder {
  static async seed() {

    const token = await getInternalToken();
    const oauth_token = token;
    const oauth_client = getClient();

    const buckets = await Bucket.query().select("bucketKey")
    const models = (await Promise.all(buckets.map(async item => {
      return (await new ObjectsApi().getObjects(item.bucketKey, { limit: 100 }, oauth_client, oauth_token)).body.items
    }))).flat()
    await Promise.all(models.map(async item => {
      return cadModel.query().insertAndFetch({bucketKey:item.bucketKey,objectId:item.objectId,objectKey:item.objectKey})
    }))
  }
}
export default modelSeeder
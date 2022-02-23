import express from 'express'
import pkg from "forge-apis"
import oauth from '../../routes/common/oauth.js'
const { getClient, getInternalToken } = oauth;
const { BucketsApi, ObjectsApi, PostBucketsPayload } = pkg
import config from '../../config.js';

const cleanBucketsRouter = new express.Router()

class bucketManager {

  static async cleanBuckets() {
    const token = await getInternalToken();
    const oauth_token = token;
    const oauth_client = getClient();
    const buckets = await new BucketsApi().getBuckets({ limit: 100 }, oauth_client, oauth_token)
    const filteredBuckets = buckets.body.items.filter(item => !(item.bucketKey.includes("demo")))
    await Promise.all(
      filteredBuckets.map(async (item) => {
        return await new BucketsApi().deleteBucket(item.bucketKey, oauth_client, oauth_token)
      }
      ))
    const newBuckets = await new BucketsApi().getBuckets({ limit: 100 }, oauth_client, oauth_token)
    console.log(newBuckets.body.items)

  }
}

export default bucketManager

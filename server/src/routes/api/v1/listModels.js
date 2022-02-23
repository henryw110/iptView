import fs from "fs"
import express from 'express'
import multer from "multer"
import pkg from "forge-apis"
const { BucketsApi, ObjectsApi, PostBucketsPayload } = pkg
import oauth from "../../common/oauth.js"
const { getClient, getInternalToken } = oauth;
import config from "../../../config.js"

const listModelsRouter = new express.Router()



listModelsRouter.use(async (req, res, next) => {
  const token = await getInternalToken();
  req.oauth_token = token;
  req.oauth_client = getClient();
  next();
});


listModelsRouter.get("/", async (req, res, next) => {
/* try {
  const testObjects =await new ObjectsApi().getObjects("haha", { limit: 100 }, req.oauth_client, req.oauth_token);
}
catch (err){
  console.log(err)
} */
  const buckets = await new BucketsApi().getBuckets({ limit: 100 }, req.oauth_client, req.oauth_token)
  /* const deletedBuckets = await Promise.all(
    buckets.body.items.map(async(item)=> {
    return await new BucketsApi().deleteBucket(item.bucketKey,req.oauth_client,req.oauth_token)
    }
  )) */
  //console.log(deletedBuckets.body)
  const returnArray =  (await Promise.all(buckets.body.items.map(async(item) => {
  const objects = await new ObjectsApi().getObjects(item.bucketKey, { limit: 100 }, req.oauth_client, req.oauth_token);
  return await(objects.body.items.map((object) => {
      return {
        bucket: item.bucketKey.replace(config.credentials.client_id.toLowerCase() + '-', ''),
        id: Buffer.from(object.objectId).toString('base64'),
        text: object.objectKey,
        type: 'object',
        children: false
      };

    }))
  }))).flat()
    return await res.status(200).json(returnArray)
})

export default listModelsRouter
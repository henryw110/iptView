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
listModelsRouter.get("/all", async (req, res, next) => {
  const buckets = await new BucketsApi().getBuckets({ limit: 100 }, req.oauth_client, req.oauth_token)
  const detailsArray =await Promise.all(buckets.body.items.map(async(item) => {
    const objects = await new ObjectsApi().getObjects(item.bucketKey, { limit: 100 }, req.oauth_client, req.oauth_token);
    const returnDetails = await Promise.all(objects.body.items.map((object) => {
      return new ObjectsApi().getObjectDetails(object.bucketKey,object.objectKey,{},req.oauth_client,req.oauth_token)
    }))
    //console.log(returnDetails)
    return returnDetails
  }).flat())
  console.log(detailsArray.flat())

  const returnArray = (await Promise.all(buckets.body.items.map(async (item) => {
    const objects = await new ObjectsApi().getObjects(item.bucketKey, { limit: 100 }, req.oauth_client, req.oauth_token);
    return (objects.body.items.map( (object) => {
      //console.log(object)
       return {
        bucket: item.bucketKey.toLowerCase().replace(config.credentials.client_id.toLowerCase() + '-', ''),
        id: Buffer.from(object.objectId).toString('base64'),
        text: object.objectKey,
        type: 'object',
        children: false
      };

    }))
  }))).flat()
  return res.status(200).json(returnArray)
})

listModelsRouter.get("/:email", async (req, res, next) => {
  const regex = /[^-_.a-z0-9]/g
  const bucketKey = (config.credentials.client_id + "-" + (req.params.email.replace(regex, ""))).toLowerCase()
  const objects = await new ObjectsApi().getObjects(bucketKey, { limit: 100 }, req.oauth_client, req.oauth_token);
  const returnArray = (objects.body.items.map((object) => {
    return {
      bucket: bucketKey.toLowerCase().replace(config.credentials.client_id.toLowerCase() + "-", ""),
      id: Buffer.from(object.objectId).toString('base64'),
      text: object.objectKey,
      type: 'object',
      children: false
    };

  }))
  return res.status(200).json(returnArray)

})




export default listModelsRouter
import express from 'express'
import pkg from "forge-apis"
const { BucketsApi, ObjectsApi, PostBucketsPayload } = pkg
import oauth from "../../common/oauth.js"
const { getClient, getInternalToken } = oauth;
import config from "../../../config.js"
import { User, Bucket, cadModel } from "../../../models/index.js"
const listModelsRouter = new express.Router()



listModelsRouter.use(async (req, res, next) => {
  const token = await getInternalToken();
  req.oauth_token = token;
  req.oauth_client = getClient();
  next();
});
listModelsRouter.get("/all", async (req, res, next) => {
  const models = await cadModel.query()
  const returnArray = await Promise.all(models.map(async item => {
    let itemUser
    try {
      itemUser = await item.$relatedQuery("user")
    } catch (err) {
      itemUser = "demo"
    }
    return {
      bucket: item.bucketKey,
      user: itemUser,
      id: Buffer.from(item.objectId).toString('base64'),
      text: item.objectKey
    }
  }))
  return res.status(200).json(returnArray)
})

listModelsRouter.get("/:email", async (req, res, next) => {
  const email = req.params.email
  if (email == "demo") {
    const demoBucket = await Bucket.query().findById("1")
    const demoModels = await demoBucket.$relatedQuery("models")
    const returnArray = await Promise.all(demoModels.map(async item => {
      return {
        bucket: item.bucketKey,
        user: "demo",
        id: Buffer.from(item.objectId).toString('base64'),
        text: item.objectKey
      }
    }))
    return res.status(200).json(returnArray)
  }
  else {
    try {
      const queriedUser = await User.query().where("email", "=", email)
      console.log(queriedUser)

    } catch (err) {
      console.log(error)
      res.status(404).json(error)
    }
  }
  /*   const regex = /[^-_.a-z0-9]/g
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
    return res.status(200).json(returnArray) */

})




export default listModelsRouter
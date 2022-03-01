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
    console.log(item)
    let itemUser
    try {
      const bucket = await item.$relatedQuery("bucket")
      itemUser = (await bucket.$relatedQuery("user")).email
    } catch (err) {
      console.log(err)
      itemUser = "demo"
    }
    console.log(itemUser)
    if(!itemUser){itemUser="demo"}
    return {
      modelId:item.id,
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
      console.log(item)
      return {
        modelId:item.id,
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
      const queriedUser = (await User.query().where("email", "=", email))[0]
      console.log(queriedUser)
      const userModels = await queriedUser.$relatedQuery("models")
      const returnArray = await Promise.all(userModels.map(async item => {
        return {
          modelId:item.id,
          bucket: item.bucketKey,
          user: queriedUser.email,
          id: Buffer.from(item.objectId).toString('base64'),
          text: item.objectKey
        }
      }))
      return res.status(200).json(returnArray)

    } catch (err) {
      console.log(err)
      res.status(404).json(err)
    }
  }

})




export default listModelsRouter
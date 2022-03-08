import express from 'express'
import pkg from "forge-apis"
const { BucketsApi, ObjectsApi, PostBucketsPayload, DerivativesApi } = pkg
import oauth from "../../common/oauth.js"
const { getClient, getInternalToken } = oauth;
import config from "../../../config.js"
import { User, Bucket, cadModel } from "../../../models/index.js"

const modelData = new express.Router()

modelData.use(async (req, res, next) => {
  const token = await getInternalToken();
  req.oauth_token = token;
  req.oauth_client = getClient();
  next();
});

modelData.get("/:modelData", async (req, res) => {
  let user
  const model = await cadModel.query().findById(req.params.modelData)
  const bucket = await model.$relatedQuery("bucket")
  if (bucket.bucketKey.endsWith("aoagkn1r9smdh7lawgbytt5gaseamtpc-demo")) {
    user = "demo"
  } else {
    const userEntry = await bucket.$relatedQuery("user")
    /* console.log(userEntry) */
    user = userEntry.email
  }
  /*   console.log(model)
    console.log(bucket) */
  const urn = Buffer.from(model.objectId).toString('base64')
  const manifest = await new DerivativesApi().getManifest(urn,{},req.oauth_client,req.oauth_token)
  console.log(manifest)
  const returnObj = {
    createdAt: model.createdAt,
    modelId: model.id,
    bucket: model.bucketKey,
    user: user,
    id: urn,
    text: model.objectKey
  }
  res.status(200).json(returnObj)
})
export default modelData
import fs, { writeFileSync } from "fs"
import express from 'express'
import multer from "multer"
import pkg from "forge-apis"
const { BucketsApi, ObjectsApi, PostBucketsPayload, DerivativesApi } = pkg
import oauth from "../../common/oauth.js"
const { getClient, getInternalToken } = oauth;
import config from "../../../config.js"

const getThumbnailRouter = new express.Router()

getThumbnailRouter.use(async (req, res, next) => {
  const token = await getInternalToken();
  req.oauth_token = token;
  req.oauth_client = getClient();
  next();
});

getThumbnailRouter.get("/:id", async (req, res) => {
  const urn = req.params.id
  try {
    let response = await new DerivativesApi().getThumbnail(urn, { width: 200, height: 200 }, req.oauth_client, req.oauth_token)
    if (response.statusCode == 202) {
      while (response.statusCode != 200) {
        console.log("looking for thumbnail again")
        response = await new DerivativesApi().getThumbnail(urn, { width: 200, height: 200 }, req.oauth_client, req.oauth_token)
      }
    }
    return res.status(200).json(response.body)
  }
  catch (err) {
    console.log(err)
    return res.status(304).json(err)
  }
  //fs.writeFileSync(response.headers['x-ads-name'],response.body)

})




export default getThumbnailRouter
import fs from "fs"
import express from 'express'
import multer from "multer"
import pkg from "forge-apis"
const { DerivativesApi,BucketsApi,JobPayload,JobPayloadInput,JobPayloadOutput,JobSvfOutputPayload, ObjectsApi, PostBucketsPayload } = pkg
import oauth from "../../common/oauth.js"
const { getClient, getInternalToken } = oauth;
import config from "../../../config.js"

const uploadFileRouter = new express.Router()

uploadFileRouter.use(async (req, res, next) => {
  const token = await getInternalToken();
  req.oauth_token = token;
  req.oauth_client = getClient();
  next();
});

uploadFileRouter.post("/",multer({ dest: 'uploads/' }).single('fileToUpload'),async (req,res,next) => {
  const regex = /[^-_.a-z0-9]/g
  const bucketKey = (config.credentials.client_id + "-"+(req.body.userEmail.replace(regex, ""))).toLowerCase()
  res.status(201).json("reciewed")
  fs.readFile(req.file.path, async (err, data) => {
    if (err) {
        next(err);
    }
    
    try {
        // Upload an object to bucket using [ObjectsApi](https://github.com/Autodesk-Forge/forge-api-nodejs-client/blob/master/docs/ObjectsApi.md#uploadObject).
       const returnedData= await new ObjectsApi().uploadObject(bucketKey, req.file.originalname, data.length, data, {}, req.oauth_client, req.oauth_token)
       console.log(returnedData)
       let job = new JobPayload();
       job.input = new JobPayloadInput();
       job.input.urn = Buffer.from(returnedData.body.objectId).toString('base64')
       job.output = new JobPayloadOutput([
           new JobSvfOutputPayload()
       ]);
       job.output.formats[0].type = 'svf';
       job.output.formats[0].views = ['2d', '3d']; 
       try {
        // Submit a translation job using [DerivativesApi](https://github.com/Autodesk-Forge/forge-api-nodejs-client/blob/master/docs/DerivativesApi.md#translate).
       console.log(await new DerivativesApi().translate(job, {}, req.oauth_client, req.oauth_token))
        res.status(200).end();
    } catch(err) {
      console.log(err)
        next(err);
    }
        res.status(200).end();
    } catch(err) {
      console.log(err)
        next(err);
    }
})
})


export default uploadFileRouter
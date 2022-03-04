import express, { response } from 'express'
import pkg from "forge-apis"
const { BucketsApi, ObjectsApi, PostBucketsPayload } = pkg
import oauth from "../../common/oauth.js"
const { getClient, getInternalToken } = oauth;
import config from "../../../config.js"
import { User, Bucket, cadModel } from "../../../models/index.js"

const listUsersRouter = new express.Router()

listUsersRouter.get("/",async (req,res) => {
  let response =(await User.query().select("email"))
  let bucket  = (await Bucket.query())[0].bucketKey
  console.log(bucket)
  if(bucket.endsWith("-demo")) {
    response.push(({email:'demo'}))
  }
  console.log(response)
  const returnArray = response.map(item => {
    console.log(item.email)
    return(item.email)
  })

  return res.status(200).json(returnArray)

})

export default listUsersRouter
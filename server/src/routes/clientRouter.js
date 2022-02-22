import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";
import pkg from "forge-apis";
const { BucketsApi, ObjectsApi, PostBucketsPayload } = pkg
import  oauth  from'./common/oauth.js';
const { getClient, getInternalToken } = oauth;
import config from "../config.js"

const router = new express.Router();
const clientRoutes = ["/", 
"/user-sessions/new",
 "/users/new",
"/model/:id"];

router.use(async (req, res, next) => {
  try {const token = await getInternalToken();}
  catch(err) {
    console.log(err)
  }
  req.oauth_token = token;
  req.oauth_client = getClient();
  next();
});


router.get(clientRoutes, async (req, res) => {
  console.log(config.date)
  res.sendFile(getClientIndexPath());
});

export default router;

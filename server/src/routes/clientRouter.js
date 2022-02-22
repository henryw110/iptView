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
  const token = await getInternalToken();
  req.oauth_token = token;
  req.oauth_client = getClient();
  next();
});


router.get(clientRoutes, async (req, res) => {
  const buckets = await new BucketsApi().getBuckets({ limit: 100 }, req.oauth_client, req.oauth_token);
  res.sendFile(getClientIndexPath());
});

export default router;

import express from "express";
import passport from "passport";
import config from "../../../config.js";
import pkg from "forge-apis"
const { BucketsApi, ObjectsApi, PostBucketsPayload } = pkg

const sessionRouter = new express.Router();

sessionRouter.post("/", (req, res, next) => {
  return passport.authenticate("local", (err, user) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }

    if (user) {
      return req.login(user, () => {
        return res.status(201).json(user);
      });
    }

    return res.status(401).json(undefined);
  })(req, res, next);
});

sessionRouter.get("/current", async (req, res) => {

  if (req.user) {
    const regex = /[^-_.a-z0-9]/g
    const bucketKey = (config.credentials.client_id + "-" + (req.user.email.replace(regex, ""))).toLowerCase()
    console.log(bucketKey)
    try {
      const testObjects = await new ObjectsApi().getObjects(bucketKey, { limit: 100 }, req.oauth_client, req.oauth_token);
      console.log(testObjects)
    }
    catch (err) {
      console.log(err)
      let payload = new PostBucketsPayload();
      payload.bucketKey = bucketKey
      payload.policyKey = "persistent"
      const newBucket = await new BucketsApi().createBucket(payload, {}, req.oauth_client, req.oauth_token);
      console.log(newBucket)

    }
    res.status(200).json(req.user);
  } else {
    res.status(401).json(undefined);
  }
});

sessionRouter.delete("/", (req, res) => {
  req.logout();
  res.status(200).json({ message: "User signed out" });
});

export default sessionRouter;

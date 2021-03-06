/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

import express from "express"

import oauth from "./common/oauth.js";
const { getPublicToken } = oauth
let oAuthRouter = express.Router();

// GET /api/forge/oauth/token - generates a public access token (required by the Forge viewer).
oAuthRouter.get('/token', async (req, res, next) => {
    console.log("getting token")

    try {
        const token = await getPublicToken();
        res.json({
            access_token: token.access_token,
            expires_in: token.expires_in    
        });
    } catch(err) {
        console.log(err)
        next(err);
    }
});

export default oAuthRouter;

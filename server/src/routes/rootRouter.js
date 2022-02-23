import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import oAuthRouter from "./oauth.js";
import ossRouter from "./oss.js";
import modelDerivativeRouter from "./modelderivative.js";
import listModelsRouter from "./api/v1/listModels.js";
import getThumbnailRouter from "./api/v1/getThumbnailRouter.js";
import uploadFileRouter from "./api/v1/uploadFile.js";




const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/uploadFile",uploadFileRouter)
rootRouter.use("/api/v1/thumbnail",getThumbnailRouter)
rootRouter.use("/api/v1/listModels",listModelsRouter)
rootRouter.use('/api/forge/oauth', oAuthRouter);
rootRouter.use('/api/forge/oss', ossRouter);
rootRouter.use('/api/forge/modelderivative', modelDerivativeRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter); //place your server-side routes here

export default rootRouter;

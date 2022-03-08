import "./boot.js";
import getNodeEnv from "./config/getNodeEnv.js";
import getDatabaseUrl from "./config/getDatabaseUrl.cjs";

export default {
  date:process.env.START_DATE,
  credentials: {
    client_id: process.env.FORGE_CLIENT_ID,
    client_secret: process.env.FORGE_CLIENT_SECRET,
    callback_url: process.env.FORGE_CALLBACK_URL
},
scopes: {
    // Required scopes for the server-side application
    internal: ['bucket:create', 'bucket:read', 'data:read', 'data:create', 'data:write',"bucket:delete","viewables:read"],
    // Required scope for the client-side viewer
    public: ['viewables:read']
},
  nodeEnv: getNodeEnv(),
  session: { secret: process.env.SESSION_SECRET },

  databaseUrl: getDatabaseUrl(getNodeEnv()),
  web: { host: process.env.HOST || "0.0.0.0", port: process.env.PORT || 8080 }
};

# iptView
#### Made by: [Henry Wiest](https://github.com/henryw110)

This app uses Autodesk Forge to allow users to upload and view Autodesk CAD files.

The app is available to view [here](https://ipt-viewer.herokuapp.com), or can be viewed locally through the following steps:

1. Go to [https://forge.autodesk.com/] ,and click on "Sign up to try Forge" . Sign up and verify your email to get access to their free trial.

2. If you're not already there, go to [https://forge.autodesk.com/myapps/] . Click "Create App". Fill in the app name and description with whatever you want. Make the callback url ```http://localhost:3000/api/forge/callback/oauth```.

3. `git clone https://github.com/henryw110/iptView.git
      cd server
      touch .env`

4. Fill out the .env file in the following format. You can find your Autodesk Forge app at [https://forge.autodesk.com/myapps/]:

`SESSION_SECRET="[Your choice]"
FORGE_CLIENT_ID = "[From Autodesk Forge]"
FORGE_CLIENT_SECRET = "[From Autodesk Forge]"
FORGE_CALLBACK_URL = "http://localhost:3000/api/forge/callback/oauth"
SEEDED_EMAIL = "[Your choice]"
SEEDED_PASSOWRD = "[Your choice]" `

5.  `
cd ..
yarn install
createdb iptView_development
cd server
yarn run migrate: rollback
yarn run migrate: latest
yarn run db:seed
yarn run dev`

```
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import NewBucketForm from "./NewBucketForm";

import ForgeViewer from "../ForgeViewer";
import ModelList from "./ModelList";
import ShowModel from "./ShowModel";
const {
  launchViewer,
  onDocumentLoadFailure,
  onDocumentLoadSuccess,
  getForgeToken
} = ForgeViewer

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch (err) {
      setCurrentUser(null)
    }
  }
  useEffect(() => {
    //launchViewer(URNs[1])
    fetchCurrentUser()
  }, [])


  return (
    <div>
      <meta charset="utf-8" />

      <ink rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jstree/3.3.7/themes/default/style.min.css" />
      <link rel="stylesheet" href="https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/style.min.css" type="text/css"/>
      <script src="https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js"></script>

      <Router>
      <TopBar user={currentUser} />
      <Switch>
      <AuthenticatedRoute
      path="/bucket/new"
      component={NewBucketForm}
      exact={true}
      user={currentUser}
      />
      <Route exact path="/">
      <ModelList/>
      </Route>
      <Route exact path="/users/new" component={RegistrationForm} />
      <Route exact path="/user-sessions/new" component={SignInForm} />
      <Route exact path="/model/:id">
      <ShowModel user={currentUser} />
      </Route>
      </Switch>
      </Router>
    </div>
  );
};

export default hot(App);

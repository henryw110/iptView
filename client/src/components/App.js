import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";

import ForgeViewer from "../ForgeViewer";
import ModelList from "./ModelList";
import ShowModel from "./ShowModel";
import NewModelForm from "./NewModelForm.js";
import landingPage from "./landingPage";
import UserList from "./UserList";
const {
  launchViewer,
  onDocumentLoadFailure,
  onDocumentLoadSuccess,
  getForgeToken
} = ForgeViewer
let finishedFetching = false
const App = (props) => {

  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    console.log("fetcihg")
    try {
      const user = await getCurrentUser()
      console.log(user)
      setCurrentUser(user)
    } catch (err) {
      console.log("err")
      setCurrentUser(null)
    }
  }
  //fetchCurrentUser()
  useEffect( () => {
    console.log("effect")
    //launchViewer(URNs[1])
    finishedFetching = true
     fetchCurrentUser()

  }, [])
  console.log(finishedFetching)

  return (

    <div >
      {
        finishedFetching ?
          <div>
            <Router>
              <TopBar user={currentUser}  />
              <Switch>
                <AuthenticatedRoute
                  exact={true}
                  path="/model/new"
                  component={NewModelForm}
                  user={currentUser}
                />
                <Route exact path="/">
                  <Redirect to="/landing" />
                </Route>
                <Route exact path="/userIndex" component={UserList} />
                <Route exact path="/landing" component={landingPage} />
                <Route exact path="/user/all" component={ModelList} />
                <Route exact path="/user/:id" component={ModelList} />
                <Route exact path="/users/new" component={RegistrationForm} />
                <Route exact path="/user-sessions/new" component={SignInForm} />
                <Route exact path="/model/:id">
                  <ShowModel user={currentUser} />
                </Route>
              </Switch>
            </Router>
          </div>:
          <div/>}

    </div>

  );
};

export default hot(App);

import React from "react";
import { Redirect, Route } from "react-router";

const AuthenticationCheck = ({ component: Component, user }) => {
  if (user) {
    console.log("authenticated")
    return <Component user={user}/>;
  }
  return <Redirect to="/user-sessions/new" />;
};

const AuthenticatedRoute = ({ component, user, ...rest }) => {
  console.log(user)
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <AuthenticationCheck user={user} component={component} />
    </Route>
  );
};

export default AuthenticatedRoute;

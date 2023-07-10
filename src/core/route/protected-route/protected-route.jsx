import React from "react";
import { Redirect, Route } from "react-router-dom";
import SessionUtils from "../../../utils/session-utils";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const sessionToken = SessionUtils.getToken();
  return (
    <Route
      {...rest}
      render={(props) =>
        sessionToken?.length ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: rest.redirectRoute, extras: { ...rest.location } }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;

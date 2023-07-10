import React from "react";
import { Redirect, Route } from "react-router-dom";
import SessionUtils from "../../../utils/session-utils";

const PublicRoute = ({ component: Component, ...rest }) => {
  const sessionToken = SessionUtils.getToken();
  console.log('sessionToken :>> ', sessionToken);
  return (
    <Route
      {...rest}
      render={(props) =>
        !sessionToken?.length ? (
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

export default PublicRoute;

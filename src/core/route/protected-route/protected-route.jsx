import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useSelector((state) => state.user);
console.log('user :>> ', user);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
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

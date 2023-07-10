import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./super-admin-login.scss";
import CredsUtils from "../../utils/cred-utils";
import SessionUtils from "../../utils/session-utils";

const SuperAdminLogin = () => {
  const history = useHistory(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const _login = (e) => {
    e.preventDefault();
    if (CredsUtils.validateCreds({ email, password })) {
      SessionUtils.setToken("admin");
      window.location.href = "/home";
    } else {
      alert("Invalid Credentials");
    }
  };

  const _forgotPassword = (e) => {
    e.preventDefault();
    history.push("/super-admin-forgot-password");
  };

  console.log("login page");

  return (
    <div className="loginPageWrap">
      <div className="innerWrapper">
        <div className="logo">
          <img src={require("../../assets/images/logo.png")} alt="" />
        </div>
        <div className="title">ADMIN</div>

        <div className="form-group">
          <label htmlFor="">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" for="exampleCheck1">
            Remember me
          </label>
        </div>

        <div className="buttons">
          <div className="button" onClick={_login}>
            Login
          </div>
        </div>

        <div className="link">
          {/* <span className="" onClick={_forgotPassword}>
            Forgot password
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLogin;

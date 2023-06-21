import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./super-admin-login.scss";

const SuperAdminLogin = () => {
    const history = useHistory(false);


    const _forgotPassword = (e) => {
    e.preventDefault();
    history.push("/super-admin-forgot-password");
    };

    return (
        <div className="loginPageWrap">
            <div className="innerWrapper">
                <div className="logo"><img src={require("../../assets/images/logo.png")} alt="" /></div>
                <div className="title">Welcome back</div>

                <div className="form-group">
                    <label htmlFor="">Email address</label>
                    <input type="email" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" className="form-control" />
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Remember me</label>
                </div>

                <div className="buttons">
                    <div className="button">Login</div>
                </div>

                <div className="link">
                    <span className="" onClick={_forgotPassword}>Forgot password</span>
                </div>
            </div>
        </div>
    );
}

export default SuperAdminLogin;
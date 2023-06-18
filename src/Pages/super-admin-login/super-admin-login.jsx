import React, { useEffect, useState } from "react";
import "./super-admin-login.scss";

const SuperAdminLogin = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showLinkSend, setShowLinkSend] = useState(false);

    const _changeStep = (step) => {
        switch (step) {
            case 1:
                setShowLogin(true);
                setShowForgotPassword(false);
                setShowLinkSend(false);
                break;

            case 2:
                setShowLogin(false);
                setShowForgotPassword(true);
                setShowLinkSend(false);
                break;

            case 3:
                setShowLogin(false);
                setShowForgotPassword(false);
                setShowLinkSend(true);
                break;
        
            default:
                break;
        }
    }

    return (
        <div className="loginPageWrap">
            <div className={"innerWrapper " + (showLogin ? "d-block" : "d-none")}>
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
                    <span className="" onClick={(e) => _changeStep(2)}>Forgot password</span>
                </div>
            </div>



            <div className={"innerWrapper " + (showForgotPassword ? "d-block" : "d-none")}>
                <div className="logo"><img src={require("../../assets/images/logo.png")} alt="" /></div>
                <div className="title">Forgot password</div>

                <div className="form-group">
                    <label htmlFor="">Email address</label>
                    <input type="email" className="form-control" />
                    <span className="text-danger small">It seems like the email you provided is not a valid one.</span>
                </div>

                <div className="buttons">
                    <div className="button" onClick={(e) => _changeStep(3)}>Request new password</div>
                </div>

                <div className="link">
                    <span className="" onClick={(e) => _changeStep(1)}>Go back to login</span>
                </div>
            </div>



            <div className={"innerWrapper " + (showLinkSend ? "d-block" : "d-none")}>
                <div className="logo"><img src={require("../../assets/images/logo.png")} alt="" /></div>
                <div className="title">Forgot password</div>

                <div className="desc text-center text-muted mb-3">
                    A link to reset your password has been sent to you email.
                </div>


                <div className="link">
                    <span className="" onClick={(e) => _changeStep(1)}>Go back to login</span>
                </div>
            </div>
        </div>
    );
}

export default SuperAdminLogin;
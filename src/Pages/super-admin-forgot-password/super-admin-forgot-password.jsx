import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./super-admin-forgot-password.scss";

const SuperAdminForgotPassword = () => {
    const [showForgotPassword, setShowForgotPassword] = useState(true);
    const [showLinkSend, setShowLinkSend] = useState(false);
    const history = useHistory(false);

    const _changeStep = (step) => {
        switch (step) {
            case 1:
                setShowForgotPassword(true);
                setShowLinkSend(false);
                break;

            case 2:
                setShowForgotPassword(false);
                setShowLinkSend(true);
                break;
        
            default:
                break;
        }
    }

    const _login = (e) => {
        e.preventDefault();
    history.push("/super-login");
    };

    return (
        <div className="loginPageWrap">
            
            <div className={"innerWrapper " + (showForgotPassword ? "d-block" : "d-none")}>
                <div className="logo"><img src={require("../../assets/images/logo.png")} alt="" /></div>
                <div className="title">Forgot password</div>

                <div className="form-group">
                    <label htmlFor="">Email address</label>
                    <input type="email" className="form-control" />
                    <span className="text-danger small">It seems like the email you provided is not a valid one.</span>
                </div>

                <div className="buttons">
                    <div className="button" onClick={(e) => _changeStep(2)}>Request new password</div>
                </div>

                <div className="link">
                    <span className="" onClick={_login}>Go back to login</span>
                </div>
            </div>



            <div className={"innerWrapper " + (showLinkSend ? "d-block" : "d-none")}>
                <div className="logo"><img src={require("../../assets/images/logo.png")} alt="" /></div>
                <div className="title">Forgot password</div>

                <div className="desc text-center text-muted mb-3">
                    A link to reset your password has been sent to you email.
                </div>


                <div className="link">
                    <span className="" onClick={_login}>Go back to login</span>
                </div>
            </div>
        </div>
    );
}

export default SuperAdminForgotPassword;
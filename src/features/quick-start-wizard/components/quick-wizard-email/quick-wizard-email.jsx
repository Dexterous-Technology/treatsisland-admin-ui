import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const QuickWizardEmail = ({ onSubmit }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const _validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const _onSubmit = () => {
    setErrorMessage("");
    if (!emailInput?.length || !_validateEmail(emailInput)) {
      setErrorMessage("Please provide a valid email");
      return;
    }
    onSubmit(emailInput);
  };

  return (
    <>
      <div className={"wizard_steps step1 "}>
        <div className="wizard_content">
          <div className="form-group text-center">
            <div className="image-wrapper">
              <img
                src={require("../../../../assets/images/email.png")}
                alt=""
              />
            </div>
            <label htmlFor="" className="h4 font-weight-bold">
              What is your email address?
            </label>
            <input
              className="form-control"
              placeholder="Enter your valid email address"
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <p className="errorText pt-3">{errorMessage}</p>
          </div>

          <div className="wizard_buttons text-center">
            <span className="button primary" onClick={_onSubmit}>
              Next
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickWizardEmail;

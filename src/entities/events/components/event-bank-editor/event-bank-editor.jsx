import React, { Component, useEffect, useState } from "react";
import "./event-bank-editor.scss";

const EventBankEditor = ({
  event = null,
  isVisible = false,
  onDismiss = () => {},
  onUpdate = () => {},
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bankName, setBankName] = useState("");
  const [bankRoutingNumber, setBankRoutingNumber] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [errorText, setErrorText] = useState("");

  const _submit = () => {
    setErrorText("");
    if (!bankName?.length) {
      setErrorText("Bank name cannot be blank");
      return;
    }
    if (!bankRoutingNumber?.length) {
      setErrorText("Routing number cannot be blank");
      return;
    }
    if (!bankAccountNumber?.length) {
      setErrorText("Account number cannot be blank");
      return;
    }
    onUpdate({
      bankName,
      bankRoutingNumber,
      bankAccountNumber,
    });
  };

  const _assignDetailsIfAvailable = () => {
    if (event.BankName) {
        setBankName(event.BankName);
    }
    if (event.BankRoutingNumber) {
        setBankRoutingNumber(event.BankRoutingNumber);
    }
    if (event.BankAccountNumber) {
        setBankAccountNumber(event.BankAccountNumber);
    }
  } 

  useEffect(() => {
    if (event?.EventID) {
        _assignDetailsIfAvailable();
    }
  }, [event?.EventID])

  return (
    <>
      {isVisible ? (
        <>
          {isLoading ? (
            <div className="quickWizardLoaderWrapper">
              <div className="loaderWrapper pageLoader">
                <div className="loader"></div>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className={"wizard show bankwizard"}>
            <div className="wizard_inner">
              <div className="wizard_title">
                <span className="title">Event payout details</span>

                <div className="wizard_close" onClick={onDismiss}>
                  <svg
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 5L4.99998 19M5.00001 5L19 19"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className={"wizard_steps step3 "}>
                <div className="wizard_content py-0 mt-3">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor=""> Bank name </label>
                        <input
                          type="text"
                          placeholder="Enter your bank name"
                          className="form-control"
                          value={bankName}
                          disabled={event?.BankName?.length}
                          onChange={(e) => setBankName(e.target.value)}
                        />
                        {/* <small className="error-text"> Please provide valid event co-ordinator name </small> */}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor=""> Bank routing number </label>
                        <input
                          type="text"
                          placeholder="Enter your bank routing number"
                          className="form-control"
                          value={bankRoutingNumber}
                          disabled={event?.BankName?.length}
                          onChange={(e) => setBankRoutingNumber(e.target.value)}
                        />
                        {/* <small className="error-text"> Please provide valid event co-ordinator name </small> */}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="">Bank account number</label>
                        <input
                          type="text"
                          placeholder="Enter your bank account number"
                          className="form-control"
                          value={bankAccountNumber}
                          disabled={event?.BankName?.length}
                          onChange={(e) => setBankAccountNumber(e.target.value)}
                        />
                        {/* <small className="error-text"> Please provide valid event co-ordinator name </small> */}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="warningWrapper">
                        <p>Payout details can only be updated once</p>
                      </div>
                      {!!errorText?.length && (
                        <div className="errorWrapper">
                          <p>{errorText}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="wizard_buttons text-center">
                  <span className="button secondary" onClick={onDismiss}>
                    Close
                  </span>
                  {
                    !event?.BankName?.length && <span className="button primary" onClick={_submit}>
                    Update
                  </span>
                  }
                  
                </div>
              </div>
            </div>
          </div>
          {/* *************************************************** /WIZARD */}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default EventBankEditor;

import React, { Component, useEffect, useMemo, useState } from "react";
import "./event-payout-editor.scss";
import EventUtils from "../../utils/event-utils";
import USStates from "../../../../const/us-states.json";
import { toast } from "react-toastify";

const EventPayoutEditor = ({ event = null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fullName, setFullName] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankRoutingNumber, setBankRoutingNumber] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [payoutType, setPayoutType] = useState(""); // ['Mail check', 'Direct deposit']
  const [errorText, setErrorText] = useState("");
  const [hasPayoutDetails, setHasPayoutDetails] = useState(false);
  const [payoutId, setPayoutId] = useState(null);

  const _submit = () => {
    setErrorText("");
    // Common checks for both types
    if (!fullName?.length) {
      setErrorText("Name cannot be blank");
      return;
    }
    // Type wise checks
    if (payoutType === "Mail check") {
      if (!organizationName?.length) {
        setErrorText("Organization Name cannot be blank");
        return;
      }
      if (!street?.length) {
        setErrorText("Street cannot be blank");
        return;
      }
      if (!city?.length) {
        setErrorText("City cannot be blank");
        return;
      }
      if (!state?.length) {
        setErrorText("State cannot be blank");
        return;
      }
      if (!zip?.length) {
        setErrorText("Zip cannot be blank");
        return;
      }
    } else {
      // Direct deposit
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
    }
    // onUpdate({
    //   fullName,
    //   bankRoutingNumber,
    //   bankAccountNumber,
    // });
    _setPayoutDetails();
  };

  const _reset = () => {
    setFullName("");
    setBankName("");
    setBankRoutingNumber("");
    setBankAccountNumber("");
    setOrganizationName("");
    setStreet("");
    setCity("");
    setState("");
    setZip("");
    setErrorText("");
    setHasPayoutDetails(false);
    setPayoutType("");
  };

  const _assignValues = (payoutDetails) => {
    if (payoutDetails?.PayoutType?.length) {
      setHasPayoutDetails(true);
      setPayoutType(payoutDetails.PayoutType);
      setFullName(payoutDetails.Fullname);
      setBankName(payoutDetails.BankName);
      setBankRoutingNumber(payoutDetails.BankRoutingNumber);
      setBankAccountNumber(payoutDetails.BankAccountNumber);
      setOrganizationName(payoutDetails.OrganizationName);
      setStreet(payoutDetails.Street);
      setCity(payoutDetails.City);
      setState(payoutDetails.State);
      setZip(payoutDetails.Zip);
    }
  };

  const _selectPayoutType = (selectedPayoutType) => {
    if (hasPayoutDetails && payoutType !== selectedPayoutType) {
      return;
    }
    setPayoutType(selectedPayoutType);
    setIsModalVisible(true);
  };

  const _setPayoutDetails = async () => {
    const payload = {
      fullName,
      bankName,
      bankRoutingNumber,
      bankAccountNumber,
      organizationName,
      street,
      city,
      state,
      zip,
      payoutType,
      eventId: event.EventID,
    };
    if (payoutId) {
      payload.eventPayoutId = payoutId;
    }
    await EventUtils.updateEventPayoutDetails(payload);
    _fetchPayoutDetails();
    toast.success("Payout details updated successfully");
  };

  const _assignDetailsIfAvailable = () => {
    if (event.fullName) {
      setFullName(event.fullName);
    }
    if (event.BankRoutingNumber) {
      setBankRoutingNumber(event.BankRoutingNumber);
    }
    if (event.BankAccountNumber) {
      setBankAccountNumber(event.BankAccountNumber);
    }
  };

  const _fetchPayoutDetails = async () => {
    try {
      const payoutDetails = await EventUtils.fetchEventPayoutDetails(
        event.EventID
      );
      if (payoutDetails) {
        setPayoutId(payoutDetails.EventPayoutID);
        _assignValues(payoutDetails);
      } else {
        _reset();
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const _generatePayoutTypeDropdownOptions = () => {
    return [
      {
        label: "Direct deposit",
        selected: payoutType === "Direct deposit",
        // disabled:
        className: `option ${payoutType === "Direct deposit" && "selected"} ${
          hasPayoutDetails && "disabled"
        }`,
      },
      {
        label: "Mail check",
        selected: payoutType === "Mail check",
        // disabled:
        className: `option ${payoutType === "Mail check" && "selected"} ${
          hasPayoutDetails && "disabled"
        }`,
      },
    ];
  };

  const _renderFields = () => {
    if (payoutType === "Direct deposit") {
      return (
        <>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor=""> Full name </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="form-control"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {/* <small className="error-text"> Please provide valid event co-ordinator name </small> */}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor=""> Bank name </label>
              <input
                type="text"
                placeholder="Enter your bank name"
                className="form-control"
                value={bankName}
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
                onChange={(e) => setBankAccountNumber(e.target.value)}
              />
              {/* <small className="error-text"> Please provide valid event co-ordinator name </small> */}
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor=""> Full name </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="form-control"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {/* <small className="error-text"> Please provide valid event co-ordinator name </small> */}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor=""> Street </label>
              <input
                type="text"
                placeholder="Enter  street"
                className="form-control"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              {/* <small className="error-text"> Please provide valid event co-ordinator name </small> */}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor=""> Organization Name </label>
              <input
                type="text"
                placeholder="Enter organization name"
                className="form-control"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
              />
              {/* <small className="error-text"> Please provide valid event co-ordinator name </small> */}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">City </label>
              <input
                type="text"
                placeholder="Enter  city"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              {/* <small className="error-text"> Please provide valid event co-ordinator name </small> */}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor=""> State </label>

              <select
                name=""
                id=""
                className="form-control"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option
                  value=""
                  label="Select a state ... "
                  selected="selected"
                >
                  Select a state ...{" "}
                </option>
                {USStates?.map((state) => (
                  <option value={state.name} key={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
              {/* <small className="error-text"> Please provide valid event co-ordinator name </small> */}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor=""> Zip </label>
              <input
                type="text"
                placeholder="Enter zip"
                className="form-control"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
              {/* <small className="error-text"> Please provide valid event co-ordinator name </small> */}
            </div>
          </div>
        </>
      );
    }
  };

  const payoutTypeDropdownOptions = _generatePayoutTypeDropdownOptions();

  useEffect(() => {
    if (event?.EventID) {
      _fetchPayoutDetails();
      _assignDetailsIfAvailable();
    }
  }, [event?.EventID]);

  return (
    <div className="eventPayoutWrapper">
      <div className="eventPayoutButtonWrapper">
        <div className="payoutInfo">
          <i className="fas fa-question"></i>
          <div className="info">If you want to change your payout option, please contact us Treats Island email</div>
        </div>
        
        <div className="eventPayoutBtn">
          Payout options
          <div className="options">
            {payoutTypeDropdownOptions.map((payoutTypeDropdownOption) => (
              <div
                className={payoutTypeDropdownOption.className}
                key={payoutTypeDropdownOption.label}
                onClick={(e) => _selectPayoutType(payoutTypeDropdownOption.label)}
              >
                {payoutTypeDropdownOption.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalVisible ? (
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

                <div
                  className="wizard_close"
                  onClick={(e) => setIsModalVisible(false)}
                >
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
                    {_renderFields()}
                    <div className="col-md-12">
                      {payoutType === "Mail check" && (
                        <div className="warningWrapper">
                          <p>Please note this may take up to 3 weeks</p>
                        </div>
                      )}
                      {!!errorText?.length && (
                        <div className="errorWrapper">
                          <p>{errorText}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="wizard_buttons text-center">
                  <span
                    className="button secondary"
                    onClick={(e) => setIsModalVisible(false)}
                  >
                    Close
                  </span>
                  {!event?.fullName?.length && (
                    <span className="button primary" onClick={_submit}>
                      Save
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* *************************************************** /WIZARD */}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EventPayoutEditor;

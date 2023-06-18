import React, { Component, useEffect, useState } from "react";
import Modal from "react-awesome-modal";

import "./org-survey-popup.scss";
import { useForm } from "react-hook-form";
import { EventEmitter } from "../../../../utils/event-emitter";

const memberCountTypes = ["1-25", "26-50", "51-75", "76-100", "100+"];
const raiseRanges = [
  "$500-2000",
  "$2500-5000",
  "$6000-12,500",
  "$15000-30,000",
  "$40,000+",
];

const OrgSurveyPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [org, setOrg] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { errors, isDirty },
  } = useForm();
  const _onDismiss = () => {
    setIsVisible(false);
    setOrg(null);
  };

  const onSubmit = async ({ eventName, teamName, startDate }) => {
    _onDismiss();
  };

  useEffect(() => {
    EventEmitter.subscribe("SHOW_ORG_SURVEY_POPUP", (org) => {
      setIsVisible(true);
      setOrg(org);
    });
    return () => {
      EventEmitter.cancelAll("SHOW_ORG_SURVEY_POPUP");
    };
  }, []);
  return (
    <>
      <Modal
        visible={isVisible}
        width="600"
        height="480"
        effect="fadeInUp"
        onClickAway={_onDismiss}
      >
        <form className="orgSurveyFormWrapper" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <h4>Provide some additional details for {org?.OrganizationName}</h4>
            <div className="col-md-12">
              <div className={`form-group ${errors.memberCount && "input-error"}`}>
                <label htmlFor="">
                  HOW MANY MEMBERS ARE IN YOUR ORGANIZATION?
                </label>
                <select
                  name=""
                  id=""
                  className="form-control"
                  {...register("memberCount", {
                    required: true,
                  })}
                >
                  <option value="">Select type</option>
                  {memberCountTypes?.map((memberCountType) => (
                    <option value={memberCountType} key={memberCountType}>
                      {memberCountType}
                    </option>
                  ))}
                </select>
                <small className="error-text">
                  {errors.memberCount && "Please select a valid option"}
                </small>
              </div>
            </div>
            <div className="col-md-12">
              <div className={`form-group ${errors.orgName && "input-error"}`}>
                <label htmlFor="">HOW MUCH WOULD YOU LIKE TO RAISE?</label>
                <select
                  name=""
                  id=""
                  className="form-control"
                  {...register("raiseRange", {
                    required: true,
                  })}
                >
                  <option value="">Select type</option>
                  {raiseRanges?.map((raiseRange) => (
                    <option value={raiseRange} key={raiseRange}>
                      {raiseRange}
                    </option>
                  ))}
                </select>
                <small className="error-text">
                  {errors.raiseRange && "Please select a valid option"}
                </small>
              </div>
            </div>
            <div className="col-md-12">
              <div className={`form-group ${errors.orgName && "input-error"}`}>
                <label htmlFor="">PAY OUT METHOD (𝤿SET UP LATER)</label>
                <select
                  name=""
                  id=""
                  className="form-control"
                  {...register("payoutMethod", {
                    required: true,
                  })}
                >
                  <option value="">Select type</option>
                  <option value="plaid">PLAID (DIRECT DEPOSIT)</option>
                  <option value="check">
                    CHECK (USPS- MAY TAKE UP 3-4 WEEKS)
                  </option>
                </select>
                <small className="error-text">
                  {errors.payoutMethod && "Please select a valid option"}
                </small>
              </div>
            </div>
            <div className="actionWrapper">
              <button>Submit</button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default OrgSurveyPopup;

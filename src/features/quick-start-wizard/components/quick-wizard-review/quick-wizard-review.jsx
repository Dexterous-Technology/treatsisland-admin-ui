import moment from "moment";
import React from "react";
import Standard from "../../../../const/standards";

const QuickWizardReview = ({ gotoNextStep, gotoPrevStep, formValues }) => {
  console.log('formValues :>> ', formValues);
  return (
    <>
      <div className={"wizard_steps step3 "}>
        <div className="wizard_content py-0 mt-3">
          <div className="title h4 font-weight-bold text-center">
            Please review the following details and continue
          </div>

          <div className="details">
            <div className="item">
              <span className="left">Organization name </span>
              <span className="separator">:</span>
              <span className="right">{formValues.orgName}</span>
            </div>
            <div className="item">
              <span className="left">Organization type </span>
              <span className="separator">:</span>
              <span className="right">{formValues.orgTypeName}</span>
            </div>
            <div className="item">
              <span className="left">Event coordinator name </span>
              <span className="separator">:</span>
              <span className="right">{formValues.eventName}</span>
            </div>
            <div className="item">
              <span className="left">Start date </span>
              <span className="separator">:</span>
              <span className="right">{moment(formValues.startDate).format(Standard.dateTimeFormat)}</span>
            </div>
            <div className="item">
              <span className="left">End date </span>
              <span className="separator">:</span>
              <span className="right">{moment(formValues.startDate).add(5, 'days').format(Standard.dateTimeFormat)}</span>
            </div>
            <div className="item">
              <span className="left">Duration </span>
              <span className="separator">:</span>
              <span className="right">5 days</span>
            </div>
          </div>
        </div>
        <div className="wizard_buttons text-center">
          <span className="button secondary" onClick={gotoPrevStep}>
            Previous
          </span>
          <span className="button primary" onClick={gotoNextStep}>
            Yes, continue
          </span>
        </div>
      </div>
    </>
  );
};

export default QuickWizardReview;

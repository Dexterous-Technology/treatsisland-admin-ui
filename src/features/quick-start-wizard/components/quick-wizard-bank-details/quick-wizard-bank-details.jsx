import moment from "moment";
import React, { useState } from "react";

const QuickWizardBankDetails = ({ gotoNextStep, gotoPrevStep, formValues }) => {
  const [memberCount, setMemberCount] = useState("");
  const [raiserange, setRaiserange] = useState("");
  const [payoutMethod, setPayoutMethod] = useState("");
  console.log("memberCount 54554:>> ", memberCount);

  return (
    <>
      <div className={"wizard_steps step3 "}>
        <div className="wizard_content py-0 mt-3">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor=""> Bank routing number </label>
                <input type="text" placeholder="Enter your bank routing number" className="form-control" />
                {/* <small className="error-text"> Please provide valid event co-ordinator name </small> */}
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="">Bank account number</label>
                <input type="text" placeholder="Enter your bank account number" className="form-control" />
                {/* <small className="error-text"> Please provide valid event co-ordinator name </small> */}
              </div>
            </div>

            <div className="col-md-12">
              {/* <div className="form-group">
                <label htmlFor="">Pay out method?</label>
                <div className="d-flex">
                  <div className="form-check mr-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payoutMethod"
                      id="payoutMethod1"
                      value={"payoutMethod1"}
                      checked={payoutMethod === "payoutMethod1"}
                    />
                    <label
                      className="form-check-label"
                      for="payoutMethod1"
                      onClick={(e) => setPayoutMethod("payoutMethod1")}
                    >
                      Setup later
                    </label>
                  </div>
                  <div className="form-check mr-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payoutMethod"
                      id="payoutMethod2"
                      value={"payoutMethod2"}
                      checked={payoutMethod === "payoutMethod2"}
                    />
                    <label
                      className="form-check-label"
                      for="payoutMethod2"
                      onClick={(e) => setPayoutMethod("payoutMethod2")}
                    >
                      {" "}
                      Plaid (Direct deposit){" "}
                    </label>
                  </div>
                  <div className="form-check mr-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payoutMethod"
                      id="payoutMethod3"
                      value={"payoutMethod3"}
                      checked={payoutMethod === "payoutMethod3"}
                    />
                    <label
                      className="form-check-label"
                      for="payoutMethod3"
                      onClick={(e) => setPayoutMethod("payoutMethod3")}
                    >
                      {" "}
                      Check (USPS - May take upto 3-4 weeks){" "}
                    </label>
                  </div>
                </div>
                <small className="error-text"> Please provide valid event co-ordinator name </small>
              </div> */}
            </div>
          </div>
        </div>
        <div className="wizard_buttons text-center">
          <span className="button secondary" onClick={gotoPrevStep}>
            Previous
          </span>
          <span className="button primary" onClick={gotoNextStep}>
            Next
          </span>
        </div>
      </div>
    </>
  );
};

export default QuickWizardBankDetails;

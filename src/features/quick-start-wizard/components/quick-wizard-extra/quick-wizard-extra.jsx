import moment from "moment";
import React, { useState } from "react";

const QuickWizardExtra = ({ gotoNextStep, gotoPrevStep, formValues }) => {
  const [memberCount, setMemberCount] = useState("");
  const [raiserange, setRaiserange] = useState("");
  const [payoutMethod, setPayoutMethod] = useState("");
  console.log("memberCount 54554:>> ", memberCount);

  return (
    <>
      <div className={"wizard_steps step3 "} onClick={e => e.stopPropagation()}>
        <div className="wizard_content py-0 mt-3">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="">
                  How many members are in your organization?
                </label>
                <div className="d-block d-lg-flex">
                  <div className="form-check mr-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="memberCount"
                      id="memberCount1"
                      value="memberCount1"
                      checked={memberCount === "memberCount1"}
                      onChange={e => setMemberCount("memberCount1")}
                    />
                    <label
                      className="form-check-label"
                      for="memberCount1"
                      
                    >
                      1-25
                    </label>
                  </div>
                  <div className="form-check mr-3" >
                    <input
                      className="form-check-input"
                      type="radio"
                      name="memberCount"
                      id="memberCount2"
                      value="memberCount2"
                      checked={memberCount === "memberCount2"}
                      onChange={e => setMemberCount("memberCount2")}
                    />
                    <label
                      className="form-check-label"
                      for="memberCount2"
                      
                    >
                      {" "}
                      26-50{" "}
                    </label>
                  </div>
                  <div className="form-check mr-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="memberCount"
                      id="memberCount3"
                      value="memberCount3"
                      checked={memberCount === "memberCount3"}
                      onChange={e => setMemberCount("memberCount3")}
                      // onChange={(e) => setMemberCount(e.target.value)}
                    />
                    <label
                      className="form-check-label"
                      for="memberCount3"
                      
                    >
                      {" "}
                      51-75{" "}
                    </label>
                  </div>
                  <div className="form-check mr-3" >
                    <input
                      className="form-check-input"
                      type="radio"
                      name="memberCount"
                      id="memberCount4"
                      value="memberCount4"
                      checked={memberCount === "memberCount4"}
                      onChange={e => setMemberCount("memberCount4")}
                      // onChange={(e) => setMemberCount(e.target.value)}
                    />
                    <label
                      className="form-check-label"
                      for="memberCount4"
                      
                    >
                      {" "}
                      76-100{" "}
                    </label>
                  </div>
                  <div className="form-check mr-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="memberCount"
                      id="memberCount5"
                      value="memberCount5"
                      checked={memberCount === "memberCount5"}
                      onChange={e => setMemberCount("memberCount5")}
                      // onChange={(e) => setMemberCount(e.target.value)}
                    />
                    <label
                      className="form-check-label"
                      for="memberCount5"
                      
                    >
                      {" "}
                      100+{" "}
                    </label>
                  </div>
                </div>
                {/* <small className="error-text"> Please provide valid event coordinator name </small> */}
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="">How much would you like to raise?</label>
                <div className="d-block d-lg-flex">
                  <div className="form-check mr-3" >
                    <input
                      className="form-check-input"
                      type="radio"
                      name="raiseAmount"
                      id="raiseAmount1"
                      checked={raiserange === "raiseAmount1"}
                      onChange={e => setRaiserange("raiseAmount1")}
                      // onChange={(e) => e.preventDefault()}
                    />
                    <label
                      className="form-check-label"
                      for="raiseAmount1"
                      
                    >
                      $500 - $2000
                    </label>
                  </div>
                  <div className="form-check mr-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="raiseAmount"
                      id="raiseAmount2"
                      checked={raiserange === "raiseAmount2"}
                      onChange={e => setRaiserange("raiseAmount2")}
                      // onChange={(e) => setRaiserange(e.target.value)}
                    />
                    <label
                      className="form-check-label"
                      for="raiseAmount2"
                      
                    >
                      {" "}
                      $2500 - $5000{" "}
                    </label>
                  </div>
                  <div className="form-check mr-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="raiseAmount"
                      id="raiseAmount3"
                      checked={raiserange === "raiseAmount3"}
                      onChange={e => setRaiserange("raiseAmount3")}
                      // onChange={(e) => setRaiserange(e.target.value)}
                    />
                    <label
                      className="form-check-label"
                      for="raiseAmount3"
                      
                    >
                      {" "}
                      $6000 - $12,500{" "}
                    </label>
                  </div>
                  <div className="form-check mr-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="raiseAmount"
                      id="raiseAmount4"
                      checked={raiserange === "raiseAmount4"}
                      onChange={e => setRaiserange("raiseAmount4")}
                      // onChange={(e) => setRaiserange(e.target.value)}
                    />
                    <label
                      className="form-check-label"
                      for="raiseAmount4"
                      
                    >
                      {" "}
                      $15,000 - $30,000{" "}
                    </label>
                  </div>
                  <div className="form-check mr-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="raiseAmount"
                      id="raiseAmount5"
                      checked={raiserange === "raiseAmount5"}
                      onChange={e => setRaiserange("raiseAmount5")}
                      // onChange={(e) => setRaiserange(e.target.value)}
                    />
                    <label
                      className="form-check-label"
                      for="raiseAmount5"
                      
                    >
                      {" "}
                      $40,000+{" "}
                    </label>
                  </div>
                </div>
                {/* <small className="error-text"> Please provide valid event coordinator name </small> */}
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
                <small className="error-text"> Please provide valid event coordinator name </small>
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

export default QuickWizardExtra;

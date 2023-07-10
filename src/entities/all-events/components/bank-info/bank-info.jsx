import React, { Component, useEffect, useState } from "react";
const BankInfoPopup = ({ isVisible, onModalDismiss, selectedEvent }) => {
  return (
    <>
      {/* **************************************** MODAL - BANK INFO */}
      <div className={"modalBankInfo " + (isVisible ? "show" : "")}>
        <div className="innerWrapper">
          <div className="modalHeader">
            <span>Bank details information</span>
            <span className="closeModal" onClick={onModalDismiss}>
              <i className="fa fa-times"></i>
            </span>
          </div>

          <div className="modalContent">
            {selectedEvent?._payoutDetails ? (
              <>
                {selectedEvent?._payoutDetails?.PayoutType === "Mail check" ? (
                  <>
                    <div className="item">
                      <span>Fullname</span>
                      <span>:</span>
                      <span>{selectedEvent?._payoutDetails.Fullname}</span>
                    </div>
                    <div className="item">
                      <span>Address</span>
                      <span>:</span>
                      <span>{selectedEvent?._payoutDetails.Street}</span>
                    </div>
                    <div className="item">
                      <span>City</span>
                      <span>:</span>
                      <span>{selectedEvent?._payoutDetails.City}</span>
                    </div>
                    <div className="item">
                      <span>State</span>
                      <span>:</span>
                      <span>{selectedEvent?._payoutDetails.State}</span>
                    </div>
                    <div className="item">
                      <span>Zip</span>
                      <span>:</span>
                      <span>{selectedEvent?._payoutDetails.Zip}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="item">
                      <span>Fullname</span>
                      <span>:</span>
                      <span>{selectedEvent?._payoutDetails.Fullname}</span>
                    </div>
                    <div className="item">
                      <span>Bank Name</span>
                      <span>:</span>
                      <span>{selectedEvent?._payoutDetails.BankName}</span>
                    </div>
                    <div className="item">
                      <span>Bank Account Number</span>
                      <span>:</span>
                      <span>
                        {selectedEvent?._payoutDetails.BankAccountNumber}
                      </span>
                    </div>
                    <div className="item">
                      <span>bank Routing Number</span>
                      <span>:</span>
                      <span>
                        {selectedEvent?._payoutDetails.BankRoutingNumber}
                      </span>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
              <div className="noDetailsWrapper">
                <h6>No payout details information</h6>
              </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BankInfoPopup;

import React, { Component, useEffect, useState } from "react";
const BankInfoPopup = ({
  modalBankInfo = true,
  selectedEvent = null,
  onBankInfoModalDismiss = () => {
  },
}) => {

  useEffect(() => {
  }, [modalBankInfo])

  return (
    <>
      {/* **************************************** MODAL - BANK INFO */}
      <div className={"modalBankInfo " + (modalBankInfo ? "show" : "")}>
          <div className="innerWrapper">
              <div className="modalHeader">
                <span>Bank details information</span>
                <span className="closeModal" onClick={(e) => onBankInfoModalDismiss()} ><i className="fa fa-times"></i></span>
              </div>


              <div className="modalContent">
                  <div className="item">
                      <span>Bank routing number</span>
                      <span>:</span>
                      <span>56987564</span>
                  </div>
                  <div className="item">
                      <span>Bank account number</span>
                      <span>:</span>
                      <span>32654569878965</span>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
};

export default BankInfoPopup;

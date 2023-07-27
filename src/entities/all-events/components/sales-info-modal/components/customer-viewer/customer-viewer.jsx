import React, { Component } from "react";

const CustomerViewer = ({ customerName = "", email = "", phone = "" }) => {
  const [showCustomerDetails, setShowCustomerDetails] = React.useState(false);
  return (
    <>
      <div onClick={(e) => setShowCustomerDetails(!showCustomerDetails)}>
        <span className="customerName">
          <i className="fa fa-info iconInfo"></i> {customerName}
        </span>

        <div
          className={
            "customerDetails " +
            (showCustomerDetails ? " d-block " : " d-none ")
          }
        >
          <div className="email">
            <i className="fa fa-envelope"></i> {email?.length ? email : "N/A"}
          </div>
          <div className="phno">
            <i className="fa fa-phone"></i> {phone?.length ? phone : "N/A"}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerViewer;

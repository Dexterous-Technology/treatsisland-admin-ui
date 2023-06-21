import React, { useEffect, Component, useState } from "react";
import { useHistory } from "react-router-dom";

const Sidebar = () => {
  const history = useHistory();
  
  const _allEvents = (e) => {
    e.preventDefault();
    history.push("/super-all-events");
  };

  const _allProduct = (e) => {
    e.preventDefault();
    history.push("/super-product-management");
  };

  return (
    <>
      {/* ************************** SIDEBAR */}
        <div className="sidebar">
            <div
                id="sidemenuClose"
                className="d-block d-md-none"
                onClick={(e) => document.body.classList.remove("openAdminSideMenu")}
            >
                <i className="fa fa-times" />
            </div>

            <div className="logo"><img src={require("../../assets/images/logo.png")} alt="" /></div>

            <div className="menu-items">
                <div className={ history?.location?.pathname == '/super-all-events' ? 'item active' : 'item' } onClick={_allEvents}>All events</div>
                <div className={ history?.location?.pathname == '/super-product-management' ? 'item active' : 'item' }  onClick={_allProduct}>Product management</div>
            </div>
        </div>
        {/* ************************** /SIDEBAR */}
     
    </>
  );
};
export default Sidebar;

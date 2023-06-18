import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { EventEmitter } from "../../utils/event-emitter";

const Sidebar = () => {
  const history = useHistory(false);

  const _showWizard = () => {
    // if (hasActiveEvents) {
    //   toast.error("You already have an active event!");
    // } else {
      EventEmitter.dispatch("SHOW_QUICK_WIZARD");
    // }
  };

  return (
    <>
      <ul
        className="navbar-nav bg-gradient-custom sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <div
          id="sidemenuClose"
          className="d-block d-md-none"
          onClick={(e) => document.body.classList.remove("openAdminSideMenu")}
        >
          <i className="fa fa-times" />
        </div>
        {/* Sidebar - Brand */}
        <NavLink
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/home"
        >
          <div className="sidebar-brand-text mx-3">
            <img src={require("../../assets/images/logo.png")} alt="" />
          </div>
        </NavLink>
        {/* Divider */}
        <hr className="sidebar-divider my-0" />
        <div className="sidebar-heading">{/* Addons */}</div>

        <li className="nav-item">
          <NavLink className="nav-link" to="/all-events">
            <i className="fas fa-fw fa-table" />
            <span>All events</span>
          </NavLink>
        </li>
        
        <li className="nav-item">
          <div className="nav-link" onClick={(e) => _showWizard()}>
            <i className="fas fa-fw fa-plus" />
            <span>Create your own event</span>
          </div>
        </li>
        {/* Nav Item - Charts */}
        {/* <li className="nav-item">
          <NavLink className="nav-link" to="/organization">
            <i className="fas fa-fw fa-chart-area" />
            <span>Organization</span>
          </NavLink>
        </li> */}
        {/* Nav Item - Tables */}

        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />
        {/* Sidebar Toggler (Sidebar) */}
        {/* <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle" />
        </div> */}
      </ul>
    </>
  );
};
export default Sidebar;

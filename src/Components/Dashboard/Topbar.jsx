import React, { useEffect, Component, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import AuthHelper from "../../utils/auth-helper";
import { EventEmitter } from "../../utils/event-emitter";
import "./Topbar.scss";
import moment from "moment";
import { toast } from "react-toastify";
import SessionUtils from "../../utils/session-utils";

const Sidebar = () => {
  const history = useHistory();
  const { events } = useSelector((state) => state.event);

  const _logout = (e) => {
    e.preventDefault();
    SessionUtils.removeToken();
    window.location.href = "/";
    // window.location.reload();
  };
  const { user } = useSelector((state) => state.user);

  let userName = "User";
  if (user) {
    userName = `${user.FirstName} ${user.LastName}`;
  }

  const _checkIfHasActiveEvents = () => {
    let hasActiveEvent = false;
    for (let event of events) {
      const startDateTimeStamp = +moment(parseInt(event.StartDate)).toDate();
      const endDateTimeStamp = +moment(parseInt(event.StartDate))
        .add(5, "days")
        .toDate();
      const currentDateTimeStamp = +moment().toDate();
      if (
        currentDateTimeStamp > startDateTimeStamp &&
        currentDateTimeStamp < endDateTimeStamp
      ) {
        hasActiveEvent = true;
        break;
      }
    }
    return hasActiveEvent;
  };

  const hasActiveEvents = _checkIfHasActiveEvents();

  const _showWizard = () => {
    // if (hasActiveEvents) {
    //   toast.error("You already have an active event!");
    // } else {
    EventEmitter.dispatch("SHOW_QUICK_WIZARD");
    // }
  };

  return (
    <>
      {/* Topbar */}
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        {/* Sidebar Toggle (Topbar) */}
        <button
          id="sidebarOpen"
          className="btn btn-link d-md-none rounded-circle mr-3"
          onClick={(e) => document.body.classList.add("openAdminSideMenu")}
        >
          <i className="fa fa-bars" />
        </button>

        <NavLink to="/home">
          <div className="mobileLogo d-block d-md-none">
            <img src={require("../../assets/images/logo.png")} alt="" />
          </div>
        </NavLink>

        {/* Topbar Search */}
        {/* <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-light border-0 small"
              placeholder="Search for..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fas fa-search fa-sm" />
              </button>
            </div>
          </div>
        </form> */}
        {/* Topbar Navbar */}
        <ul className="navbar-nav ml-auto d-flex align-items-center">
          {/* <button className="createEventBtn mt-0" onClick={_showWizard}>
            Create an event now
          </button> */}
          <div className="topbar-divider d-none d-sm-block" />
          {/* Nav Item - User Information */}
          <li className="nav-item">
            <a
              className="btn btn-sm btn-dark logoutButton"
              href="#"
              onClick={_logout}
            >
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
              <span>Logout</span>
            </a>
          </li>
          {/* <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                {userName}
              </span>
              <img
                className="img-profile rounded-circle"
                src="https://www.w3schools.com/howto/img_avatar.png"
              />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <a className="dropdown-item" href="#">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                Profile
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                Settings
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                Activity Log
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="#" onClick={_logout}>
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                Logout
              </a>
            </div>
          </li> */}
        </ul>
      </nav>
      {/* End of Topbar */}

      {/* Logout Modal*/}
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Ready to Leave?
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              Select "Logout" below if you are ready to end your current
              session.
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                type="button"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <a
                className="btn btn-primary"
                href="login.html"
                onClick={_logout}
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;

import React, { useEffect, Component, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import AuthHelper from "../../utils/auth-helper";
// import { EventEmitter } from "../../utils/event-emitter";
import "./Topbar.scss";
import moment from "moment";
import { toast } from "react-toastify";
import SessionUtils from "../../utils/session-utils";

const Sidebar = () => {
  const history = useHistory();

  const _logout = (e) => {
    e.preventDefault();
    SessionUtils.removeToken();
    window.location.href = "/";
  };
  const { user } = useSelector((state) => state.user);

  let userName = "User";
  if (user) {
    userName = `${user.FirstName} ${user.LastName}`;
  }


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

        {/* Topbar Navbar */}
        <ul className="navbar-nav ml-auto d-flex align-items-center">
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

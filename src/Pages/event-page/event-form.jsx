import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory,NavLink } from "react-router-dom";
import AuthHelper from "../../utils/auth-helper";
import Sidebar from "../../Components/Dashboard/Sidebar";
import Topbar from "../../Components/Dashboard/Topbar";
import "./event-page.scss";

const OrganizationPage = () => {

  return (
    <>
      <div id="page-top">
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar />
               <div className="container-fluid">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="m-0 font-weight-bold text-primary">
                       New Event 
                      </h6>
                    </div>
                    <div className="card-header py-3 text-right">
                      <NavLink className="btn btn-danger btn-icon-split" to='/event/1'>
                        <span className="text">Back</span>
                      </NavLink>
                    </div>
                    
                    <div className="card-body">
                    
                    <form className="user" >
                     
                      <div className="form-group row">
                        <div className="col-sm-6">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="" placeholder="Name"
                          />
                        </div>
                        <div className="col-sm-6">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="" placeholder="Description"
                          />
                        </div>
                      </div>
                      
                      <input
                        type="submit"
                        className="btn btn-primary btn-user w-10"
                      />
                    
                    </form>

                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up" />
        </a>
      </div>
    </>
  );
};

export default OrganizationPage;

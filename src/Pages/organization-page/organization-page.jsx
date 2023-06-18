import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, NavLink } from "react-router-dom";
import AuthHelper from "../../utils/auth-helper";
import Sidebar from "../../Components/Dashboard/Sidebar";
import Topbar from "../../Components/Dashboard/Topbar";
import "./organization-page.scss";
import OrgCreator from "../../entities/org/components/org-creator/org-creator";
import ApiCalls from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setOrgs } from "../../store/org-store";
import OrgSurveyPopup from "../../entities/org/components/org-survey-popup/org-survey-popup";

const OrganizationPage = () => {
  const [isLoaderActive, setIsLoaderActive] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "abcd",
      description: "description ",
    },
  });
  const history = useHistory();
  console.log("history :>> ", history);
  const onSubmit = async (data) => {
    console.log("form data : ", data);
  };
  const dispatch = useDispatch();
  const { orgs } = useSelector((state) => state.org);

  const _loadOrgs = async () => {
    setIsLoaderActive(true);
    try {
      const response = await ApiCalls.org.private.loadOrgs();
      if (response?.data?.data?.allOrgMemberShips) {
        dispatch(setOrgs(response?.data?.data?.allOrgMemberShips));
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
    setIsLoaderActive(false);
  };

  const _openEventPage = (org) => {
    history.push(`/event/${org.OrganizationID}`);
  };

  useEffect(() => {
    _loadOrgs();
  }, []);
  return (
    <>
      {
        <div id="page-top">
          {isLoaderActive ? (
            <div className="loaderWrapper pageLoader">
              <div className="loader"></div>
            </div>
          ) : (
            <></>
          )}
          <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar />
                <div className="container-fluid">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Organization
                      </h6>
                    </div>
                    <div className="card-header py-3 text-right">
                      {/*<NavLink className="btn btn-danger btn-icon-split" to='/organization/add'>
                      <span className="text">Add </span>
                    </NavLink>*/}
                      {/* <button
                        type="button"
                        className="btn btn-danger btn-icon-split"
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        {" "}
                        <span className="text">Add </span>
                      </button> */}
                    </div>

                    <OrgSurveyPopup />

                    <div className="card-body">
                      <div className="row">
                        <OrgCreator />
                        {orgs?.map((org) => (
                          <div class="col-md-3" key={org.OrgCode}>
                            <div className="org-card">
                              <p className="orgIcon">
                                <i className="fa-solid fa-building-columns"></i>
                              </p>
                              <h5 className="card-title">
                                {org.OrganizationName}
                              </h5>
                              <h6 className="card-title orgType">
                                {org.OrganizationType}
                              </h6>
                              {/*<h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>*/}
                              <p className="card-text orgCode">
                                Org Code: {org.OrgCode}
                              </p>
                              <button
                                className="eventManageBtn"
                                onClick={(e) => _openEventPage(org)}
                              >
                                Manage Events
                              </button>
                              {/* <NavLink to="/event/1" className="card-link">
                                {" "}
                                Event link
                              </NavLink> */}
                              {/* <strong className="card-text">(2)</strong> */}
                            </div>
                          </div>
                        ))}
                      </div>
                      {/*}
                      <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                          <thead>
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Office</th>
                                <th>Age</th>
                                <th>Start date</th>
                                <th>Salary</th>
                            </tr>
                          </thead>
                          <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Office</th>
                                <th>Age</th>
                                <th>Start date</th>
                                <th>Salary</th>
                            </tr>
                          </tfoot>
                          <tbody>
                              <tr>
                                  <td>
                                  <NavLink to='/event/1'> Tiger Nixon </NavLink>
                                  </td>
                                  <td>System Architect</td>
                                  <td>Edinburgh</td>
                                  <td>61</td>
                                  <td>2011/04/25</td>
                                  <td>$320,800</td>
                              </tr>
                          </tbody>
                        </table>
                      </div>
                      */}
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
      }

      <div
        className="modal left fade"
        id="exampleModal"
        tabIndex=""
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">New Organization</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <form className="user" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <div className="">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      placeholder="Title"
                      {...register("title", {
                        required: "title field required",
                      })}
                      aria-invalid={errors.title ? "true" : "false"}
                    />
                    {errors.title && (
                      <span className="errorText">{errors.title?.message}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <div className="">
                    <input
                      type="text"
                      name="description"
                      className="form-control form-control-user"
                      placeholder="Description"
                      {...register("description", {
                        required: "description field required",
                      })}
                    />
                    {errors.description && (
                      <span className="errorText">
                        {errors.description?.message}
                      </span>
                    )}
                  </div>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-user w-10"
                />
              </form>
            </div>
            {/*<div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizationPage;

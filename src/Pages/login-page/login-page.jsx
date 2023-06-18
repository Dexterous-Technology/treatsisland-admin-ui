import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AuthHelper from "../../utils/auth-helper";
import { useHistory } from "react-router-dom";

import "./login-page.scss";
import JoinEventHelper from "../../features/join-event/join-event-helper";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [formError, setFormError] = useState("");
  const history = useHistory(false);

  const onSubmit = async ({ email, password }) => {
    setIsSubmiting(true);
    setFormError("");
    try {
      await AuthHelper.login({
        email,
        password,
      });
      JoinEventHelper.initiateJoinProcess();
      history.replace("/home");
    } catch (error) {
      console.log("error :>> ", error);
      setFormError(error?.message);
    }
    setIsSubmiting(false);
  };

  const _register = (e) => {
    e.preventDefault();
    history.push("/register");
  };

  const _forgotPassword = (e) => {
    e.preventDefault();
    history.push("/register");
  };

  // console.log('JoinEventHelper.eventId :>> ', JoinEventHelper.eventId);

  return (
    <>
      <div className=" bg-gradient-primary loginBg">
        <div className="container">
          {/* Outer Row */}
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  {/* Nested Row within Card Body */}
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">
                            Welcome Back!
                          </h1>
                        </div>
                        <form
                          className="user"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control form-control-user"
                              id="exampleInputEmail"
                              aria-describedby="emailHelp"
                              placeholder="Enter Email Address"
                              {...register("email", {
                                required: true,
                                minLength: 5,
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Invalid email address",
                                },
                              })}
                            />
                          {errors.email && <span className="errorText">Please provide a valid email address</span>}
                          </div>

                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control form-control-user"
                              id="exampleInputPassword"
                              placeholder="Password"
                              {...register("password", {
                                required: true,
                                minLength: 5,
                              })}
                            />
                          {errors.password && (
                            <span className="errorText">Please provide a valid password</span>
                          )}
                          </div>
                          <div className="form-group">
                            <div className="custom-control custom-checkbox small">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customCheck"
                              >
                                Remember Me
                              </label>
                            </div>
                          </div>
                         

                          <input
                            type="submit"
                            className="btn btn-primary btn-user btn-block"
                            value={isSubmiting ? "Logging in" : "Login"}
                            disabled={isSubmiting}
                            style={
                              isSubmiting
                                ? {
                                    opacity: 0.6,
                                    pointerEvents: "none",
                                  }
                                : null
                            }
                          />
                           {formError?.length ? <span className="errorText">{formError}</span> : <></>}
                          <hr />
                          {/* <a
                            href="index.html"
                            className="btn btn-google btn-user btn-block"
                          >
                            <i className="fab fa-google fa-fw" /> Login with
                            Google
                          </a>
                          <a
                            href="index.html"
                            className="btn btn-facebook btn-user btn-block"
                          >
                            <i className="fab fa-facebook-f fa-fw" /> Login with
                            Facebook
                          </a> */}
                        </form>
                        <hr />
                        {/* <div className="text-center">
                          <a className="small" href="forgot-password.html">
                        <div className="text-center">
                          <a
                            className="small"
                            href="forgot-password.html"
                            onClick={_forgotPassword}
                          >
                            Forgot Password?
                          </a>
                        </div> */}
                        <div className="text-center">
                          <a
                            className="small"
                            href="register.html"
                            onClick={_register}
                          >
                            Create an Account!
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

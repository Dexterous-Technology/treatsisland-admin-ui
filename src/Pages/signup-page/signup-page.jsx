import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import JoinEventHelper from "../../features/join-event/join-event-helper";
import AuthHelper from "../../utils/auth-helper";

import "./signup-page.scss";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [formError, setFormError] = useState("");
  const history = useHistory(false);

  const onSubmit = async ({
    email,
    password,
    repeatpassword,
    firstName,
    lastName,
    phone,
  }) => {
    console.log("email :>> ", email);
    setFormError("");
    setIsSubmiting(true);
    setFormError("");
    try {
      if (password !== repeatpassword) {
        setFormError("Password didn't match");
        return;
      }
      console.log(email, password, repeatpassword, firstName, lastName, phone);
      // First create account on firebase
      await AuthHelper.register({
        email,
        password,
      });
      await AuthHelper.createUserAndExchangeToken({
        email,
        firstName,
        lastName,
        phone,
      });
      JoinEventHelper.initiateJoinProcess();
      history.replace("/home");
    } catch (error) {
      console.log("error :>> ", error);
      setFormError(error?.message);
    }
    setIsSubmiting(false);
  };

  const _login = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  console.log('JoinEventHelper.eventId :>> ', JoinEventHelper.eventId);


  return (
    <>
      <div className="bg-gradient-primary loginBg registerWrapper">
        <div className="container">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* Nested Row within Card Body */}
              <div className="row">
                <div className="col-lg-5 d-none d-lg-block bg-register-image" />
                <div className="col-lg-7">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        Create an Account!
                      </h1>
                    </div>
                    <form className="user" onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            placeholder="First Name"
                            {...register("firstName", {
                              required: true,
                              minLength: 2,
                            })}
                          />
                          {errors.firstName && (
                            <span className="errorText">
                              Please enter your first name
                            </span>
                          )}
                        </div>
                        <div className="col-sm-6">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            placeholder="Last Name"
                            {...register("lastName", {
                              required: true,
                              minLength: 2,
                            })}
                          />
                          {errors.lastName && (
                            <span className="errorText">
                              Please enter your last name
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          placeholder="Phone Number"
                          {...register("phone", {
                            required: false,
                            minLength: 10,
                          })}
                        />
                        {errors.phone && (
                          <span className="errorText">
                            Please provide a valid phone
                          </span>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          placeholder="Email Address"
                          {...register("email", {
                            required: true,
                            minLength: 5,
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                        />
                        {errors.email && (
                          <span className="errorText">
                            Please provide a valid email
                          </span>
                        )}
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
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
                            <span className="errorText">
                              Please provide a valid password
                            </span>
                          )}
                        </div>
                        <div className="col-sm-6">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="exampleRepeatPassword"
                            placeholder="Repeat Password"
                            {...register("repeatpassword", {
                              required: true,
                              minLength: 5,
                            })}
                          />
                        </div>
                      </div>
                      {formError?.length ? (
                        <span className="errorText">{formError}</span>
                      ) : (
                        <></>
                      )}

                      <input
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                        value={isSubmiting ? "Please wait" : "Register Account"}
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
                      <hr />
                    </form>
                    <hr />
                    <div className="text-center">
                      <a className="small" href="forgot-password.html">
                        Forgot Password?
                      </a>
                    </div>
                    <div className="text-center">
                      <a className="small" href="login.html" onClick={_login}>
                        Already have an account? Login!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bootstrap core JavaScript*/}
        {/* Core plugin JavaScript*/}
        {/* Custom scripts for all pages*/}
      </div>
    </>
  );
};

export default SignupPage;

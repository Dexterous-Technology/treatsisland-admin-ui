import React, { Component, useEffect } from "react";
import CartUtils from "../../cart-utils";
import USStates from "../../../../const/us-states.json";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const CartUserForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
    formState,
  } = useForm();

  const { userDetails } = useSelector((state) => state.cart);

  const _setValuesIfNeeded = () => {
    setValue("name", userDetails.name || "");
    setValue("address", userDetails.address || "");
    setValue("city", userDetails.city || "");
    setValue("street", userDetails.street || "");
    setValue("state", userDetails.state || "");
    setValue("zip", userDetails.zip || "");
    setValue("email", userDetails.email || "");
  };
  

  const onSubmit = () => {
    setValuesToRedux();
    CartUtils.showCartCheckoutStep();
  };

  const setValuesToRedux = () => {
    const values = getValues();
    CartUtils.updateUserDetails({
      ...values,
    });
  };

  const _navigateToPrev = () => {
    setValuesToRedux();
    CartUtils.showCartProductsView();
  };

  useEffect(() => {
    _setValuesIfNeeded();
  }, []);
  return (
    <>
      <form
        className={"inner-content person-details step2 show"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="modal-title">
          <span class="title">Customer information</span>
          {/* close button */}
          <div className="close-modal" onClick={CartUtils.hideExpandedCart}>
            <svg
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 5L4.99998 19M5.00001 5L19 19"
                stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          {/* /close button */}
        </div>

        <div className="form-wrapper">
          <div className="form-section">
            <div className="title">Personal Details</div>

            <div className="row">
              <div className="col-md-6">
                <div className={`form-group ${errors.name ? "formError" : ""}`}>
                  <label>Full name</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("name", {
                      required: true,
                      minLength: 2,
                    })}
                  />
                  <span className="errMsg">
                    {errors.name && "Please provide valid name"}
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className={`form-group ${errors.email ? "formError" : ""}`}
                >
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    {...register("email", {
                      required: true,
                      minLength: 2,
                    })}
                  />
                  <span className="errMsg">
                    {errors.email && "Please provide valid email"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="title">Shipping address</div>

            <div className="row">
              <div className="col-md-12">
                <div
                  className={`form-group ${errors.street ? "formError" : ""}`}
                >
                  <label>Street</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("street", {
                      required: true,
                      minLength: 2,
                    })}
                  />
                  <span className="errMsg">
                    {errors.street && "Please provide valid street"}
                  </span>
                </div>
              </div>
              <div className="col-md-12">
                <div className={`form-group ${errors.city ? "formError" : ""}`}>
                  <label>City</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("city", {
                      required: true,
                      minLength: 2,
                    })}
                  />
                  <span className="errMsg">
                    {errors.city && "Please provide valid city"}
                  </span>
                </div>
              </div>
              <div className="col-md-8">
                <div
                  className={`form-group ${errors.state ? "formError" : ""}`}
                >
                  <label>State</label>
                  <select
                    name=""
                    id=""
                    className="form-control"
                    {...register("state", {
                      required: true,
                      minLength: 2,
                    })}
                  >
                    <option
                      value=""
                      label="Select a state ... "
                      selected="selected"
                    >
                      Select a state ...{" "}
                    </option>
                    {USStates?.map((state) => (
                      <option value={state.abbreviation} key={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  <span className="errMsg">
                    {errors.state && "Please provide valid state"}
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                <div className={`form-group ${errors.zip ? "formError" : ""}`}>
                  <label>Zip code</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("zip", {
                      required: true,
                      minLength: 2,
                    })}
                  />
                  <span className="errMsg">
                    {errors.zip && "Please provide valid zip"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-buttons text-right">
          <span className="button prev" onClick={_navigateToPrev}>
            Previous
          </span>
          <button className="button" type="submit">
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default CartUserForm;

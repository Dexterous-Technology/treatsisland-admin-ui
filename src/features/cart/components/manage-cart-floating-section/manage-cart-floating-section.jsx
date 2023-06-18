import React from "react";
import { useSelector } from "react-redux";
import CartUtils from "../../cart-utils";
import CartFinalCheckout from "../cart-final-checkout/cart-final-checkout";
import CartProductsView from "../cart-products-view/cart-products-view";
import CartUserForm from "../cart-user-form/cart-user-form";
import CartInitialPayment from "../cart-initial-payment/cart-initial-payment";
import "./manage-cart-floating-section.scss";

const ManageCartFloatingSection = () => {
  const { selectedProducts, isCartExpanded, currentStep } = useSelector(
    (state) => state.cart
  );

  const _renderStep = () => {
    switch (currentStep) {
      case "product-review": {
        return (
          <>
            <CartProductsView />
          </>
        );
      }
      case "address-form": {
        return (
          <>
            <CartUserForm />
          </>
        );
      }
      case "final-checkout": {
        return (
          <>
            <CartFinalCheckout />
          </>
        );
      }
      case "payment-initial": {
        return (
          <>
            <CartInitialPayment />
          </>
        );
      }
      default: {
        return <></>;
      }
    }
  };

  if (selectedProducts?.length) {
    return (
      <>
        {/* ICON */}
        <div className="cart-icon" onClick={CartUtils.showExpandedCart}>
          <svg
            version="1.1"
            id="_x32_"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path
                class="st0"
                d="M512,182.161c0-12.088-4.164-23.909-11.996-33.389c-9.964-12.046-24.792-19.027-40.42-19.027H349.003
                      c-2.382-8.597-7.88-15.895-15.245-20.56l-0.133-66.82l-0.017-0.124c-0.283-13.546-7.797-25.892-19.71-32.323
                      c-5.582-3.016-11.763-4.532-17.895-4.532c-6.697,0-13.429,1.832-19.377,5.423l-0.016-0.025l-65.146,37.538l-0.216,0.15
                      c-15.696,9.78-25.725,26.492-27.041,44.919l-0.033,0.624v35.764c-20.844,0.1-40.904,7.864-56.366,21.826l-108.732,98.21
                      C6.732,260.969,0,276.639,0,292.726c0,5.839,0.883,11.763,2.732,17.511L54.499,472.9c6.381,20.077,25.008,33.714,46.085,33.714
                      h230.092c25.208,0,49.45-9.706,67.711-27.083l66.995-63.813c8.714-8.314,14.628-19.11,16.911-30.939l0.066-0.383l28.841-193.054
                      h-0.033C511.701,188.3,512,185.227,512,182.161z M218.996,95.539c0.6-7.164,4.515-13.628,10.597-17.477l64.696-37.288l0.266-0.159
                      c0.45-0.275,0.916-0.425,1.449-0.425c0.45,0,0.883,0.101,1.316,0.351h0.017c0.883,0.483,1.433,1.399,1.466,2.365l0.149,64.404
                      c-9.014,4.44-15.861,12.571-18.577,22.435h-36.105v34.813h215.313c2.632,0,5.198,0.592,7.514,1.683l-93.636,86.863
                      c-9.964,9.03-22.959,14.012-36.388,14.012h-92.07c-2.749-14.778-12.696-26.991-26.075-32.93L218.996,95.539z M151.134,177.438
                      c9.064-8.188,20.826-12.721,33.022-12.862l-0.033,68.902c-14.245,5.616-24.925,18.244-27.791,33.639H51.85L151.134,177.438z
                      M48.901,340.56l-13.013-40.87c-0.666-2.15-0.999-4.298-1.016-6.464h64.629l5.998,47.334H48.901z M55.832,362.311h52.417
                      l5.348,42.378H69.328L55.832,362.311z M100.584,471.809c-5.898,0-11.13-3.84-12.912-9.456l-11.43-35.888h40.104l5.732,45.344
                      H100.584z M188.922,471.809h-44.918l-5.732-45.344h50.65V471.809z M188.922,404.689h-53.399l-5.348-42.378h58.747V404.689z
                      M188.922,340.56h-61.497l-5.998-47.334h67.494V340.56z M198.802,277.28c-6.615,0-11.98-5.381-11.98-11.971
                      c0-6.623,5.365-11.971,11.98-11.971c6.597,0,11.962,5.348,11.962,11.971C210.765,271.899,205.4,277.28,198.802,277.28z
                      M265.564,471.809h-54.882v-45.344h56.015L265.564,471.809z M267.246,404.689h-56.564v-42.378h57.631L267.246,404.689z
                      M268.846,340.56h-58.164v-47.334h59.364L268.846,340.56z M336.541,471.517c-1.949,0.176-3.916,0.292-5.864,0.292h-43.352
                      l1.133-45.344h50.666L336.541,471.517z M340.373,404.689h-51.367l1.066-42.378h52.733L340.373,404.689z M344.055,340.56h-53.432
                      l1.182-47.334h45.27c3.282,0,6.514-0.276,9.747-0.658L344.055,340.56z M399.288,430.598l-24.909,23.716
                      c-3.416,3.25-7.198,6.041-11.196,8.44l2.449-42.52l36.538-29.357L399.288,430.598z M404.336,361.22l-37.005,29.732l2.315-40.445
                      l37.655-30.274L404.336,361.22z M409.451,290.593l-38.122,30.64l2.1-36.738c6.298-3.191,12.212-7.19,17.528-11.996l21.243-19.71
                      L409.451,290.593z M448.055,378.322c-0.917,4.657-3.249,8.906-6.682,12.204l-18.66,17.744l2.616-36.022l26.874-21.592
                      L448.055,378.322z M456.935,318.966l-29.44,23.643l2.966-40.995l33.022-26.516L456.935,318.966z M468.214,243.366l-35.588,28.616
                      l2.966-40.886l40.004-37.122L468.214,243.366z"
              />
            </g>
          </svg>
          {/* <span className="hintText">Click to view details</span> */}

          <div className="count">
            {selectedProducts?.length} <span>items in cart</span>
          </div>
        </div>
        {/* /ICON */}

        {/* CART MODAL */}
        <div className={"cart-modal-wrapper " + (isCartExpanded ? "show" : "")}>
          {/* overlay */}
          <div
            className="cart-overlay"
            onClick={CartUtils.hideExpandedCart}
          ></div>
          {/* /overlay */}

          <div className="cart-modal">
            {/* NO ITEM IN CART */}
            <div className="inner-content no-item-in-cart">
              <div className="modal-title">
                {/* close button */}
                <div
                  className="close-modal"
                  onClick={CartUtils.hideExpandedCart}
                >
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

              <div className="image-wrapper">
                <svg
                  width="200px"
                  height="200px"
                  viewBox="0 -12.02 94.572 94.572"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="sad" transform="translate(-205.409 -53.014)">
                    <path
                      id="Path_14"
                      data-name="Path 14"
                      d="M206.832,87.785c.283-26.649,16.426-33.362,45.857-33.353,29.458.009,45.585,6.732,45.869,33.353.293,27.433-16.715,34.458-46.565,34.333C222.506,121.992,206.548,114.549,206.832,87.785Z"
                      fill="#b9e2f8"
                      fill-rule="evenodd"
                    />
                    <path
                      id="Path_15"
                      data-name="Path 15"
                      d="M206.832,87.785c.015-1.428.078-2.8.184-4.11,1.853,22.4,17.57,28.84,44.977,28.957,27.8.116,44.46-5.971,46.38-28.97.106,1.319.17,2.69.185,4.123.293,27.433-16.714,34.458-46.565,34.333C222.506,121.992,206.548,114.55,206.832,87.785Z"
                      fill="#1a1818"
                      fill-rule="evenodd"
                      opacity="0.15"
                    />
                    <path
                      id="Path_16"
                      data-name="Path 16"
                      d="M205.413,87.774c.148-13.863,4.477-22.577,12.649-27.858,8.008-5.175,19.647-6.907,34.627-6.9s26.629,1.745,34.643,6.925c8.171,5.282,12.5,13.991,12.645,27.835.152,14.26-4.252,23.255-12.624,28.7-8.211,5.341-20.176,7.124-35.366,7.06-15.021-.064-26.638-2.02-34.54-7.422-8.051-5.5-12.181-14.431-12.034-28.34ZM219.6,62.308c-7.328,4.735-11.212,12.7-11.348,25.488-.136,12.855,3.571,21.031,10.8,25.971,7.377,5.043,18.483,6.871,32.949,6.932,14.66.062,26.125-1.606,33.808-6.6,7.52-4.893,11.474-13.128,11.334-26.3C297,75.02,293.123,67.056,285.8,62.319c-7.485-4.838-18.638-6.464-33.107-6.469C238.239,55.846,227.089,57.467,219.6,62.308Z"
                      fill="#1a1818"
                      fill-rule="evenodd"
                    />
                    <path
                      id="Path_17"
                      data-name="Path 17"
                      d="M240.627,92.208a1.419,1.419,0,0,1-2.147-1.857,17.965,17.965,0,0,1,1.869-1.873,19.154,19.154,0,0,1,24.684,0,18.133,18.133,0,0,1,1.876,1.874,1.419,1.419,0,0,1-2.146,1.857,15.317,15.317,0,0,0-1.588-1.584,16.308,16.308,0,0,0-20.969,0A15.239,15.239,0,0,0,240.627,92.208Z"
                      fill="#1a1818"
                      fill-rule="evenodd"
                    />
                    <path
                      id="Path_18"
                      data-name="Path 18"
                      d="M228.951,82.24a6.226,6.226,0,1,0-6.226-6.226A6.238,6.238,0,0,0,228.951,82.24Z"
                      fill="#1a1818"
                      fill-rule="evenodd"
                    />
                    <path
                      id="Path_19"
                      data-name="Path 19"
                      d="M228.356,75.624a2,2,0,1,0-2-2A2,2,0,0,0,228.356,75.624Z"
                      fill="#ffffff"
                      fill-rule="evenodd"
                    />
                    <path
                      id="Path_20"
                      data-name="Path 20"
                      d="M226.258,78.943a1.241,1.241,0,1,0-1.241-1.24A1.242,1.242,0,0,0,226.258,78.943Z"
                      fill="#ffffff"
                      fill-rule="evenodd"
                    />
                    <g id="Group_5" data-name="Group 5">
                      <path
                        id="Path_21"
                        data-name="Path 21"
                        d="M276.439,82.24a6.226,6.226,0,1,0-6.226-6.226A6.238,6.238,0,0,0,276.439,82.24Z"
                        fill="#1a1818"
                        fill-rule="evenodd"
                      />
                      <path
                        id="Path_22"
                        data-name="Path 22"
                        d="M275.845,75.624a2,2,0,1,0-2-2A2,2,0,0,0,275.845,75.624Z"
                        fill="#ffffff"
                        fill-rule="evenodd"
                      />
                      <path
                        id="Path_23"
                        data-name="Path 23"
                        d="M273.747,78.943a1.241,1.241,0,1,0-1.241-1.24A1.242,1.242,0,0,0,273.747,78.943Z"
                        fill="#ffffff"
                        fill-rule="evenodd"
                      />
                    </g>
                    <path
                      id="Path_24"
                      data-name="Path 24"
                      d="M231.978,88.89l-6.057,0a1.68,1.68,0,0,1-1.171-2.884,5.51,5.51,0,0,1,.471-.459,5.767,5.767,0,0,1,7.456,0,5.536,5.536,0,0,1,.568.568,1.678,1.678,0,0,1-1.267,2.773Z"
                      fill="#eb505e"
                      fill-rule="evenodd"
                    />
                    <path
                      id="Path_25"
                      data-name="Path 25"
                      d="M279.468,88.892H273.41A1.68,1.68,0,0,1,272.247,86a5.581,5.581,0,0,1,.462-.449,5.77,5.77,0,0,1,7.458,0,5.471,5.471,0,0,1,.567.56,1.68,1.68,0,0,1-1.266,2.782Z"
                      fill="#eb505e"
                      fill-rule="evenodd"
                    />
                    <path
                      id="Path_26"
                      data-name="Path 26"
                      d="M228.95,82.738c2.345,0,4.258-.717,4.258-1.6s-1.913-1.6-4.258-1.6-4.258.717-4.258,1.6S226.6,82.738,228.95,82.738Z"
                      fill="#00a1ed"
                      fill-rule="evenodd"
                    />
                    <path
                      id="Path_27"
                      data-name="Path 27"
                      d="M276.439,82.738c2.345,0,4.258-.717,4.258-1.6s-1.913-1.6-4.258-1.6-4.259.717-4.259,1.6S274.093,82.738,276.439,82.738Z"
                      fill="#00a1ed"
                      fill-rule="evenodd"
                    />
                  </g>
                </svg>
              </div>

              <div className="text">
                <div className="title">Your cart is empty.</div>
                <div className="desc">
                  Looks like you have not added anything to your cart. Go ahead
                  & explore our candy shop.
                </div>

                <div className="buttons text-center">
                  <span
                    className="button font-heading"
                    // onClick={(e) => setShowCart(false)}
                  >
                    Shop now
                  </span>
                </div>
              </div>
            </div>
            {/* /NO ITEM IN CART */}

            {_renderStep()}
          </div>
        </div>
        {/* /CART MODAL */}
      </>
    );
  } else {
    return <></>;
  }
};

export default ManageCartFloatingSection;

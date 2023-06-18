import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartUtils from "../../cart-utils";
import "./cart-final-checkout.scss";
import Swal from "sweetalert2";
// let hasShown = false;
const CartFinalCheckout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [purchaseNote, setPurchaseNote] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const { selectedProducts, isCartExpanded, currentStep, selectedPopupStore } =
    useSelector((state) => state.cart);
  const totalCost = CartUtils.calculateCartTotal({
    withDelivery: false,
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const shippingCost = await CartUtils.fetchShippingCost();
      if (shippingCost > -1) {
        setShippingCost(shippingCost);
        setIsLoading(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Cannot ship to the address",
          text: "Please provide a different zip code. Current one is outside of our network",
        });
        CartUtils.showCartAddressForm();
      }
    })();
  }, []);
  return (
    <>
      <div className={"inner-content payment-details step3 show"}>
        {isLoading ? (
          <div className="loaderWrapper">
            <div className="loader"></div>
          </div>
        ) : (
          <></>
        )}
        <div className="modal-title">
          <span class="title">Make payment</span>
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

        <div className="total-things">
          <div className="item">
            <span className="label">Total cart amount: </span>
            <span className="value">
              <span>$ {totalCost}</span>
            </span>
          </div>
          <div className="item">
            <span className="label">Shipping charges: </span>
            <span className="value">
              <span>$ {shippingCost}</span>
            </span>
          </div>

          <div className="item total">
            <span className="label">Total payable amount: </span>
            <span className="value">
              <span>$ {totalCost + shippingCost}</span>
            </span>
          </div>
          {selectedPopupStore?.PremiumEvent === 0 && (
            <div className="purchaseNoteInputWrapper">
              <p>Purchase note</p>
              <textarea
                rows="5"
                value={purchaseNote}
                onChange={(e) => setPurchaseNote(e.target.value)}
              ></textarea>
            </div>
          )}

          <div className="bigActionButton">
            <span
              className="button proceed"
              onClick={(e) =>
                CartUtils.submitPaymentOrder({ shippingCost, purchaseNote })
              }
            >
              Proceed to payment
            </span>
            <span
              className="button cancel"
              onClick={CartUtils.showCartProductsView}
            >
              Cancel payment
            </span>
          </div>
        </div>

        <div className="modal-buttons text-right">
          <span className="button prev" onClick={CartUtils.showCartAddressForm}>
            Previous
          </span>
        </div>
      </div>
    </>
  );
};

export default CartFinalCheckout;

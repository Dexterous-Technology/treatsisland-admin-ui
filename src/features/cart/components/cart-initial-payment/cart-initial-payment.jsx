import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ApiCalls from "../../../../api";
import CartFinalPayment from "../../components/cart-final-payment/cart-final-payment";

const CartInitialPayment = () => {
  const [stripePromise, setStripePromise] = useState(null);
  // const [clientSecret, setClientSecret] = useState("");
  const { stripeKey } = useSelector((state) => state.cart);

  const _loadStripeKey = async () => {
    try {
      const response = await ApiCalls.payment.public.getStripeKey();
      if (response?.data?.data?.stripeKey) {
        setStripePromise(loadStripe(response?.data?.data?.stripeKey));
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  // const _loadClientSecret = async () => {
  //   try {
  //     const shippingCost = await CartUtils.fetchShippingCost();
  //     const totalCost = CartUtils.calculateCartTotal({
  //       withDelivery: false,
  //     });

  //     const response = await ApiCalls.payment.public.createPaymentIntent(totalCost+shippingCost);
  //     if (response?.data?.data?.clientSecret) {
  //       setClientSecret((response?.data?.data?.clientSecret));
  //     }

  //   } catch (error) {
  //     console.log("error :>> ", error);
  //   }
  // };

  useEffect(() => {
    _loadStripeKey();
  }, []);
  return (
    <>
      <h1>Payment</h1>

      {stripeKey && stripePromise ? (
        <Elements stripe={stripePromise} options={{ clientSecret: stripeKey }}>
          <CartFinalPayment />
        </Elements>
      ) : (
        <>
          <div className="loaderWrapper">
            <div className="loader"></div>
          </div>
        </>
      )}
    </>
  );
};

export default CartInitialPayment;

import Swal from "sweetalert2";
import ApiCalls from "../../api";
import OrderApi from "../../api/order-api";
import { store } from "../../store";
import {
  clearCart,
  setCartCurrentStep,
  setCartExpandedState,
  setSelectedPopupStore,
  setStripeKey,
  setUserDetails,
  updateProducts,
} from "../../store/cart-store";

const CartUtils = {
  addProduct: ({ product, popupStore }) => {
    const { cart } = store.getState();
    const selectedProducts = Object.assign([], cart?.selectedProducts);
    if (cart?.selectedPopupStore?.EventPopupID !== popupStore?.EventPopupID) {
      store.dispatch(setSelectedPopupStore(popupStore));
    }
    let productIndex = -1;
    if (selectedProducts?.length) {
      productIndex = selectedProducts.findIndex(
        (prod) => prod.ProductID === product.ProductID
      );
    }
    if (productIndex > -1) {
      selectedProducts[productIndex] = {
        ...selectedProducts[productIndex],
        quantity: selectedProducts[productIndex].quantity + 1,
      };
    } else {
      const cartProduct = {
        ...product,
        quantity: 1,
      };
      selectedProducts.push(cartProduct);
    }
    store.dispatch(updateProducts(selectedProducts));
  },
  setPopupStore: (popupStore) => {
    store.dispatch(setSelectedPopupStore(popupStore));
  },
  showExpandedCart: () => {
    store.dispatch(setCartExpandedState(true));
    CartUtils.showCartProductsView();
  },
  hideExpandedCart: () => {
    store.dispatch(setCartExpandedState(false));
  },
  showCartProductsView: () => {
    store.dispatch(setCartCurrentStep("product-review"));
  },
  showCartAddressForm: () => {
    store.dispatch(setCartCurrentStep("address-form"));
  },
  showCartCheckoutStep: () => {
    store.dispatch(setCartCurrentStep("final-checkout"));
  },
  updateProductQuantity: ({ productId, quantity }) => {
    const { cart } = store.getState();
    let productIndex = -1;
    const selectedProducts = Object.assign([], cart?.selectedProducts);
    if (selectedProducts?.length) {
      productIndex = selectedProducts.findIndex(
        (prod) => prod.ProductID === productId
      );
    }
    if (productIndex > -1) {
      selectedProducts[productIndex] = {
        ...selectedProducts[productIndex],
        quantity: quantity,
      };
      if (quantity === 0) {
        CartUtils.removeProduct({
          productId,
        });
      } else {
        store.dispatch(updateProducts(selectedProducts));
      }
    }
  },
  removeProduct: ({ productId }) => {
    const { cart } = store.getState();
    const selectedProducts = Object.assign([], cart?.selectedProducts);

    let productIndex = -1;
    if (selectedProducts?.length) {
      productIndex = selectedProducts.findIndex(
        (prod) => prod.ProductID === productId
      );
    }
    if (productIndex > -1) {
      selectedProducts.splice(productIndex, 1);
      if (!selectedProducts?.length) {
        CartUtils.hideExpandedCart();
      }
      store.dispatch(updateProducts(selectedProducts));
    }
  },
  removeAllProducts: () => {
    CartUtils.hideExpandedCart();
    store.dispatch(updateProducts([]));
  },
  updateUserDetails: (userDetails) => {
    store.dispatch(setUserDetails(userDetails));
  },
  clearCart: () => {
    store.dispatch(updateProducts([]));
    store.dispatch(
      setUserDetails({
        name: "",
        email: "",
        address: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        deliveryCost: "",
      })
    );
    CartUtils.removeAllProducts();
  },
  calculateCartTotal: ({ withDelivery = false }) => {
    let total = 0;
    const { cart } = store.getState();
    if (cart?.selectedProducts?.length) {
      cart?.selectedProducts.forEach((product) => {
        total += (product.ShippingCost + product.Price) * product.quantity;
      });
    }
    if (withDelivery) {
    }
    return total;
  },
  submitPaymentOrder: async ({ shippingCost, purchaseNote }) => {
    Swal.fire({
      title: "Processing order",
      html: "Please wait...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const stripeKey = await CartUtils._fetchAndStripeKey();
    store.dispatch(setStripeKey(stripeKey));
    await CartUtils.submitOrder({ shippingCost, purchaseNote, stripeKey });
    store.dispatch(setCartCurrentStep("payment-initial"));
  },
  submitOrder: async ({ shippingCost, purchaseNote, stripeKey }) => {
    try {
      const orderPayload = CartUtils._prepareOrderPayload({
        shippingCost,
        purchaseNote,
        stripeKey,
      });
      await ApiCalls.order.public.createOrder(orderPayload);
      Swal.close();
      // Swal.fire({
      //   icon: "success",
      //   title: "",
      //   text: "Order placed successfully!",
      //   // footer: '<a href="">Why do I have this issue?</a>'
      // });
      // CartUtils.clearCart();
    } catch (error) {
      console.log("error", error);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "",
        text: "Unable to process order, please try again",
        // footer: '<a href="">Why do I have this issue?</a>'
      });
    }
  },
  fetchShippingCost: async () => {
    const { cart } = store.getState();
    let shippingCost = 0;
    try {
      let itemCount = 0;
      cart.selectedProducts.forEach((product) => {
        if (product.ProductTypeID !== 2) {
          itemCount += product.quantity;
        }
      });

      if (cart.selectedProducts.length > 0) {
        if (itemCount > 0) {
          const payloadToEstimateShippingCost = {
            zip: cart?.userDetails?.zip,
            itemCount,
            state: cart?.userDetails?.state,
            country: "US",
            city: cart?.userDetails?.city,
          };
          const { data } = await OrderApi.public.estimateShippingCost(
            payloadToEstimateShippingCost
          );
          if (data?.data?.cost) {
            shippingCost = data?.data?.cost;
          }
        }
      } else {
        // No product
      }
    } catch (error) {
      console.log("error", error);
    }
    return shippingCost;
  },
  _prepareOrderPayload: ({ shippingCost, purchaseNote, stripeKey }) => {
    const { cart } = store.getState();
    return {
      ...cart.userDetails,
      purchaseNote,
      products: cart.selectedProducts.map((product) => ({
        productId: product.ProductID,
        quantity: product.quantity,
      })),
      deliveryCost: shippingCost,
      stripeKey,
      address: cart.userDetails.street,
      eventId: cart.selectedPopupStore.EventID,
      popupStoreId: cart.selectedPopupStore.EventPopupID,
    };
  },
  _fetchAndStripeKey: async () => {
    try {
      const shippingCost = await CartUtils.fetchShippingCost();
      const totalCost = CartUtils.calculateCartTotal({
        withDelivery: false,
      });
      const response = await ApiCalls.payment.public.createPaymentIntent(
        totalCost + shippingCost
      );
      if (response?.data?.data?.clientSecret) {
        return response?.data?.data?.clientSecret;
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  },
};

export default CartUtils;

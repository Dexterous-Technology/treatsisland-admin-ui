import { HttpClient } from "../clients/http-client";

const { ProtectedHttpClient, PublicHttpClient } = HttpClient;

const OrderApi = {
  public: {
    createOrder: (payload) => PublicHttpClient.post(`/order`, payload),
    getOrder: (orderId) => PublicHttpClient.get(`/order?orderId=${orderId}`),
    getShippingCost: ({ zip, itemCount }) =>
      PublicHttpClient.get(
        `/estimate-shipping?zip=${zip}&itemCount=${itemCount}`
      ),
    // Payload should have: { zip, itemCount, state, country, city }
    estimateShippingCost: (payload) =>
      PublicHttpClient.post(`/estimate-shipping`, payload),
  },
  private: {},
};
export default OrderApi;

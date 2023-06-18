import { HttpClient } from "../clients/http-client";

const { ProtectedHttpClient, PublicHttpClient } = HttpClient;

const UserApi = {
  public: {
    getStripeKey: () =>PublicHttpClient.get(`/get-stripe-config`),
    createPaymentIntent: (cost) =>PublicHttpClient.post(`/create-payment-intent`, {cost}),
  },
  private: { },
};
export default UserApi;

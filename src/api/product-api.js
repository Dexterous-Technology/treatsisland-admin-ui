import { HttpClient } from "../clients/http-client";

const { ProtectedHttpClient, PublicHttpClient } = HttpClient;

const ProductApi = {
  public: {
    getAllProducts: () => PublicHttpClient.get(`/get-all-products`),
  },
  private: {
    getAllProducts: () => ProtectedHttpClient.get(`/get-all-products`),
  },
};
export default ProductApi;

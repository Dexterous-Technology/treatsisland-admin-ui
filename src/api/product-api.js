import { HttpClient } from "../clients/http-client";

const { ProtectedHttpClient, PublicHttpClient } = HttpClient;

const ProductApi = {
  public: {
    getAllProducts: () => PublicHttpClient.get(`/get-all-products`),
    updateProduct: (data) =>
      PublicHttpClient.put(`/update-product`, data),
    addProduct: (data) =>
      PublicHttpClient.post(`/add-product`, {
        product: data,
      }),
  },
  private: {
    getAllProducts: () => ProtectedHttpClient.get(`/get-all-products`),
  },
};
export default ProductApi;

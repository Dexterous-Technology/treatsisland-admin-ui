import { HttpClient } from "../clients/http-client";

const { ProtectedHttpClient, PublicHttpClient } = HttpClient;

const UserApi = {
  public: {
    createUser: (user) => PublicHttpClient.post(`/create-user/`, user),
    createUserByPhone: (payload) =>
      PublicHttpClient.post(`/create-user-by-phone/`, payload),
    exchangeToken: (payload) =>
      PublicHttpClient.post(`/exchange-token/`, payload),
  },
  private: {
    updateUser: (payload) => ProtectedHttpClient.put(`/update-user/`, payload),
  },
};
export default UserApi;

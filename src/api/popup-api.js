import { HttpClient } from "../clients/http-client";

const { ProtectedHttpClient, PublicHttpClient } = HttpClient;

const PopupApi = {
  public: {
    getPopupStoreByCode: (popupStoreCode) =>
      PublicHttpClient.get(
        `/get-popupstore-by-code?popupStoreCode=${popupStoreCode}`
      ),
    getPopupStoreStats: (popupStoreCode) =>
      PublicHttpClient.get(
        `/get-popupstore-stats?popupStoreCode=${popupStoreCode}`
      ),
  },
  private: {
    createPopup: (payload) =>
      ProtectedHttpClient.post(`/create-popupstore`, payload),
    editPopup: (payload) =>
      ProtectedHttpClient.put(`/edit-popupstore`, payload),
    getPopupStoreById: (popupStoreId) =>
      ProtectedHttpClient.get(
        `/get-popupstore-by-id?popupStoreId=${popupStoreId}`
      ),
  },
};
export default PopupApi;

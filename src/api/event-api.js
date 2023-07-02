import { HttpClient } from "../clients/http-client";

const { ProtectedHttpClient, PublicHttpClient, UrlHttpClient } = HttpClient;

const EventApi = {
  public: {
    getEventByCode: (code) =>
      PublicHttpClient.get(`/get-event-by-code?eventCode=${code}`),
  },
  private: {
    createEvent: (event) => ProtectedHttpClient.post(`/create-event`, event),
    getEventById: (id) => ProtectedHttpClient.get(`/event?eventId=${id}`),
    loadEventsByOrg: (orgId) =>
      ProtectedHttpClient.get(`/get-all-events?orgId=${orgId}`),
    loadAllEvents: () => ProtectedHttpClient.get(`/get-all-events`),
    editEvent: (event) => ProtectedHttpClient.post(`/edit-event`, event),
    updateBankDetails: (payload) =>
      ProtectedHttpClient.put(`/set-bank`, payload),
    joinEvent: (eventCode) =>
      ProtectedHttpClient.post(`/join-event`, { eventCode }),
    deleteEvent: (eventId) =>
      ProtectedHttpClient.post(`/delete-event`, { eventId }),
    getEventPayoutDetails: (eventId) =>
      ProtectedHttpClient.get(`/get-payout?eventId=${eventId}`),
    setEventPayoutDetails: (payload) =>
      ProtectedHttpClient.post(`/set-payout`, payload),
  },

  //super admin all events
  loadAllAdminEvents: () => UrlHttpClient.get(`/admin/get-all-events`),
};
export default EventApi;

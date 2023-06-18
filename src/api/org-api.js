import { HttpClient } from "../clients/http-client";

const { ProtectedHttpClient, PublicHttpClient } = HttpClient;

const OrgApi = {
  public: {
    loadOrgTypes: () => PublicHttpClient.get(`/get-all-org-types/`),
  },
  private: {
    createOrg: (org) => ProtectedHttpClient.post(`/create-org/`, org),
    loadOrgs: () => ProtectedHttpClient.get(`/get-all-orgs/`),
  },
};
export default OrgApi;

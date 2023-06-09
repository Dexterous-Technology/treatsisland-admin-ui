import axios from "axios";
import AuthHelper from "../utils/auth-helper";

const publicAxiosConfig = {
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/public`,
};

const privateAxiosConfig = {
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/private`,
};

const adminAxiosConfig = {
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/admin`,
};
const baseUrlAxiosConfig = {
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/`,
};

let PublicHttpClient = axios.create(publicAxiosConfig);

let ProtectedHttpClient = axios.create(privateAxiosConfig);

let AdminHttpClient = axios.create(adminAxiosConfig);
let UrlHttpClient = axios.create(baseUrlAxiosConfig);

// Set the AUTH token for any request
ProtectedHttpClient.interceptors.request.use(function (config) {
  const token = AuthHelper.getToken();
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export const HttpClient = {
  ProtectedHttpClient,
  PublicHttpClient,
  AdminHttpClient,
  UrlHttpClient,
};

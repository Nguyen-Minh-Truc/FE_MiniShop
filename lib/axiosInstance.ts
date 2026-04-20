// lib/axiosInstance.ts
import axios, { AxiosHeaders } from "axios";
import { clearAccessToken, getAccessToken } from "@/lib/authToken";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (!token) {
    return config;
  }

  if (config.headers && typeof config.headers.set === "function") {
    config.headers.set("Authorization", `Bearer ${token}`);
  } else {
    const headers = AxiosHeaders.from(config.headers ?? {});
    headers.set("Authorization", `Bearer ${token}`);
    config.headers = headers;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAccessToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;

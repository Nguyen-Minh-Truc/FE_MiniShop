// lib/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // VD: https://your-backend.com
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Tự động đính kèm token vào mỗi request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Xử lý lỗi tập trung
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn → redirect về login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
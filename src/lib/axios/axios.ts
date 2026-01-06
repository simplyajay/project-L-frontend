import { getToken } from "@/lib/utils/token";
import axios, { AxiosError, AxiosInstance } from "axios";

const axiosAPI: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

axiosAPI.interceptors.request.use(async (config) => {
  // Only attach token if config has `requiresAuth: true`

  if ((config as any).requiresAuth) {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

axiosAPI.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const data = error.response?.data;

    if (data) {
      const { message, code, keyValue } = data as {
        message: string;
        code: string;
        keyValue: Record<any, string>;
      };

      return Promise.reject({ message, code, keyValue, status: error.response?.status });
    }

    return Promise.reject({
      message: error.message || "Axios: Network Error",
      code: "NETWORK_ERROR",
      status: error.response?.status || 500,
    });
  }
);

export default axiosAPI;

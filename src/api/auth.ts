import axiosAPI from "@/lib/axios/axios";
import { APIResponse, handleAPIRequest } from "@/lib/services/api.service";
import { AxiosRequestConfig } from "axios";

interface ILogionOptions {
  payload: { identifier: string; loginPassword: string };
  config?: AxiosRequestConfig;
}

export const authenticateLogin = async <T = { accessToken: string }>({
  payload,
  config = {},
}: ILogionOptions): Promise<APIResponse<T>> => {
  return await handleAPIRequest<T>(axiosAPI.post<T>("api/auth/login", payload, config));
};

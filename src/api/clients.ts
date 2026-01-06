import axiosAPI from "@/lib/axios/axios";
import { APIResponse, handleAPIRequest } from "@/lib/services/api.service";
import { IClient, IClientSummary } from "@/lib/types/client";
import { AxiosRequestConfig } from "axios";
import { ClientFormData } from "@/lib/schema/client";
import { ICredit } from "@/lib/types/credit";

export type GetSummarizedClients = {
  summarizedClients: IClientSummary[];
  totalOverdueAll: number;
  totalBalanceAll: number;
};

interface GetClientProps {
  id: string;
  config?: AxiosRequestConfig;
}

interface ClientFormProps {
  data: ClientFormData;
  config?: AxiosRequestConfig;
}

export const getSummarizedClients = async <T = GetSummarizedClients>(
  config: AxiosRequestConfig = {}
): Promise<APIResponse<T>> => {
  return await handleAPIRequest<T>(
    axiosAPI.get<T>("api/users/me/clients", { requiresAuth: true, ...config })
  );
};

export const getClient = async <T = IClient>({
  id,
  config = {},
}: GetClientProps): Promise<APIResponse<T>> => {
  return await handleAPIRequest<T>(
    axiosAPI.get<T>(`api/clients/${id}`, { requiresAuth: true, ...config })
  );
};

export const getClientCredits = async <T = ICredit[]>({
  id,
  config,
}: GetClientProps): Promise<APIResponse<T>> => {
  return await handleAPIRequest<T>(
    axiosAPI.get<T>(`api/clients/${id}/credits`, { requiresAuth: true, ...config })
  );
};

export const registerClient = async <T = ClientFormData>({
  data,
  config = {},
}: ClientFormProps): Promise<APIResponse<T>> => {
  return await handleAPIRequest<T>(
    axiosAPI.post<T>("api/clients/register", data, { requiresAuth: true, ...config })
  );
};

export const updateClient = async <T = ClientFormData>({
  id,
  data,
  config = {},
}: ClientFormProps & { id: string }) => {
  return await handleAPIRequest<T>(
    axiosAPI.patch<T>(`api/clients/${id}`, data, { requiresAuth: true, ...config })
  );
};

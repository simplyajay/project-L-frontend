import axiosAPI from "@/lib/axios/axios";
import { APIResponse, handleAPIRequest } from "@/lib/services/api.service";
import { ClientType, ClientSummaryType } from "@/lib/types/client";
import axios, { AxiosRequestConfig } from "axios";
import { CreditType } from "@/lib/types/credit";
import { ClientFormType, DeleteClientFormType } from "@/lib/schema/client";

export type GetSummarizedClients = {
  clients: ClientSummaryType[];
  totalOverdueAll: number;
  totalBalanceAll: number;
};

type GetClientProps = {
  id: string;
  config?: AxiosRequestConfig;
};

type ClientFormProps = {
  data: ClientFormType;
  config?: AxiosRequestConfig;
};

type DeleteClientProps = {
  id: string;
  data: DeleteClientFormType;
  config?: AxiosRequestConfig;
};

export const getSummarizedClients = async <T = GetSummarizedClients>(
  config: AxiosRequestConfig = {},
): Promise<APIResponse<T>> => {
  return await handleAPIRequest<T>(axiosAPI.get<T>("api/me/clients", { requiresAuth: true, ...config }));
};

export const getClient = async <T = ClientType>({ id, config = {} }: GetClientProps): Promise<APIResponse<T>> => {
  return await handleAPIRequest<T>(axiosAPI.get<T>(`api/me/clients/${id}`, { requiresAuth: true, ...config }));
};

export const getClientCredits = async <T = CreditType[]>({ id, config }: GetClientProps): Promise<APIResponse<T>> => {
  return await handleAPIRequest<T>(axiosAPI.get<T>(`api/me/clients/${id}/credits`, { requiresAuth: true, ...config }));
};

export const registerClient = async <T = ClientFormType>({
  data,
  config = {},
}: ClientFormProps): Promise<APIResponse<T>> => {
  return await handleAPIRequest<T>(axiosAPI.post<T>("api/me/clients/", data, { requiresAuth: true, ...config }));
};

export const updateClient = async <T = ClientFormType>({ id, data, config = {} }: ClientFormProps & { id: string }) => {
  return await handleAPIRequest<T>(axiosAPI.patch<T>(`api/me/clients/${id}`, data, { requiresAuth: true, ...config }));
};

export const deleteClient = async <T = DeleteClientFormType>({ id, data, config }: DeleteClientProps) => {
  return await handleAPIRequest<T>(
    axiosAPI.post<T>(`api/me/clients/${id}/delete`, data, { requiresAuth: true, ...config }),
  );
};

import axiosAPI from "@/lib/axios/axios";
import { APIResponse, handleAPIRequest } from "@/lib/services/api.service";
import { ICredit, ISettlement } from "@/lib/types/credit";
import { AxiosRequestConfig } from "axios";

interface GetCreditProps {
  id: string;
  config?: AxiosRequestConfig;
}

interface AddSettlementProps {
  id: string;
  data: ISettlement;
  config?: AxiosRequestConfig;
}

interface UpdateCreditInformationProps {
  id: string;
  data: ICredit;
  config?: AxiosRequestConfig;
}

export const getCredit = async <T extends ICredit>({ id, config = {} }: GetCreditProps) => {
  return await handleAPIRequest<T>(
    axiosAPI.get<T>(`api/credits/${id}`, { requiresAuth: true, ...config })
  );
};

export const addSettlement = async <T extends ISettlement>({
  id,
  data,
  config,
}: AddSettlementProps): Promise<APIResponse<T>> => {
  return await handleAPIRequest<T>(
    axiosAPI.patch<T>(`api/credits/${id}/new-settlement`, data, { requiresAuth: true, ...config })
  );
};

export const updateCreditInformation = async <T extends ICredit>({
  id,
  data,
  config,
}: UpdateCreditInformationProps): Promise<APIResponse<T>> => {
  return await handleAPIRequest<T>(
    axiosAPI.patch<T>(`api/credits/'${id}'`, data, { requiresAuth: true, ...config })
  );
};

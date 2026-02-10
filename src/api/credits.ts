import axiosAPI from "@/lib/axios/axios";
import { APIResponse, handleAPIRequest } from "@/lib/services/api.service";
import { CreditType, SettlementType } from "@/lib/types/credit";
import { AxiosRequestConfig } from "axios";

type CreateCreditDTO = Pick<CreditType, "principalAmount" | "creditDate" | "interestRate">;

type UpdateCreditDTO = Pick<CreditType, "principalAmount" | "creditDate" | "interestRate" | "balance"> & {
  updateDate: Date;
};

type AddSettlementDTO = Pick<SettlementType, "settlementAmount" | "interestAmount" | "settlementDate">;

type AddCreditProps = {
  clientId: string;
  data: CreateCreditDTO;
  config?: AxiosRequestConfig;
};

type GetCreditProps = {
  clientId: string;
  creditId: string;
  config?: AxiosRequestConfig;
};

type AddSettlementProps = {
  clientId: string;
  creditId: string;
  data: AddSettlementDTO;
  config?: AxiosRequestConfig;
};

type UpdateCreditInformationProps = {
  clientId: string;
  creditId: string;
  data: UpdateCreditDTO;
  config?: AxiosRequestConfig;
};

export const addCredit = async <T extends CreateCreditDTO>({ clientId, data, config }: AddCreditProps) => {
  return await handleAPIRequest<T>(
    axiosAPI.post<T>(`api/me/clients/${clientId}/credits`, data, { requiresAuth: true, ...config }),
  );
};

export const getCredit = async <T extends CreditType>({ clientId, creditId, config = {} }: GetCreditProps) => {
  return await handleAPIRequest<T>(
    axiosAPI.get<T>(`api/me/clients/${clientId}/credits/${creditId}`, { requiresAuth: true, ...config }),
  );
};

export const updateCredit = async <T extends UpdateCreditDTO>({
  clientId,
  creditId,
  data,
  config,
}: UpdateCreditInformationProps): Promise<APIResponse<T>> => {
  return await handleAPIRequest<T>(
    axiosAPI.patch<T>(`api/me/clients/${clientId}/credits/${creditId}`, data, { requiresAuth: true, ...config }),
  );
};

export const addSettlement = async <T extends Omit<SettlementType, "_id">>({
  clientId,
  creditId,
  data,
  config,
}: AddSettlementProps): Promise<APIResponse<T>> => {
  return await handleAPIRequest<T>(
    axiosAPI.patch<T>(`api/me/clients/${clientId}/credits/${creditId}/settlements`, data, {
      requiresAuth: true,
      ...config,
    }),
  );
};

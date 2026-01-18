import axiosAPI from "@/lib/axios/axios";
import { APIResponse, handleAPIRequest } from "@/lib/services/api.service";
import { CreditType, SettlementType } from "@/lib/types/credit";
import { AxiosRequestConfig } from "axios";

type CreateCreditDTO = Pick<CreditType, "principalAmount" | "creditDate" | "interestRate">;

type AddSettlementDTO = Pick<
  SettlementType,
  "settlementAmount" | "interestAmount" | "settlementDate"
>;

type AddCreditProps = {
  data: CreateCreditDTO & { clientId: string };
  config?: AxiosRequestConfig;
};

type GetCreditProps = {
  id: string;
  config?: AxiosRequestConfig;
};

type AddSettlementProps = {
  id: string;
  data: AddSettlementDTO;
  config?: AxiosRequestConfig;
};

type UpdateCreditInformationProps = {
  id: string;
  data: CreditType;
  config?: AxiosRequestConfig;
};

export const addCredit = async <T extends CreditType>({ data, config }: AddCreditProps) => {
  return await handleAPIRequest<T>(
    axiosAPI.post<T>(`api/credits/register`, data, { requiresAuth: true, ...config }),
  );
};

export const getCredit = async <T extends CreditType>({ id, config = {} }: GetCreditProps) => {
  return await handleAPIRequest<T>(
    axiosAPI.get<T>(`api/credits/${id}`, { requiresAuth: true, ...config }),
  );
};

export const addSettlement = async <T extends Omit<SettlementType, "_id">>({
  id,
  data,
  config,
}: AddSettlementProps): Promise<APIResponse<T>> => {
  return await handleAPIRequest<T>(
    axiosAPI.patch<T>(`api/credits/${id}/new-settlement`, data, { requiresAuth: true, ...config }),
  );
};

export const updateCreditInformation = async <T extends CreditType>({
  id,
  data,
  config,
}: UpdateCreditInformationProps): Promise<APIResponse<T>> => {
  return await handleAPIRequest<T>(
    axiosAPI.patch<T>(`api/credits/'${id}'`, data, { requiresAuth: true, ...config }),
  );
};

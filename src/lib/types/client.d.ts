import { ICreditSummary } from "./credit";
import { CountryCallingCode, CountryCode, E164Number } from "libphonenumber-js";

export type IClient = {
  _id: string;
  firstname: string;
  middlename?: string;
  nickname?: string;
  lastname: string;
  email?: string;
  facebook?: string;
  phone: IPhone;
  otherPhones: IPhone[];
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type IPhone = {
  country_code: CountryCode;
  dial_code: CountryCallingCode;
  value: string;
  e164: E164Number;
};

export type IClientSummary = {
  _id: string;
  createdAt: Date;
  firstname: string;
  middlename?: string;
  lastname: string;
  totalBalance: number;
  totalBalanceOverdue: number;
  unsettledCredit?: ICreditSummary;
};

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IClient } from "./client";
import { ICredit } from "./credit";

export type RootStackParams = {
  Login: undefined;
  MainTabs: undefined;
  Account: undefined;
  ClientInformation: { clientId: string };
  ClientForm?: { client?: IClient };
  CreditInformation: { client: IClient; creditId: string };
  CreditForm?: { client?: IClient; credit: ICredit };
};

export type ClientInformationRouteProp = RouteProp<RootStackParams, "ClientInformation">;

export type ClientFormRouteProp = RouteProp<RootStackParams, "ClientForm">;

export type CreditInformationRouteProp = RouteProp<RootStackParams, "CreditInformation">;

export type CreditFormRouteProp = RouteProp<RootStackParams, "CreditForm">;

export type RootNavigationProp = NativeStackNavigationProp<RootStackParams>;

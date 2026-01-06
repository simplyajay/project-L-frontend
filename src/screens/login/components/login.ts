import { Control, FormState } from "react-hook-form";
import { LoginForm } from "@/lib/schema/login";
export interface ILoginError {
  status: number;
  code: string;
  message: string;
  keyValue?: Record<string, any>;
}

export interface ILoginField {
  control: Control<LoginForm>;
  formState: FormState<LoginForm>;
  clearErrors: (target?: "identifier" | "loginPassword") => void;
  loginError?: ILoginError;
  loading: boolean;
}

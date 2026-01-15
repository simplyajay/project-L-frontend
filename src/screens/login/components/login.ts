import { Control, FormState } from "react-hook-form";
import { LoginForm } from "@/lib/schema/login";
export type LoginError = {
  status: number;
  code: string;
  message: string;
  keyValue?: Record<string, any>;
};

export type LoginField = {
  control: Control<LoginForm>;
  formState: FormState<LoginForm>;
  clearErrors: (target?: "identifier" | "loginPassword") => void;
  loginError?: LoginError;
  loading: boolean;
};

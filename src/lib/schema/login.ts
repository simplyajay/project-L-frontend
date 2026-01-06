import { z } from "zod";

export const LoginSchema = z.object({
  identifier: z
    .string()
    .nonempty("Email or username is required.")
    .min(4, "Username or email must be atleast 4 characters.")
    .refine(
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;

        return emailRegex.test(value) || usernameRegex.test(value);
      },
      {
        message: "Enter a valid email or username",
      }
    ),
  loginPassword: z
    .string()
    .nonempty("Password is required.")
    .min(8, "Passwordm ust be atleast 8 characters"),
});

export type LoginForm = z.infer<typeof LoginSchema>;

import { z } from "zod";

export const AddCreditSchema = z.object({
  principalAmount: z
    .number("Please enter a valid number.")
    .positive("Amount must be greater than 0."),
  interestRate: z
    .number("Please enter a valid number.")
    .nonnegative("Number must be greater or equal to 0."),
  creditDate: z.date(),
});

export const UpdateCreditSchema = z.object({
  ...AddCreditSchema.shape,
  balance: z
    .number("Amount must be a valid number.")
    .nonnegative("Amount must be greater or equal to 0."),
});

export type AddCreditSchemaType = z.infer<typeof AddCreditSchema>;

export type UpdateCreditSchemaType = z.infer<typeof UpdateCreditSchema>;

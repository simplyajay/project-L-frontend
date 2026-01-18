import { z } from "zod";

export const SettlementSchema = z.object({
  settlementDate: z.date(),
  settlementAmount: z.number("Amount must be a number.").positive("Amount must be greater than 0."),
  interestAmount: z.number("Amount must be a number."),
});

export type SettlementFormType = z.infer<typeof SettlementSchema>;

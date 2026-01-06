import { z } from "zod";
import { Path } from "react-hook-form";

export const SettlementSchema = z.object({
  settlementDate: z.string("Invalid Input").nonempty("Settlement Date is required."),
  settlementAmount: z.string("Invalid Input").nonempty("Settlement Amount is required."),
  interestAmount: z.string("Invalid Input").nonempty("Interest Amount is required."),
});

export type SettlementFormType = z.infer<typeof SettlementSchema>;

export interface SettlementFormData extends SettlementFormType {}

interface SettlementField {
  name: Path<SettlementFormType>;
  label: string;
  placeholder?: string;
  keyboardType?: "numeric" | "default";
  isEditable?: boolean;
}

export const settlementFormFields: SettlementField[] = [
  { name: "interestAmount", label: "Interest", keyboardType: "numeric" }, // has default value
  { name: "settlementAmount", label: "Settlement Amount", keyboardType: "numeric" },
  { name: "settlementDate", label: "Settlement Amount", isEditable: false },
];

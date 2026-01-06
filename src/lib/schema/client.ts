import { z } from "zod";
import { Path } from "react-hook-form";
import { IPhone } from "../types/client";

const PhoneSchema = z.object({
  countryCode: z.string().nonempty("Enter dial code"),
  value: z
    .string()
    .nonempty("Phone number is required.")
    .regex(/^\+?\d{5,15}$/, "Invalid phone number"),
});

export const ClientSchema = z.object({
  firstname: z.string().nonempty("First name is required."),
  middlename: z.string().optional(),
  lastname: z.string().nonempty("Last name is required."),
  nickname: z.string().optional(),
  email: z.string().optional(),
  facebook: z.string().optional(),
  phone: PhoneSchema,
  otherPhones: z.array(PhoneSchema),
  address: z.string().optional(),
});

export type ClientFormType = z.infer<typeof ClientSchema>;

export type PhoneSchemaType = z.infer<typeof PhoneSchema>;

export interface ClientFormData {
  userId: string;
  firstname: string;
  middlename?: string;
  nickname?: string;
  lastname: string;
  email?: string;
  facebook?: string;
  phone: IPhone;
  otherPhones: IPhone[];
  address?: string;
}

interface ClientFields {
  name: Path<ClientFormType>;
  label: string;
  placeholder?: string;
  isPhone?: boolean;
  optional?: boolean;
}

export const personalInfoFields: ClientFields[] = [
  { name: "firstname", label: "First Name", placeholder: "John" },
  { name: "middlename", label: "Middle Name", placeholder: "Dee", optional: true },
  { name: "nickname", label: "Nickname", placeholder: "Johnny", optional: true },
  { name: "lastname", label: "Last Name", placeholder: "Doe" },
];

export const contactInfoFields: ClientFields[] = [
  { name: "email", label: "Email", placeholder: "johndoe@example.com", optional: true },
  { name: "facebook", label: "Facebook Account", placeholder: "John Doe", optional: true },
  { name: "address", label: "Address", placeholder: "221B Baker St, London, UK", optional: true },
  { name: "phone", label: "Primary Mobile Number", isPhone: true },
];

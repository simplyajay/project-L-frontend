import { parsePhoneNumberFromString } from "libphonenumber-js";
import { CountryCode } from "libphonenumber-js";

export const toE164 = (code: CountryCode, value: string) => {
  const phoneNumber = parsePhoneNumberFromString(value, code);

  return phoneNumber ? phoneNumber.format("E.164") : null;
};

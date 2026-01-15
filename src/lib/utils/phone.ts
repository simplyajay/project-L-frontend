import {
  parsePhoneNumberFromString,
  getExampleNumber as getSample,
  getCountryCallingCode,
  AsYouType,
} from "libphonenumber-js";
import { CountryCode } from "libphonenumber-js";
import { countries } from "./countries";
import examples from "libphonenumber-js/mobile/examples";

export const toE164 = (code: CountryCode, value: string) => {
  const phoneNumber = parsePhoneNumberFromString(value, code);

  return phoneNumber ? phoneNumber.format("E.164") : null;
};

export const getExampleNumber = (countryCode: CountryCode): string | undefined => {
  const exampleNumber = getSample(countryCode, examples);
  const internationalFormat = exampleNumber?.formatInternational();

  return internationalFormat?.replace(`+${getCountryCallingCode(countryCode)}`, "").trim();
};

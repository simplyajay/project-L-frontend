import { DateTime } from "luxon";

type Key = "dmy" | "mdy" | "ymd";
type Locale = "en-US" | "en-GB" | "en-AE";
type Format = "d MMM yyyy" | "MMM d, yyyy" | "yyyy MMM d";

const keyToLocaleMap: Record<Key, Locale> = {
  dmy: "en-AE",
  mdy: "en-US",
  ymd: "en-GB",
};

const keyToFormatMap: Record<Key, Format> = {
  dmy: "d MMM yyyy",
  mdy: "MMM d, yyyy",
  ymd: "yyyy MMM d",
};

export const formatDate = (date: Date, userPreferredFormat: Key = "dmy"): string => {
  const locale: Locale = keyToLocaleMap[userPreferredFormat]; //this should be in the database
  const format = keyToFormatMap[userPreferredFormat];

  const d = DateTime.fromJSDate(date);
  return d.setLocale(locale).toFormat(format);
};

export const parseDate = (
  dateString: string,
  userPreferredFormat: Key = "dmy"
): Date | undefined => {
  const locale: Locale = keyToLocaleMap[userPreferredFormat]; //this should be in the database
  const format = keyToFormatMap[userPreferredFormat];

  const d = DateTime.fromFormat(dateString, format, { locale });

  if (!d.isValid) {
    console.log("invali date ");

    return;
  }

  return d.toJSDate();
};

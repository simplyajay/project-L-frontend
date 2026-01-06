export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumSignificantDigits: 2,
  }).format(num);
};

export const parseNumber = (text: string): number | undefined => {
  if (text === "") return undefined;

  const cleaned = text.replace(/,/, "");

  const parsed = Number(cleaned);

  return Number.isNaN(parsed) ? undefined : parsed;
};

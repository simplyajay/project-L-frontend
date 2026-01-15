export const formatNumber = (num: number): string => {
  const hansMeaningfulDecimals = Math.abs(num % 1) >= 0.01;

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: hansMeaningfulDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(num);
};

export const parseNumber = (text: string): number | undefined => {
  if (text === "") return undefined;

  const cleaned = text.replace(/,/, "");

  const parsed = Number(cleaned);

  return Number.isNaN(parsed) ? undefined : parsed;
};

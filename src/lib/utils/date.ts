export const toReadableDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("en-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getTodayDateAtMidnight = () => {
  const formattedDate = new Date();
  formattedDate.setUTCHours(0, 0, 0, 0);
  return formattedDate.toISOString();
};

// Format date as "Month Day, Year" in English
export const userFacingDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

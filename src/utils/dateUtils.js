export const getTodayDateAtMidnight = () => {
  const formattedDate = new Date();
  formattedDate.setUTCHours(0, 0, 0, 0);
  return formattedDate.toISOString();
};

export const formatDateInput = (text: string) => {
  // 1. Remove all non-digit characters
  const cleaned = text.replace(/\D/g, '');

  // 2. Slice the cleaned string into parts
  const day = cleaned.slice(0, 2);
  const month = cleaned.slice(2, 4);
  const year = cleaned.slice(4, 8);

  // 3. Add slashes conditionally
  let formattedDate = day;
  if (cleaned.length > 2) {
    formattedDate += `/${month}`;
  }
  if (cleaned.length > 4) {
    formattedDate += `/${year}`;
  }

  return formattedDate;
};
export const formatDateInput = (text: string) => {
  const cleaned = text.replace(/\D/g, '');
  const day = cleaned.slice(0, 2);
  const month = cleaned.slice(2, 4);
  const year = cleaned.slice(4, 8);
  let formattedDate = day;
  if (cleaned.length > 2) {
    formattedDate += `/${month}`;
  }
  if (cleaned.length > 4) {
    formattedDate += `/${year}`;
  }
  return formattedDate;
};
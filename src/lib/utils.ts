export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const parseToReadableDate = (date: Date) => {
  const dateString = date.toISOString();
  return dateString.split('T')[0];
};
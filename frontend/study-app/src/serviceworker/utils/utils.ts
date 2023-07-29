export const extractParam = (url: string) => {
  const pattern = /\/([^\/]+)\/?$/;
  const match = url.match(pattern);
  const result = decodeURIComponent(match?.[1] ?? '')
  return result;
}

export const dateRange = (date: string) => {
  const dateStart = new Date(date);
  dateStart.setHours(0, 0, 0, 0);
  const dateEnd = new Date(date);
  dateEnd.setHours(23, 59, 59, 999);
  return IDBKeyRange.bound(dateStart, dateEnd);
}
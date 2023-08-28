export const extractParams = (urlString: string) => {
  const url = new URL(urlString);
  const params = url.searchParams;
  return params;
}

export const dateRange = (date: string) => {
  const dateStart = new Date(date);
  dateStart.setHours(0, 0, 0, 0);
  const dateEnd = new Date(date);
  dateEnd.setHours(23, 59, 59, 999);
  return IDBKeyRange.bound(dateStart.toISOString(), dateEnd.toISOString());
}

export const firstLetterToUpperCase = (word?: string) => {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : '';
}

export const addParamsToUrl = (url: string, params: Record<string, any>) => {
  const urlObject = new URL(url);
  Object.keys(params).forEach(key => urlObject.searchParams.append(key, params[key]));
  return urlObject;
}

export const addLastUpdatedParams = async (
  request: Request, lastUpdated: Date, body?: Record<string, any>
) => {
  return new Request(
    addParamsToUrl(request.url, {lastUpdated: lastUpdated}), 
    { headers: request.headers, method: request.method, body: JSON.stringify(body) }
  );
}
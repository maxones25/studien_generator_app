const BASE_URI = import.meta.env.VITE_API_URI;

export type RequestMethod = "POST" | "GET" | "PUT" | "DELETE";

export type RequestHeader = {
  [key: string]: string;
};

export type RequestBody = {
  [key: string]: unknown;
};

export type RequestParams = {
  [key: string]: unknown;
};

export interface ApiRequestOptions {
  method?: RequestMethod;
  headers?: RequestHeader;
  body?: RequestBody;
  params?: RequestParams;
}

export const apiRequest = <Response>(
  endpoint: string,
  options: ApiRequestOptions = {}
) =>
  new Promise<Response>(async (resolve, reject) => {
    const {
      method = "GET",
      headers = {},
      params = {},
      body = undefined,
    } = options;

    const queryParams = Object.keys(params)
      .filter((key) => params[key])
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    const uri = `${BASE_URI}${endpoint}${
      queryParams !== "" ? `?${queryParams}` : ""
    }`;

    fetch(uri, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })
      .then(async (res) => {
        return {
          isError: res.status < 200 || 400 <= res.status,
          text: await res.text(),
        };
      })
      .then(({ isError, text }) => {
        const data = text.length > 0 ? JSON.parse(text) : {};
        if (isError) {
          reject(data as Response);
        } else {
          resolve(data as Response);
        }
      })
      .catch((err) => reject(err));
  });

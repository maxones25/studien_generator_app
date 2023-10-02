import supertestRequest from 'supertest';
import { IApp } from './createApp';

export interface QueryRequestOptions {
  path: string;
  params?: PathParams;
  query?: Record<string, any>;
  accessToken?: any;
  headers?: Record<string, string>;
}

export interface CommandRequestOptions {
  path: string;
  params?: PathParams;
  data?: any;
  query?: Record<string, any>;
  accessToken?: any;
  headers?: Record<string, string>;
}

export type PathParams = Record<string, any>;

const resolvePath = (path: string, params: PathParams) => {
  Object.keys(params).forEach((key) => {
    let value = params[key];

    if (value === undefined) {
      value = '';
    }

    path = path.replace(`:${key}`, value);
  });

  return path;
};

export const request = (app: IApp) => {
  const httpServer = supertestRequest(app.getHttpServer());

  return {
    command: ({
      path,
      params = {},
      accessToken,
      query,
      headers,
      data,
    }: CommandRequestOptions) => {
      const r = httpServer.post(resolvePath(path, params));

      if (accessToken !== undefined) {
        r.set('Authorization', `Bearer ${accessToken}`);
      }

      if (headers) {
        Object.keys(headers).forEach((key) => {
          r.set(key, headers[key]);
        });
      }

      if (query !== undefined) {
        r.query(query);
      }

      if (data !== undefined) {
        r.send(data);
      }

      return r;
    },
    query: ({
      path,
      accessToken,
      query,
      headers,
      params = {},
    }: QueryRequestOptions) => {
      const r = httpServer.get(resolvePath(path, params));

      if (accessToken !== undefined) {
        r.set('Authorization', `Bearer ${accessToken}`);
      }

      if (headers) {
        Object.keys(headers).forEach((key) => {
          r.set(key, headers[key]);
        });
      }

      if (query !== undefined) {
        r.query(query);
      }

      return r;
    },
  };
};

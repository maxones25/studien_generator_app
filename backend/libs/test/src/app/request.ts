import supertestRequest from 'supertest';
import { IApp } from './createApp';

export interface QueryRequestOptions {
  path: string;
  query?: Record<string, any>;
  accessToken?: any;
  headers?: Record<string, string>;
}

export interface CommandRequestOptions {
  path: string;
  body: any;
  query?: Record<string, any>;
  accessToken?: any;
  headers?: Record<string, string>;
}

export const request = (app: IApp) => {
  const httpServer = supertestRequest(app.getHttpServer());

  return {
    command: ({
      path,
      accessToken,
      query,
      headers,
      body,
    }: CommandRequestOptions) => {
      const r = httpServer.get(path);

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

      if (body !== undefined) {
        r.send(body);
      }

      return r;
    },
    query: ({ path, accessToken, query, headers }: QueryRequestOptions) => {
      const r = httpServer.get(path);

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

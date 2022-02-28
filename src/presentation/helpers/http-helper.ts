import { ServerError } from "../errors/server-error";
import { HTTPResponse } from "../protocols/http";

export const badRequest = (error: Error): HTTPResponse => ({
  statusCode: 400,
  body: error,
});

export const serverError = (): HTTPResponse => ({
  statusCode: 500,
  body: new ServerError(),
});

export const success = (data: any): HTTPResponse => ({
  statusCode: 200,
  body: data,
});

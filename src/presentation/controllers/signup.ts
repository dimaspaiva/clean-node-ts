import { MissingParamError } from "../errors/missing-param-erros";
import { httpRequest, HTTPResponse } from "../protocols/http";

export class SignupController {
  handle(httpRequest: httpRequest): HTTPResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError("name"),
      };
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError("email"),
      };
    }
  }
}

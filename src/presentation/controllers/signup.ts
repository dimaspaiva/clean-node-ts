import { MissingParamError } from "../errors/missing-param-erros";
import { badRequest } from "../helpers/http-helper";
import { httpRequest, HTTPResponse } from "../protocols/http";

export class SignupController {
  handle(httpRequest: httpRequest): HTTPResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError("name"));
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError("email"));
    }
  }
}

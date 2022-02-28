import { MissingParamError } from "../errors/missing-param-erros";
import { badRequest } from "../helpers/http-helper";
import { httpRequest, HTTPResponse } from "../protocols/http";

export class SignupController {
  handle(httpRequest: httpRequest): HTTPResponse {
    const requiredFields = ["name", "email"];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
  }
}

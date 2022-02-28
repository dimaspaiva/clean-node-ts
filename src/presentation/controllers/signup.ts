import { MissingParamError } from "../errors/missing-param-erros";
import { badRequest } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { HTTPRequest, HTTPResponse } from "../protocols/http";

export class SignupController implements Controller {
  handle(httpRequest: HTTPRequest): HTTPResponse {
    const requiredFields = [
      "name",
      "email",
      "password",
      "passwordConfirmation",
    ];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
  }
}

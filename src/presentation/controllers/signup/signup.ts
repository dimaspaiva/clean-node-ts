import { MissingParamError, InvalidParamError } from "../../errors";
import {
  badRequest,
  serverError,
  success,
} from "../../helpers/http-helper";
import {
  HTTPRequest,
  HTTPResponse,
  EmailValidator,
  Controller,
  AddAccount,
} from "./signup-protocols";

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  async handle(httpRequest: HTTPRequest): Promise<HTTPResponse> {
    try {
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

      const { name, email, password, passwordConfirmation } =
        httpRequest.body;

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError("passwordConfirmation"));
      }

      const isEmailValid = this.emailValidator.isValid(email);
      if (!isEmailValid) {
        return badRequest(new InvalidParamError("email"));
      }

      const account = await this.addAccount.add({
        name,
        email,
        password,
      });
      return success(account);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}

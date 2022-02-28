import {
  MissingParamError,
  InvalidParamError,
  ServerError,
} from "../errors";
import { SignupController } from "./signup";
import { EmailValidator } from "../protocols";

interface SutTypes {
  sut: SignupController;
  emailValidatorStub: EmailValidator;
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    // stub duble de test (função que retorna algo estático)
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

const makeEmailValidatorWithError = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    // stub duble de test (função que retorna algo estático)
    isValid(email: string): boolean {
      throw new Error();
    }
  }

  return new EmailValidatorStub();
};

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const sut = new SignupController(emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};

describe("Signup Controller", () => {
  const testParams = {
    name: "John Doe",
    email: "doe@mail.com",
    password: "123456",
    passwordConfirmation: "1234561",
  };

  it("Should return 400 if no name is provided", () => {
    const { sut } = makeSut(); // system under test (test focal point)
    const httpRequest = { body: { ...testParams } };
    delete httpRequest.body.name;

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  it("Should return 400 if no email is provided", () => {
    const { sut } = makeSut(); // system under test (test focal point)
    const httpRequest = { body: { ...testParams } };
    delete httpRequest.body.email;

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  it("Should return 400 if no password is provided", () => {
    const { sut } = makeSut(); // system under test (test focal point)
    const httpRequest = { body: { ...testParams } };
    delete httpRequest.body.password;

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  it("Should return 400 if no password confirmation is provided", () => {
    const { sut } = makeSut(); // system under test (test focal point)
    const httpRequest = { body: { ...testParams } };
    delete httpRequest.body.passwordConfirmation;

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError("passwordConfirmation")
    );
  });

  it("Should return 400 an invalid e-mail is provided", () => {
    const { sut, emailValidatorStub } = makeSut(); // system under test (test focal point)
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);
    const httpRequest = { body: { ...testParams } };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("email"));
  });

  it("Should call email EmailValidator with correct email", () => {
    const { sut, emailValidatorStub } = makeSut(); // system under test (test focal point)
    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");
    const httpRequest = { body: { ...testParams } };
    httpRequest.body.email = "any_email@mail.com";

    sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith("any_email@mail.com");
  });

  it("Should return 500 if EmailValidator throws", () => {
    const emailValidatorStub = makeEmailValidatorWithError();
    const sut = new SignupController(emailValidatorStub);
    const httpRequest = { body: { ...testParams } };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});

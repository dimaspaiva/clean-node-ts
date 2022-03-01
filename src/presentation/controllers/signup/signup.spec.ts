import {
  MissingParamError,
  InvalidParamError,
  ServerError,
} from "../../errors";
import { SignupController } from "./signup";
import {
  AddAccount,
  AddAccountModel,
  AccountModel,
  EmailValidator,
} from "./signup-protocols";

const testParams = {
  name: "John Doe",
  email: "doe@mail.com",
  password: "123456",
  passwordConfirmation: "123456",
};

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    // stub duble de test (função que retorna algo estático)
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    // stub duble de test (função que retorna algo estático)
    async add(account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: "valid_id",
        name: testParams.name,
        email: testParams.email,
        password: testParams.password,
      };
      return new Promise((resolve) => resolve(fakeAccount));
    }
  }
  return new AddAccountStub();
};

interface SutTypes {
  sut: SignupController;
  emailValidatorStub: EmailValidator;
  addAccountStub: AddAccount;
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const addAccountStub = makeAddAccount();
  const sut = new SignupController(emailValidatorStub, addAccountStub);
  return {
    sut,
    emailValidatorStub,
    addAccountStub,
  };
};

describe("Signup Controller", () => {
  it("Should return 400 if no name is provided", async () => {
    const { sut } = makeSut(); // system under test (test focal point)
    const httpRequest = { body: { ...testParams } };
    delete httpRequest.body.name;

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  it("Should return 400 if no email is provided", async () => {
    const { sut } = makeSut(); // system under test (test focal point)
    const httpRequest = { body: { ...testParams } };
    delete httpRequest.body.email;

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  it("Should return 400 if no password is provided", async () => {
    const { sut } = makeSut(); // system under test (test focal point)
    const httpRequest = { body: { ...testParams } };
    delete httpRequest.body.password;

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  it("Should return 400 if no password confirmation is provided", async () => {
    const { sut } = makeSut(); // system under test (test focal point)
    const httpRequest = { body: { ...testParams } };
    delete httpRequest.body.passwordConfirmation;

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError("passwordConfirmation")
    );
  });

  it("Should return 400 if password confirmation fails", async () => {
    const { sut } = makeSut(); // system under test (test focal point)
    const httpRequest = { body: { ...testParams } };
    httpRequest.body.passwordConfirmation = "invalid_password";

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new InvalidParamError("passwordConfirmation")
    );
  });

  it("Should return 400 an invalid e-mail is provided", async () => {
    const { sut, emailValidatorStub } = makeSut(); // system under test (test focal point)
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);
    const httpRequest = { body: { ...testParams } };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("email"));
  });

  it("Should call email EmailValidator with correct email", async () => {
    const { sut, emailValidatorStub } = makeSut(); // system under test (test focal point)
    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");
    const httpRequest = { body: { ...testParams } };
    httpRequest.body.email = "any_email@mail.com";

    await sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith("any_email@mail.com");
  });

  it("Should return 500 if EmailValidator throws", async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockImplementation(() => {
      throw new Error();
    });
    const httpRequest = { body: { ...testParams } };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it("Should call addAccount with correct values", async () => {
    const { sut, addAccountStub } = makeSut(); // system under test (test focal point)
    const addSpy = jest.spyOn(addAccountStub, "add");
    const httpRequest = { body: { ...testParams } };
    const callParams = { ...testParams };
    delete callParams.passwordConfirmation;

    await sut.handle(httpRequest);

    expect(addSpy).toHaveBeenCalledWith(callParams);
  });

  it("Should return 500 if EmailValidator throws", async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, "add").mockImplementation(async () => {
      return new Promise((resolve, reject) => reject(new Error()));
    });
    const httpRequest = { body: { ...testParams } };
    const callParams = { ...testParams };
    delete callParams.passwordConfirmation;

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it("Should return 200 if valid data is provided", async () => {
    const { sut } = makeSut(); // system under test (test focal point)
    const httpRequest = { body: { ...testParams } };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: "valid_id",
      name: testParams.name,
      email: testParams.email,
      password: testParams.password,
    });
  });
});

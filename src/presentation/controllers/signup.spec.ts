import { MissingParamError } from "../errors/missing-param-erros";
import { SignupController } from "./signup";

describe("Signup Controller", () => {
  const testParams = {
    name: "John Doe",
    email: "doe@mail.com",
    password: "123456",
    passowrdConfirmation: "1234561",
  };

  it("Should return 400 if no name is provided", () => {
    const sut = new SignupController(); // system under test (test focal point)
    const httpRequest = { body: { ...testParams } };
    delete httpRequest.body.name;

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  it("Should return 400 if no email is provided", () => {
    const sut = new SignupController(); // system under test (test focal point)
    console.log(testParams);
    const httpRequest = { body: { ...testParams } };
    delete httpRequest.body.email;

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  it("Should return 400 if no password is provided", () => {
    const sut = new SignupController(); // system under test (test focal point)
    const httpRequest = { body: { ...testParams } };
    delete httpRequest.body.password;

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  it("Should return 400 if no passowrd confirmation is provided", () => {
    const sut = new SignupController(); // system under test (test focal point)
    const httpRequest = { body: { ...testParams } };
    delete httpRequest.body.passowrdConfirmation;

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError("passowrdConfirmation")
    );
  });
});

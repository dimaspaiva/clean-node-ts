import { SignupController } from "./signup";

describe("Signup Controller", () => {
  it("Should return 400 if no name is provided", () => {
    const sut = new SignupController(); // system under test (test focal point)
    const httpRequest = {
      body: {
        email: "doe@mail.com",
        password: "123456",
        passowrdConfirmation: "1234561",
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error("Missing param: name"));
  });

  it("Should return 400 if no email is provided", () => {
    const sut = new SignupController(); // system under test (test focal point)
    const httpRequest = {
      body: {
        name: "John Doe",
        password: "123456",
        passowrdConfirmation: "1234561",
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error("Missing param: email"));
  });
});

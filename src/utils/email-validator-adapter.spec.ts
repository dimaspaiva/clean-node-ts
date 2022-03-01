import { EmailValidatorAdapter } from "./email-validator-adapter";
import validator from "validator";
import isEmail from "validator/lib/isEmail";

jest.mock("validator", () => ({
  isEmail(): boolean {
    return true;
  },
}));

describe("EmailValidator Adapter", () => {
  it("Should return false if validator return false", () => {
    const sut = new EmailValidatorAdapter();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
    const isValid = sut.isValid("invalid_email");

    expect(isValid).toBe(false);
  });

  it("Should return false if validator return false", () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid("valid_email@mail.com");

    expect(isValid).toBe(true);
  });
});

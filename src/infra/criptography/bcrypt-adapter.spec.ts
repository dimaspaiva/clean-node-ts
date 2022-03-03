import bcrypt from "bcrypt";

import { BcryptAdapter } from "./bcrypt-adapter";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve("hash"));
  },
}));

describe("Bcrypt adapter", () => {
  it("Should call bcrypt with correct value", async () => {
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const hashSpy = jest.spyOn(bcrypt, "hash");

    await sut.encrypt("any_text_value");
    expect(hashSpy).toHaveBeenCalledWith("any_text_value", salt);
  });

  it("Should return a hash on success", async () => {
    const salt = 12;
    const sut = new BcryptAdapter(salt);

    const hash = await sut.encrypt("any_text_value");
    expect(hash).toEqual("hash");
  });
});

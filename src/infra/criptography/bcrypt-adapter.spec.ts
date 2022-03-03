import bcrypt from "bcrypt";

import { BcryptAdapter } from "./bcrypt-adapter";

describe("Bcrypt adapter", () => {
  it("Should call bcrypt with correct value", async () => {
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const hashSpy = jest.spyOn(bcrypt, "hash");

    await sut.encrypt("any_text_value");
    expect(hashSpy).toHaveBeenCalledWith("any_text_value", salt);
  });
});

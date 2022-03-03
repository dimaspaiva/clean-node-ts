import { DbAddAccount } from "./db-add-account";
import { Encrypter } from "./db-add-account-protocols";

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }
  return new EncrypterStub();
};

interface SutTypes {
  sut: DbAddAccount;
  encrypterStub: Encrypter;
}
const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const sut = new DbAddAccount(encrypterStub);
  return {
    sut,
    encrypterStub,
  };
};

describe("DbAccount Usecase", () => {
  it("should call encrypter with correct password", async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, "encrypt");
    const accountData = {
      name: "valid name",
      email: "valid_email",
      password: "valid_password",
    };

    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });

  it("should throw if encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();
    jest
      .spyOn(encrypterStub, "encrypt")
      .mockRejectedValueOnce(new Error());

    const accountData = {
      name: "valid name",
      email: "valid_email",
      password: "valid_password",
    };

    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });
});

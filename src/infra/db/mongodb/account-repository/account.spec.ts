import { MongoHelper } from "../helpers/mongo-helper";
import { AccountMongoRepository } from "./account";

describe("Account Mongo Repository", () => {
  const mongoHelper = MongoHelper.getInstance();

  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await mongoHelper.disconnect();
  });

  it("Should return an account on success", async () => {
    const sut = new AccountMongoRepository();
    const accountValues = {
      name: "name",
      email: "email@mail.com",
      password: "password",
    };
    const account = await sut.add(accountValues);

    expect(account).toBeTruthy();
    expect(account).toHaveProperty("_id");
    expect(account.name).toBe(accountValues.name);
    expect(account.email).toBe(accountValues.email);
    expect(account.password).toBe(accountValues.password);
  });
});

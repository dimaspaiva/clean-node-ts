import request from "supertest";

import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helper";
import app from "../config/app";

const mongoHelper = MongoHelper.getInstance();

describe("Signup routes", () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await mongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = mongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
  });

  it("Should ensure signup route is working", async () => {
    const response = await request(app).post("/api/signup").send({
      name: "Dimas",
      email: "dimas.paiva@gmail.com",
      password: "123",
      passwordConfirmation: "123",
    });

    expect(response.status).toBe(200);
  });
});

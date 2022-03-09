import request from "supertest";

import app from "../config/app";

describe("Signup routes", () => {
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

import request from "supertest";
import app from "../config/app";

describe("Body Parser Middleware", () => {
  it("Should ensure body parser is working", async () => {
    app.post("/test_body_parser", (req, res) => {
      res.send(req.body);
    });

    const response = await request(app)
      .post("/test_body_parser")
      .send({ name: "Dimas" });

    expect(response.body).toEqual({ name: "Dimas" });
  });
});

import request from "supertest";

import app from "../config/app";

describe("Cors middleware", () => {
  it("should ensure cors is working", async () => {
    app.get("/test_cors", (req, res) => {
      res.send();
    });

    const response = await request(app).get("/test_cors");

    expect(response.headers).toHaveProperty("access-control-allow-origin");
    expect(response.headers["access-control-allow-origin"]).toEqual("*");

    expect(response.headers).toHaveProperty(
      "access-control-allow-methods"
    );
    expect(response.headers["access-control-allow-methods"]).toEqual("*");

    expect(response.headers).toHaveProperty(
      "access-control-allow-headers"
    );
    expect(response.headers["access-control-allow-headers"]).toEqual("*");
  });
});

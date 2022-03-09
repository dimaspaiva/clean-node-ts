import request from "supertest";

import app from "../config/app";

describe("Content Type Middleware", () => {
  it("Should return default content type as json", async () => {
    app.get("/content_type", (req, res) => {
      res.send();
    });

    const response = await request(app).get("/content_type");

    expect(response.headers).toHaveProperty("content-type");
    expect(response.headers["content-type"]).toMatch(/json/);
  });

  it("Should return XML content type when forced", async () => {
    app.get("/content_type_xml", (req, res) => {
      res.type("xml");
      res.send();
    });

    const response = await request(app).get("/content_type_xml");

    expect(response.headers).toHaveProperty("content-type");
    expect(response.headers["content-type"]).toMatch(/xml/);
  });
});

import { Request, Response } from "express";

import { Controller, HTTPRequest } from "../../presentation/protocols";

export const routeAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HTTPRequest = {
      body: req.body,
    };
    const httpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode);
    res.json(httpResponse.body);
  };
};

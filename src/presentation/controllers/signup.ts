export class SignupController {
  handle(httpRequest) {
    return {
      statusCode: 400,
      body: new Error("Missing param: name"),
    };
  }
}

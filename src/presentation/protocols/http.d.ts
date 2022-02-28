export interface HTTPResponse {
  statusCode: number;
  body: any;
}

export interface HTTPRequest {
  body?: {
    [key: string]: any;
  };
}

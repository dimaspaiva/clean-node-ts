export interface HTTPResponse {
  statusCode: number;
  body: any;
}

export interface httpRequest {
  body?: {
    [key: string]: any;
  };
}

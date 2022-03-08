export interface AccountModel {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface AccountMongoModel {
  _id: string;
  name: string;
  email: string;
  password: string;
}

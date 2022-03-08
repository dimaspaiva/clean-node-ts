import { Collection, MongoClient } from "mongodb";

export class MongoHelper {
  private static instance: MongoHelper;
  private client: MongoClient;

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new MongoHelper();
    }
    return this.instance;
  }

  async connect(url: string) {
    this.client = await MongoClient.connect(process.env.MONGO_URL);
  }

  async disconnect() {
    await this.client.close();
  }

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  }
}

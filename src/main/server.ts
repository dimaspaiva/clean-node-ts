import { MongoHelper } from "../infra/db/mongodb/helpers/mongo-helper";
import app from "./config/app";
import config from "./config/env";

const mongoHelper = MongoHelper.getInstance();

const execute = async () => {
  try {
    await mongoHelper.connect(config.mongoUrl);
    app.listen(config.port, () => {
      console.log("Server running at port 5050 http://localhost:5050");
    });
  } catch (error) {
    console.error(error);
  }
};

execute();

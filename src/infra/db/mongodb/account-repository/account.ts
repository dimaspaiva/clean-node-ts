import { AddAccountRepository } from "../../../../data/protocols/add-account-repository";
import { AccountModel } from "../../../../domain/models/account";
import { AddAccountModel } from "../../../../domain/useCases/add-account";
import { MongoHelper } from "../helpers/mongo-helper";

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection =
      MongoHelper.getInstance().getCollection("accounts");
    const result = await accountCollection.insertOne(accountData);
    return await accountCollection.findOne<AccountModel>({
      _id: result.insertedId,
    });
  }
}

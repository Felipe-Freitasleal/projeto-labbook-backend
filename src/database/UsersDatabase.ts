import { UserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UsersDatabase extends BaseDatabase {
  // propriedades
  public static TABLE_USERS = "users";

  // métodos
  public signUp = async (newUser: UserDB): Promise<void> => {
    await BaseDatabase.connection(UsersDatabase.TABLE_USERS).insert(newUser);
  };

  public findUserByEmail = async (
    email: string
  ): Promise<UserDB | undefined> => {
    const productDB: UserDB[] | undefined[] = await BaseDatabase.connection(
      UsersDatabase.TABLE_USERS
    ).select().where({ email });

    return productDB[0];
  };
}

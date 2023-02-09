import { UserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UsersDatabase extends BaseDatabase {
    // propriedades
    public static TABLE_ACCOUNTS = "users"

    // métodos
    public async singnUp (newUser: UserDB) {
        await BaseDatabase.connection(UsersDatabase.TABLE_ACCOUNTS).insert(newUser)
    }
}
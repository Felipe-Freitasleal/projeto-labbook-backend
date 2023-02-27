import { UserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UsersDatabase extends BaseDatabase {
    // propriedades
    public static TABLE_USERS = "users"

    // métodos
    public signUp = async (newUser: UserDB) => {
        await BaseDatabase.connection(UsersDatabase.TABLE_USERS).insert(newUser)
    }

    public  findUserById = async (email: string) => {
        const [ productDB ]: UserDB[] | undefined[] = await BaseDatabase
            .connection(UsersDatabase.TABLE_USERS)
            .where({ email })

        return productDB
    }
}
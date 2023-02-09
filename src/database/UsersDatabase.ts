import { UserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UsersDatabase extends BaseDatabase {
    // propriedades
    public static TABLE_USERS = "users"

    // métodos
    public async singnUp (newUser: UserDB) {
        await BaseDatabase.connection(UsersDatabase.TABLE_USERS).insert(newUser)
    }

    public async findUserById(id: string) {
        const [ productDB ]: UserDB[] | undefined[] = await BaseDatabase
            .connection(UsersDatabase.TABLE_USERS)
            .where({ id })

        return productDB
    }
}
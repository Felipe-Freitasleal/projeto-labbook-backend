import { UsersDatabase } from "../database/UsersDatabase";
import { singupInputDTO, UsersDTO } from "../dtos/UsersDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { Users } from "../models/Users";
import { UserDB } from "../types";

export class UsersBusiness {
    // propriedades
    constructor(
        private usersDatabase: UsersDatabase,
        private usersDTO: UsersDTO
    ) {}

    // métodos
    public singnUp= async (input: singupInputDTO) => {
        const { id, name, email, password, role } = input;

    if (name.length < 2) {
      throw new BadRequestError("'name' deve possuir pelo menos 2 caracteres");
    }

    if (!email.includes("@")) {
        throw new BadRequestError("Insira e-mail válido");
    }

    
    if (!password.match(/"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"/g)  ) {
        throw new BadRequestError("A senha deve ter no mínimo 6 caracteres com pelo menos um número.");
    }

    if (role.length < 2) {
        throw new BadRequestError("O cargo deve ter ao menos dois caracteres.");
    }

    const usersDBExist = await this.usersDatabase.findUserById(id);

    if (usersDBExist) {
      throw new BadRequestError("'id' já existe");
    }

    const newUser = new Users(id, name, email, password, role, new Date().toISOString());

    const newUserDB: UserDB = {
        id: newUser.getId(),
        name: newUser.getName(),
        email: newUser.getEmail(),
        password: newUser.getPassword(),
        role: newUser.getRole(),
        created_at: newUser.getCreatedAt()
    };

    await this.usersDatabase.singnUp(newUserDB);


    const output = this.usersDTO.singupOutput(newUser)

    return output;
    }
}
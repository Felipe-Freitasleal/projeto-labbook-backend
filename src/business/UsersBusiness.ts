import { UsersDatabase } from "../database/UsersDatabase";
import { SignupInputDTO, UsersDTO } from "../dtos/UsersDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { Users } from "../models/Users";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, TokenPayload } from "../services/TokenMenager";
import { USERS_ROLES } from "../types";

export class UsersBusiness {
  // propriedades
  constructor(
    private usersDatabase: UsersDatabase,
    private usersDTO: UsersDTO,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager: HashManager
  ) {}

  // métodos
  public signUp = async (input: SignupInputDTO) => {
    const { name, email, password } = input;

    if (name.length < 2) {
      throw new BadRequestError("'name' deve possuir pelo menos 2 caracteres");
    }

    if (!email.includes("@")) {
      throw new BadRequestError("Insira e-mail válido");
    }

    if (!password.match(/"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"/g)) {
      throw new BadRequestError(
        "A senha deve ter no mínimo 6 caracteres com pelo menos um número."
      );
    }

    const usersDBExist = await this.usersDatabase.findUserById(email);

    if (usersDBExist) {
      throw new BadRequestError("'id' já existe");
    }

    const id = this.idGenerator.generate();
    const hashPassword = await this.hashManager.hash(password);
    const role =  USERS_ROLES.NORMAL;
    const createdAt = new Date().toISOString();

    const newUser = new Users(
      id,
      name,
      email,
      hashPassword,
      role,
      createdAt
    );

    const userDB = newUser.toDBModel()

    await this.usersDatabase.signUp(userDB);

    const payload: TokenPayload = {
        id: newUser.getId(),
        name: newUser.getName(),
        role: newUser.getRole()
    }

    const token = this.tokenManager.createToken(payload);

    const output = this.usersDTO.signupOutput(
        token
    );

    return output;
  };
}

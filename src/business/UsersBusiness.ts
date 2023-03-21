import { UsersDatabase } from "../database/UsersDatabase";
import { LoginInputDTO, SignupInputDTO, UsersDTO } from "../dtos/UsersDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
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

    if (password.length < 6) {
      throw new BadRequestError(
        "A senha deve ter no mínimo 6 caracteres com pelo menos um número."
      );
    }

    const usersDBExist = await this.usersDatabase.findUserByEmail(email);

    if (usersDBExist) {
      throw new BadRequestError("'E-mail' já cadastrado");
    }

    const id = this.idGenerator.generate();
    const hashPassword = await this.hashManager.hash(password);
    const role = USERS_ROLES.NORMAL;
    const createdAt = new Date().toISOString();

    const newUser = new Users(id, name, email, hashPassword, role, createdAt);

    const userDB = newUser.toDBModel();

    await this.usersDatabase.signUp(userDB);

    const payload: TokenPayload = {
      id: newUser.getId(),
      name: newUser.getName(),
      role: newUser.getRole(),
    };

    const token = this.tokenManager.createToken(payload);

    const output = this.usersDTO.signupOutput(token);

    return output;
  };

  public login = async (input: LoginInputDTO) => {
    const { email, password } = input;

    if (!email.includes("@")) {
      throw new BadRequestError("Insira e-mail válido");
    }

    if (password.length < 6) {
      throw new BadRequestError(
        "A senha deve ter no mínimo 6 caracteres com pelo menos um número."
      );
    }

    const usersDBExist = await this.usersDatabase.findUserByEmail(email);

    if (!usersDBExist) {
      throw new NotFoundError("'E-mail' não cadastrado");
    }

    const user = new Users(
      usersDBExist.id,
      usersDBExist.name,
      usersDBExist.email,
      usersDBExist.password,
      usersDBExist.role,
      usersDBExist.created_at
    );

    const isPasswordCorrect = await this.hashManager.compare(password, user.getPassword())

    if(!isPasswordCorrect){
      throw new BadRequestError("'Password' incorreto")
    }

    const payload: TokenPayload = {
      id: user.getId(),
      name: user.getName(),
      role: user.getRole(),
    };

    const token = this.tokenManager.createToken(payload);

    const output = this.usersDTO.loginOutput(token);

    return output;
  };
}

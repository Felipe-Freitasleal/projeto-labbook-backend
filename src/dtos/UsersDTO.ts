import { BadRequestError } from "../errors/BadRequestError";
import { PostModel } from "../types";

export interface SignupInputDTO {
  name: string;
  email: string;
  password: string;
}

export interface SignUpOutPutDTo {
  token: string;
}

export interface LoginInputDTO {
  email: string;
  password: string;
}

export interface LoginOutputDTO {
  token: string;
}


export class UsersDTO {
  // propriedades

  // métodos
  public signupInput(
    name: unknown,
    email: unknown,
    password: unknown
  ): SignupInputDTO {
    if (typeof name !== "string") {
      throw new BadRequestError("'name' deve ser string");
    }

    if (typeof email !== "string") {
      throw new BadRequestError("O e-mail deve ser uma string");
    }

    if (typeof password !== "string") {
      throw new BadRequestError("A senha deve ser uma string");
    }

    const dto: SignupInputDTO = {
      name,
      email,
      password,
    };

    return dto;
  }

  public signupOutput(token: any) {
    const dto: SignUpOutPutDTo = {
      token,
    };

    return dto;
  }

  public loginInput(email: unknown, password: unknown): LoginInputDTO {
    if (typeof email !== "string") {
      throw new BadRequestError("O e-mail deve ser uma string");
    }

    if (typeof password !== "string") {
      throw new BadRequestError("A senha deve ser uma string");
    }

    const dto: LoginInputDTO = {
      email,
      password,
    };

    return dto;
  }
}

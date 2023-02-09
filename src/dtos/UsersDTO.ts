import { BadRequestError } from "../errors/BadRequestError";
import { Users } from "../models/Users";

export interface singupInputDTO {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
}

export interface singnUpOutPutDTo {
    message: string,
    user: {
        id: string,
        name: string,
        email: string,
        password: string,
        role: string,
        createdAt: string
    }
}

export class UsersDTO {
    // propriedades

    // métodos
    public singupInput (
        id: unknown,
        name: unknown,
        email: unknown,
        password: unknown,
        role: unknown
    ): singupInputDTO {

        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string");
          }
      
          if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string");
          }
      
          if (typeof email !== "string") {
            throw new BadRequestError("'price' deve ser number");
          }

          if (typeof password !== "string") {
            throw new BadRequestError("'price' deve ser number");
          }

          if (typeof role !== "string") {
            throw new BadRequestError("'price' deve ser number");
          }

          const dto: singupInputDTO = {
            id,
            name,
            email,
            password, 
            role
          };
      
          return dto;
    }

    public singupOutput(users: Users) {
        const dto: singnUpOutPutDTo = {
          message: "Usuário registrado com sucesso",
          user: {
            id: users.getId(),
            name: users.getName(),
            email: users.getEmail(),
            password: users.getPassword(),
            role: users.getRole(),
            createdAt: users.getCreatedAt()
          },
        };
    
        return dto;
      }
}
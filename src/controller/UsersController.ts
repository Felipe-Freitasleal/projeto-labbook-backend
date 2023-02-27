import { Request, Response } from "express";
import { UsersBusiness } from "../business/UsersBusiness";
import { UsersDTO } from "../dtos/UsersDTO";
import { BaseError } from "../errors/BaseError";

export class UsersController {
  constructor(
    private usersDTO: UsersDTO,
    private usersBusiness: UsersBusiness
  ) {}

    // métodos
    public signUp = async (req: Request, res: Response) => {
      try {
        const input = this.usersDTO.signupInput(
          req.body.name,
          req.body.email,
          req.body.password
        );
  
        const output = await this.usersBusiness.signUp(input);
  
        res.status(201).send(output);
    } catch (error) {
        console.log(error);
  
        if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message);
        } else {
          res.status(500).send("Erro inesperado");
        }
    }}

    public login = async (req: Request, res: Response) => {try {
        
    } catch (error) {
        console.log(error);

        if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message);
        } else {
          res.status(500).send("Erro inesperado");
        }
    }}
}
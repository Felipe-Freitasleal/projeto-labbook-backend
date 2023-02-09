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
    public singUp = async (req: Request, res: Response) => {
      try {
        const input = this.usersDTO.singupInput(
          req.body.id,
          req.body.name,
          req.body.email,
          req.body.password,
          req.body.role
        );
  
        const output = await this.usersBusiness.singnUp(input);
  
        res.status(201).send(output);
    } catch (error) {
        console.log(error);
  
        if (error instanceof BaseError) {
          res.send(error.message);
        } else {
          res.send("Erro inesperado");
        }
    }}

    public login = async (req: Request, res: Response) => {try {
        
    } catch (error) {
        console.log(error);

        if (req.statusCode === 200) {
          res.status(500);
        }
  
        if (error instanceof Error) {
          res.send(error.message);
        } else {
          res.send("Erro inesperado");
        }
    }}
}
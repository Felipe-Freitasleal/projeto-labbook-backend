import express from "express";
import { UsersBusiness } from "../business/UsersBusiness";
import { UsersController } from "../controller/UsersController";
import { UsersDatabase } from "../database/UsersDatabase";
import { UsersDTO } from "../dtos/UsersDTO";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenMenager";


export const userRouter = express.Router()

const usersController = new UsersController(
 new UsersDTO(),
 new UsersBusiness(
    new UsersDatabase(),
    new UsersDTO(),
    new IdGenerator(),
    new TokenManager(),
    new HashManager()
 )
)

userRouter.post("/", usersController.signUp)
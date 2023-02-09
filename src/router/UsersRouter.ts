import express from "express";
import { UsersBusiness } from "../business/UsersBusiness";
import { UsersController } from "../controller/UsersController";
import { UsersDatabase } from "../database/UsersDatabase";
import { UsersDTO } from "../dtos/UsersDTO";


export const userRouter = express.Router()

const usersController = new UsersController(
 new UsersDTO(),
 new UsersBusiness(
    new UsersDatabase(),
    new UsersDTO()
 )
)

userRouter.post("/", usersController.singUp)
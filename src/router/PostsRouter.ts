import express from "express";
import { PostsBusiness } from "../business/PostsBusiness";
import { PostsController } from "../controller/PostsController";
import { PostsDatabase } from "../database/PostsDatabase";
import { PostsDTO } from "../dtos/PostsDTO";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenMenager";

export const postRouter = express.Router()

const postsController = new PostsController(
    new PostsDTO(),
    new PostsBusiness(
        new PostsDatabase(),
        new PostsDTO(),
        new IdGenerator(),
        new TokenManager()
    ),
)

postRouter.get("/", postsController.getPost)
postRouter.post("/", postsController.createPost)
postRouter.put("/:id", postsController.editPost)
postRouter.delete("/:id", postsController.deletePost)
postRouter.put("/:id/like", postsController.likeDislikePost)


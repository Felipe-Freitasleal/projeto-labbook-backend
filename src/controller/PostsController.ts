import { Request, Response } from "express";
import { PostsBusiness } from "../business/PostsBusiness";
import { GetPostInputDTO, PostsDTO } from "../dtos/PostsDTO";
import { BaseError } from "../errors/BaseError";

export class PostsController {
  constructor(
    private postsDTO: PostsDTO,
    private postsBusiness: PostsBusiness
  ) {}
  // métodos
  public getPost = async (req: Request, res: Response) => {
    try {
      const input: GetPostInputDTO =  {
        token: req.headers.authorization
      }


      const output = await this.postsBusiness.getPosts(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public createPost = async (req: Request, res: Response) => {
    try {
      const input = this.postsDTO.createPostInput(
        req.body.content,
        req.headers.authorization
      );

      await this.postsBusiness.createPost(input);

      res.status(201).end();
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
    }
  };

  public editPost = async (req: Request, res: Response) => {
    try {
      const input = this.postsDTO.editPostInput(
        req.params.id,
        req.headers.authorization,
        req.body.content,
      );

     await this.postsBusiness.editPost(input);

      res.status(200).end();
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
    }
  };

  public deletePost = async (req: Request, res: Response) => {
    try {
      const input = this.postsDTO.deletePostInput(
        req.params.id,
        req.headers.authorization,
      );

     await this.postsBusiness.deletePost(input);

      res.status(200).end();
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
    }
  };

  public likeDislikePost = async (req: Request, res: Response) => {
    try {
      const input = this.postsDTO.likeOrDislikePostInput(
        req.params.id,
        req.headers.authorization,
        req.body.like,
        // req.body.dislike
      );

     await this.postsBusiness.likeOrDislikePost(input);

     res.status(200).end();
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
    }
  };
}

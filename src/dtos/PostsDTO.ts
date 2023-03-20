import { BadRequestError } from "../errors/BadRequestError";
import { PostModel } from "../types";

export interface GetPostInputDTO {
  token: string | undefined;
}

export type GetPostOutputDTO = PostModel[];

export interface CreatePostInputDTO {
  content: string;
  token: string | undefined;
}

export interface EditPostInputDTO {
  idToEdit: string;
  token: string | undefined;
  content: string;
}

export interface DeletePostInputDTO {
  idToDelete: string;
  token: string | undefined;
}

export interface LikeOrDislikePostInputDTO {
  idToLikeOrDislike: string;
  token: string | undefined;
  like: boolean;
  // dislike: boolean;
}

export class PostsDTO {
  // propriedades

  // métodos

  public createPostInput(content: unknown, token: unknown): CreatePostInputDTO {
    if (typeof content !== "string") {
      throw new BadRequestError("O conteúdo deve ser uma string");
    }

    if (typeof token !== "string") {
      throw new BadRequestError("O token deve ser uma string");
    }

    const dto: CreatePostInputDTO = {
      content,
      token,
    };

    return dto;
  }

  public editPostInput(
    idToEdit: unknown,
    token: unknown,
    content: unknown
  ): EditPostInputDTO {
    if (typeof idToEdit !== "string") {
      throw new BadRequestError("'Id' deve ser string");
    }

    if (typeof token !== "string") {
      throw new BadRequestError("O token deve ser uma string");
    }

    if (typeof content !== "string") {
      throw new BadRequestError("O conteúdo deve ser uma string");
    }

    const dto: EditPostInputDTO = {
      idToEdit,
      token,
      content,
    };

    return dto;
  }

  public deletePostInput(
    idToDelete: unknown,
    token: unknown
  ): DeletePostInputDTO {
    if (typeof idToDelete !== "string") {
      throw new BadRequestError("O conteúdo deve ser uma string");
    }

    if (typeof token !== "string") {
      throw new BadRequestError("O token deve ser uma string");
    }

    const dto: DeletePostInputDTO = {
      idToDelete,
      token,
    };

    return dto;
  }

  public likeOrDislikePostInput(
    idToLikeOrDislike: unknown,
    token: unknown,
    like: unknown,
    // dislike: unknown
  ): LikeOrDislikePostInputDTO {
    if (typeof idToLikeOrDislike !== "string") {
      throw new BadRequestError("O Id deve ser uma string");
    }

    if (typeof token !== "string") {
      throw new BadRequestError("O token deve ser uma string");
    }

    if (typeof like !== "boolean") {
      throw new BadRequestError("O like deve ser um boolean");
    }

    // if (typeof dislike !== "boolean") {
    //   throw new BadRequestError("O token deve ser um number");
    // }

    const dto: LikeOrDislikePostInputDTO = {
      idToLikeOrDislike,
      token,
      like,
      // dislike,
    };

    return dto;
  }
}

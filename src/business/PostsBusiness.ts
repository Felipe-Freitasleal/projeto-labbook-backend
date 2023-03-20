import { type } from "os";
import { PostsDatabase } from "../database/PostsDatabase";
import {
  CreatePostInputDTO,
  DeletePostInputDTO,
  EditPostInputDTO,
  GetPostInputDTO,
  GetPostOutputDTO,
  LikeOrDislikePostInputDTO,
  PostsDTO,
} from "../dtos/PostsDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Posts } from "../models/Posts";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenMenager";
import {
  LikesDislikesDB,
  PostDB,
  PostWithCreatorDB,
  POST_LIKE,
  USERS_ROLES,
} from "../types";

export class PostsBusiness {
  constructor(
    private postsDatabase: PostsDatabase,
    private postsDTO: PostsDTO,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  /// get
  public getPosts = async (
    input: GetPostInputDTO
  ): Promise<GetPostOutputDTO> => {
    const { token } = input;

    if (token === undefined) {
      throw new BadRequestError("'Token' ausente");
    }

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    const postsWithCreatorDB: PostWithCreatorDB[] | undefined =
      await this.postsDatabase.getPostWithCreator();

    const posts = postsWithCreatorDB.map((postWithCreatorDB) => {
      const post = new Posts(
        postWithCreatorDB.id,
        postWithCreatorDB.content,
        postWithCreatorDB.likes,
        postWithCreatorDB.dislikes,
        postWithCreatorDB.created_at,
        postWithCreatorDB.update_at,
        postWithCreatorDB.creator_id,
        postWithCreatorDB.creator_name
      );

      return post.toBusinessModel();
    });

    const output: GetPostOutputDTO = posts;

    return output;
  };

  /// create
  public createPost = async (input: CreatePostInputDTO): Promise<void> => {
    const { content, token } = input;

    if (token === undefined) {
      throw new BadRequestError("'Token' ausente");
    }

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    const id = this.idGenerator.generate();
    const creatorId = payload.id;
    const creatorName = payload.name;

    const newPost = new Posts(
      id,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
      creatorId,
      creatorName
    );

    const postDB = newPost.toDBModel();

    await this.postsDatabase.createPost(postDB);
  };

  /// edit
  public editPost = async (input: EditPostInputDTO): Promise<void> => {
    const { idToEdit, token, content } = input;

    if (token === undefined) {
      throw new BadRequestError("'Token' ausente");
    }

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    const postDb = await this.postsDatabase.findPostById(idToEdit);

    if (!postDb) {
      throw new NotFoundError("Id da postagem não encontrada.");
    }

    if (postDb.creator_id !== payload.id) {
      throw new BadRequestError("Somente o criador do post pode editá-lo");
    }

    const creatorId = payload.id;
    const creatorName = payload.name;

    const post = new Posts(
      postDb.id,
      postDb.content,
      postDb.likes,
      postDb.dislikes,
      postDb.created_at,
      postDb.update_at,
      creatorId,
      creatorName
    );

    post.setContent(content);
    post.setUpdateAt(new Date().toISOString());

    const updatePostDB = post.toDBModel();

    await this.postsDatabase.updatePost(idToEdit, updatePostDB);
  };

  /// Delete
  public deletePost = async (input: DeletePostInputDTO): Promise<void> => {
    const { idToDelete, token } = input;

    if (token === undefined) {
      throw new BadRequestError("'Token' ausente");
    }

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    const postDb = await this.postsDatabase.findPostById(idToDelete);

    if (!postDb) {
      throw new NotFoundError("Id da postagem não encontrada.");
    }

    if (
      payload.role !== USERS_ROLES.ADMIN &&
      postDb.creator_id !== payload.id
    ) {
      throw new BadRequestError("Somente o criador do post pode deleta-lo");
    }

    await this.postsDatabase.deletePostById(idToDelete);
  };

  /// like or dislike
  public likeOrDislikePost = async (
    input: LikeOrDislikePostInputDTO
  ): Promise<void> => {
    const { idToLikeOrDislike, token, like } = input;

    if (token === undefined) {
      throw new BadRequestError("'Token' ausente");
    }

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    const postWithCreatorDB = await this.postsDatabase.findPostWithCreatorById(
      idToLikeOrDislike
    );

    if (!postWithCreatorDB) {
      throw new NotFoundError("Id da postagem não encontrada.");
    }

    const userId = payload.id;
    const likeForDB = like ? 1 : 0;

    if (postWithCreatorDB.creator_id === userId) {
      throw new BadRequestError(
        "Não é possível dar like ou dislike em sua própria postagem."
      );
    }

    const likeDislikeDB: LikesDislikesDB = {
      user_id: userId,
      post_id: postWithCreatorDB.id,
      like: likeForDB,
    };

    const post = new Posts(
      postWithCreatorDB.id,
      postWithCreatorDB.content,
      postWithCreatorDB.likes,
      postWithCreatorDB.dislikes,
      postWithCreatorDB.created_at,
      postWithCreatorDB.update_at,
      postWithCreatorDB.creator_id,
      postWithCreatorDB.creator_name
    );

    const likeDislikeExist = await this.postsDatabase.findLikeDislike(
      likeDislikeDB
    );

    if (likeDislikeExist === POST_LIKE.ALREADY_LIKED) {
      if(like){
        await this.postsDatabase.removeLikeDislike(likeDislikeDB);
        post.removeLike();
      } else {
        await this.postsDatabase.updateLikeDislike(likeDislikeDB);
        post.removeLike();
        post.addDislike()
      }
    } else if (likeDislikeExist === POST_LIKE.ALREADY_DISLIKED) {
      if(!like){
        await this.postsDatabase.removeLikeDislike(likeDislikeDB);
        post.removeDislike();
      } else {
        await this.postsDatabase.updateLikeDislike(likeDislikeDB);
        post.removeDislike();
        post.addLike()
      }
    } else {
      await this.postsDatabase.likeOrDislikePost(likeDislikeDB);

      like ? post.addLike() : post.addDislike();
    }
    
    const updatePostDB = post.toDBModel();

    await this.postsDatabase.updatePost(idToLikeOrDislike, updatePostDB);
  };
}

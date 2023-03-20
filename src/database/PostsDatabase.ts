import { LikesDislikesDB, PostDB, PostWithCreatorDB, POST_LIKE } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostsDatabase extends BaseDatabase {
  // propriedades
  public static TABLE_POSTS = "posts";
  public static TABLE_LIKES_DISLIKES = "likes_dislikes"

  // métodos
  public getPostWithCreator = async () => {
    const result: PostWithCreatorDB[] = await BaseDatabase.connection(
      PostsDatabase.TABLE_POSTS
    )
      .select(
        "posts.id",
        "posts.creator_id",
        "posts.content",
        "posts.likes",
        "posts.dislikes",
        "posts.created_at",
        "posts.update_at",
        "users.name AS creator_name"
      )
      .join("users", "posts.creator_id", "=", "users.id");

    return result;
  };

  public createPost = async (postDB: PostDB): Promise<void> => {
    await BaseDatabase.connection(PostsDatabase.TABLE_POSTS).insert(postDB);
  };

  public findPostById = async (id: string): Promise<PostDB | undefined> => {
    const postDB: PostDB[] | undefined[] = await BaseDatabase.connection(
      PostsDatabase.TABLE_POSTS
    )
      .select()
      .where({ id });

    return postDB[0];
  };

  public updatePost = async (id: string, updatePost: PostDB): Promise<void> => {
    await BaseDatabase.connection(PostsDatabase.TABLE_POSTS).update(updatePost).where({ id })
  }

  public deletePostById = async (id: string): Promise<void> => {
    await BaseDatabase.connection(PostsDatabase.TABLE_POSTS).delete().where({ id })
  }

  public findPostWithCreatorById = async (idPost: string): Promise<PostWithCreatorDB | undefined> => {
    const result: PostWithCreatorDB[] = await BaseDatabase.connection(
      PostsDatabase.TABLE_POSTS
    )
      .select(
        "posts.id",
        "posts.creator_id",
        "posts.content",
        "posts.likes",
        "posts.dislikes",
        "posts.created_at",
        "posts.update_at",
        "users.name AS creator_name"
      )
      .join("users", "posts.creator_id", "=", "users.id")
      .where('posts.id', idPost);

    return result[0];
  };

  public likeOrDislikePost = async (likeDislike: LikesDislikesDB): Promise<void> => {
    await BaseDatabase.connection(PostsDatabase.TABLE_LIKES_DISLIKES).insert(likeDislike)
  }

  public findLikeDislike = async (likeDislikeDBToFind: LikesDislikesDB): Promise<POST_LIKE| null> => {
    const [ likeDislikeDB ]: LikesDislikesDB[] = await BaseDatabase.connection(PostsDatabase.TABLE_LIKES_DISLIKES).select().where({
      user_id: likeDislikeDBToFind.user_id,
      post_id: likeDislikeDBToFind.post_id
    })
    
    if(likeDislikeDB){
      return likeDislikeDB.like === 1 ? POST_LIKE.ALREADY_LIKED : POST_LIKE.ALREADY_DISLIKED;

    } else {
      return null
    }
  }

  public removeLikeDislike = async (likeDislike: LikesDislikesDB): Promise<void> => {
    await BaseDatabase.connection(PostsDatabase.TABLE_LIKES_DISLIKES).delete().where({
      user_id: likeDislike.user_id,
      post_id: likeDislike.post_id
    })
  }

  public updateLikeDislike = async (likeDislike: LikesDislikesDB): Promise<void> => {
    await BaseDatabase.connection(PostsDatabase.TABLE_LIKES_DISLIKES).update(likeDislike).where({
      user_id: likeDislike.user_id,
      post_id: likeDislike.post_id
    })
  }
}

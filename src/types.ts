// user
export enum USERS_ROLES {
    NORMAL = "user",
    ADMIN = "admin"
}

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USERS_ROLES,
    created_at: string
}

export interface UserModel{
    id: string,
    name: string,
    email: string,
    password: string,
    role: USERS_ROLES,
    createdAt: string
}


// post
export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    update_at: string 
}

export interface PostModel {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updateAt: string,
    creator: {
        id: string,
        name: string
    }
}

export interface PostWithCreatorDB extends PostDB {
    creator_name: string
}

export interface LikesDislikesDB {
    user_id: string,
    post_id: string,
    like: number
}

export enum POST_LIKE{
    ALREADY_LIKED = 'ALREADY LIKED',
    ALREADY_DISLIKED = 'ALREADY DISLIKED'
}
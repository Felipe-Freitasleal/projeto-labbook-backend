export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    created_at: string
}

export interface UserModel{
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    createdAt: string
}

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

export enum USERS_ROLES {
    NORMAL = "user",
    ADMIN = "admin"
}
import { PostDB, PostModel } from "../types"

export class Posts {
    constructor(
        private id: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updateAt: string,
        private creatorId: string,
        private creatorName: string
    ){}

    public getId(): string {
        return this.id
    }
    public setId(value: string): void{
        this.id = value
    }

    public getContent(): string {
        return this.content
    }
    public setContent(value: string): void{
        this.content = value
    }

    public getLikes(): number {
        return this.likes
    }
    public setLikes(value: number): void{
        this.likes = value
    }

    public addLike () {
        this.likes += 1
    }

    public removeLike () {
        this.likes -= 1
    }

    public addDislike () {
        this.dislikes += 1
    }

    public removeDislike () {
        this.dislikes -= 1
    }

    public getDislikes(): number {
        return this.dislikes
    }
    public setDislikes(value: number): void{
        this.dislikes = value
    }

    public getCreatedAt(): string {
        return this.createdAt
    }
    public setCreatedAt(value: string): void{
        this.createdAt = value
    }

    public getUpdateAt(): string {
        return this.updateAt
    }
    public setUpdateAt(value: string): void{
        this.updateAt = value
    }
    
    public getCreatorId(): string {
        return this.creatorId
    }
    public setCreatorId(value: string): void{
        this.creatorId = value
    }

    
    public getcreatorName(): string {
        return this.creatorName
    }
    public setCreatorName(value: string): void{
        this.creatorName = value
    }

    public toDBModel(): PostDB {
        return {
            id: this.id,
            creator_id: this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            update_at: this.updateAt
        }
    }

    public toBusinessModel(): PostModel {
        return {
            id: this.id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            updateAt: this.updateAt,
            creator: {
                id: this.creatorId,
                name: this.creatorName
            }
        }
    }
}
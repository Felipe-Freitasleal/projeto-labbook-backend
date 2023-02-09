export class Posts {
    constructor(
        private id: string,
        private creatorId: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updateAt: string
    ){}

    public getId(): string {
        return this.id
    }
    public setId(value: string): void{
        this.id = value
    }

    public getCreatorId(): string {
        return this.creatorId
    }
    public setCreatorId(value: string): void{
        this.creatorId = value
    }

    public getcontent(): string {
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
}
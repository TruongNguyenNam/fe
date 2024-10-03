import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

export class Blog extends BaseEntity {
    id?: number;
    title: string;
    content: string;
    user: User;
    publishedAt: Date;

    constructor(
        title: string,
        content: string,
        user: User,
        publishedAt: Date,
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.title = title;
        this.content = content;
        this.user = user;
        this.publishedAt = publishedAt;
    }
}
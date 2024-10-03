import { BaseEntity } from "./BaseEntity";
import { Product } from "./Product";
import { User } from "./User";

export class Review extends BaseEntity {
    id?: number;
    product: Product;
    user: User;
    rating: number;
    comment: string;

    constructor(
        product: Product,
        user: User,
        rating: number,
        comment: string,
        id?: number,
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.id = id;
        this.product = product;
        this.user = user;
        this.rating = rating;
        this.comment = comment;
    }
}
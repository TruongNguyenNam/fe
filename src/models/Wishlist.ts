import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { Product } from "./Product";

export class Wishlist extends BaseEntity {
    id?: number;
    user: User;
    product: Product;

    constructor(
        user: User,
        product: Product,
        id?: number,
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.id = id;
        this.user = user;
        this.product = product;
    }
}
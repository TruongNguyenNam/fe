import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { Product } from "./Product";

export class Cart extends BaseEntity {
    id?: number;
    user: User;
    product: Product;
    quantity: number;
    totalPrice?: number;

    constructor(
        user: User,
        product: Product,
        quantity: number,
        totalPrice?: number,
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.user = user;
        this.product = product;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }
}
import { BaseEntity } from "./BaseEntity";
import { Return } from "./Return";
import { Product } from "./Product";

export class ReturnDetail extends BaseEntity {
    id?: number;
    returnOrder: Return;
    product: Product;
    quantity: number;
    refundAmount: number;

    constructor(
        returnOrder: Return,
        product: Product,
        quantity: number,
        refundAmount: number,
        id?: number,
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.id = id;
        this.returnOrder = returnOrder;
        this.product = product;
        this.quantity = quantity;
        this.refundAmount = refundAmount;
    }
}
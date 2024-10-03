import { BaseEntity } from "./BaseEntity";
import { Order } from "./Order";
import { Product } from "./Product";

export class OrderDetail extends BaseEntity {
    id?: number;
    order: Order;
    product: Product;
    quantity: number;
    price: number;
    total: number;

    constructor(
        order: Order,
        product: Product,
        quantity: number,
        price: number,
        total: number,
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.order = order;
        this.product = product;
        this.quantity = quantity;
        this.price = price;
        this.total = total;
    }
}
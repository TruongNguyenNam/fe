import { BaseEntity } from "./BaseEntity";
import { Product } from "./Product";

export class Inventory extends BaseEntity {
    id?: number;
    product: Product;
    stock: number;
    reservedStock: number;
    lastUpdated: Date;

    constructor(
        product: Product,
        stock: number,
        reservedStock: number,
        lastUpdated: Date = new Date(),
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.product = product;
        this.stock = stock;
        this.reservedStock = reservedStock;
        this.lastUpdated = lastUpdated;
    }
}
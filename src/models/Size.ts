import { BaseEntity } from "./BaseEntity";
import { Product } from "./Product";

export class Size extends BaseEntity {
    id?: number;
    size: string;
    products?: Product[];

    constructor(
        size: string,
        id?: number,
        products?: Product[],
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.id = id;
        this.size = size;
        this.products = products;
    }
}
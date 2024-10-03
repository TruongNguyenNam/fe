import { BaseEntity } from "./BaseEntity";
import { Product } from "./Product";

export class Color extends BaseEntity {
    id?: number;
    color: string;
    name: string;
    products: Product[];

    constructor(
        color: string,
        name: string,
        products: Product[] = [],
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.color = color;
        this.name = name;
        this.products = products;
    }
}
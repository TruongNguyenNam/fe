import { BaseEntity } from "./BaseEntity";
import { Product } from "./Product";

export class Category extends BaseEntity {
    id?: number;
    name: string;
    description: string;
    products: Product[];

    constructor(
        name: string,
        description: string,
        products: Product[] = [],
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.name = name;
        this.description = description;
        this.products = products;
    }
}
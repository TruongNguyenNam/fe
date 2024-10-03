import { BaseEntity } from "./BaseEntity";
import { ProductTag } from "./ProductTag";

export class Tag extends BaseEntity {
    id?: number;
    name: string;
    productTags?: ProductTag[];

    constructor(
        name: string,
        id?: number,
        productTags?: ProductTag[],
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.id = id;
        this.name = name;
        this.productTags = productTags;
    }
}
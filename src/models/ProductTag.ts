import { BaseEntity } from "./BaseEntity";
import { Product } from "./Product";
import { Tag } from "./Tag";

export class ProductTag extends BaseEntity {
    id?: number;
    product: Product;
    tag: Tag;

    constructor(
        product: Product,
        tag: Tag,
        id?: number,
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.id = id;
        this.product = product;
        this.tag = tag;
    }
}
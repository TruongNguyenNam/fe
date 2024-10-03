import { BaseEntity } from "./BaseEntity";
import { Product } from "./Product";
import { Supplier } from "./Supplier";

export class ProductSupplier extends BaseEntity {
    id?: number;
    product: Product;
    supplier: Supplier;

    constructor(
        product: Product,
        supplier: Supplier,
        id?: number,
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.id = id;
        this.product = product;
        this.supplier = supplier;
    }
}
import { BaseEntity } from "./BaseEntity";
import { ProductSupplier } from "./ProductSupplier";

export class Supplier extends BaseEntity {
    id?: number;
    name: string;
    contactInfo: string;
    productSuppliers?: ProductSupplier[];

    constructor(
        name: string,
        contactInfo: string,
        id?: number,
        productSuppliers?: ProductSupplier[],
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.id = id;
        this.name = name;
        this.contactInfo = contactInfo;
        this.productSuppliers = productSuppliers;
    }
}
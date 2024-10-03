import { BaseEntity } from "./BaseEntity";

export class Discount extends BaseEntity {
    id?: number;
    code: string;
    description: string;
    discountPercentage: number;
    validFrom: Date;
    validTo: Date;

    constructor(
        code: string,
        description: string,
        discountPercentage: number,
        validFrom: Date,
        validTo: Date,
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.code = code;
        this.description = description;
        this.discountPercentage = discountPercentage;
        this.validFrom = validFrom;
        this.validTo = validTo;
    }
}
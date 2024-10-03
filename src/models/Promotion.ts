import { BaseEntity } from "./BaseEntity";

export class Promotion extends BaseEntity {
    id?: number;
    code: string;
    description: string;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;

    constructor(
        code: string,
        description: string,
        discountPercentage: number,
        startDate: Date,
        endDate: Date,
        id?: number,
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.id = id;
        this.code = code;
        this.description = description;
        this.discountPercentage = discountPercentage;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
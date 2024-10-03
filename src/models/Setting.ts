import { BaseEntity } from "./BaseEntity";

export class Setting extends BaseEntity {
    id?: number;
    key: string;
    value: string;

    constructor(
        key: string,
        value: string,
        id?: number,
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.id = id;
        this.key = key;
        this.value = value;
    }
}
import { BaseEntity } from "./BaseEntity";
import { ReturnStatus } from "./Enums";

export class Return extends BaseEntity {
    id?: number;
    orderId: number;
    returnDate: Date;
    reason?: string;
    status: ReturnStatus;

    constructor(
        orderId: number,
        returnDate: Date,
        status: ReturnStatus,
        reason?: string,
        id?: number,
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.id = id;
        this.orderId = orderId;
        this.returnDate = returnDate;
        this.reason = reason;
        this.status = status;
    }
}
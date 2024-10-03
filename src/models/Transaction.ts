import { BaseEntity } from "./BaseEntity";
import { Order } from "./Order";

export enum TransactionStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED',
    REFUNDED = 'REFUNDED',
    PROCESSING = 'PROCESSING'
}

export class Transaction extends BaseEntity {
    id?: number;
    order: Order;
    transactionDate: Date;
    amount: number;
    status: TransactionStatus;

    constructor(
        order: Order,
        transactionDate: Date,
        amount: number,
        status: TransactionStatus,
        id?: number,
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.id = id;
        this.order = order;
        this.transactionDate = transactionDate;
        this.amount = amount;
        this.status = status;
    }
}
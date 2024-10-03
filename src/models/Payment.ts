import { BaseEntity } from "./BaseEntity";
import { Order } from "./Order";

export class Payment extends BaseEntity {
    id?: number;
    order: Order;
    paymentDate: Date = new Date();
    amount: number;
    paymentMethod: string;
    status: PaymentStatus;

    constructor(
        order: Order,
        amount: number,
        paymentMethod: string,
        status: PaymentStatus,
        id?: number
    ) {
        super();
        this.id = id;
        this.order = order;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.status = status;
    }
}

export enum PaymentStatus {
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    PENDING = 'PENDING'
}
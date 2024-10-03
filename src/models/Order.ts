import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { OrderDetail } from "./OrderDetail";
import { Payment } from "./Payment";
import { Shipping } from "./Shipping";
import { Return } from "./Return";

export class Order extends BaseEntity {
    id?: number;
    user: User;
    status: OrderStatus;
    orderDate: Date;
    totalAmount: number;
    shippingAddress: string;
    paymentMethod: string;
    orderDetails: OrderDetail[];
    payments: Payment[];
    shippings: Shipping[];
    returns: Return[];

    constructor(
        user: User,
        status: OrderStatus,
        totalAmount: number,
        shippingAddress: string,
        paymentMethod: string,
        orderDate: Date = new Date(),
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.user = user;
        this.status = status;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.shippingAddress = shippingAddress;
        this.paymentMethod = paymentMethod;
        this.orderDetails = [];
        this.payments = [];
        this.shippings = [];
        this.returns = [];
    }
}

export enum OrderStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    RESOLVED = 'RESOLVED',
    CLOSED = 'CLOSED'
}
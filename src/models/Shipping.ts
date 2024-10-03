import { BaseEntity } from "./BaseEntity";
import { Order } from "./Order";
import { ShippingMethod } from "./ShippingMethod";

export enum ShippingStatus {
    SHIPPED = 'SHIPPED',
    IN_TRANSIT = 'IN_TRANSIT',
    DELIVERED = 'DELIVERED',
    RETURNED = 'RETURNED'
}

export class Shipping extends BaseEntity {
    id?: number;
    order: Order;
    shippingMethod: ShippingMethod;
    shippingDate?: Date;
    trackingNumber?: string;
    carrier?: string;
    status: ShippingStatus;

    constructor(
        order: Order,
        shippingMethod: ShippingMethod,
        status: ShippingStatus,
        id?: number,
        shippingDate?: Date,
        trackingNumber?: string,
        carrier?: string,
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.id = id;
        this.order = order;
        this.shippingMethod = shippingMethod;
        this.shippingDate = shippingDate;
        this.trackingNumber = trackingNumber;
        this.carrier = carrier;
        this.status = status;
    }
}
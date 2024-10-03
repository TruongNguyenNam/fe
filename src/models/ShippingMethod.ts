import { BaseEntity } from "./BaseEntity";
import { Shipping } from "./Shipping";

export class ShippingMethod extends BaseEntity {
    id?: number;
    name: string;
    description?: string;
    cost: number;
    shipping?: Shipping[];

    constructor(
        name: string,
        cost: number,
        id?: number,
        description?: string,
        shipping?: Shipping[]
    ) {
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.shipping = shipping;
    }
}
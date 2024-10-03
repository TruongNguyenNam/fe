import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

export class Address extends BaseEntity {
    id?: number;
    user: User;
    address: string;

    constructor(user: User, address: string) {
        super();
        this.user = user;
        this.address = address;
    }
}
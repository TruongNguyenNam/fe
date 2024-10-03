import { BaseEntity } from "./BaseEntity";
import { Order } from "./Order";
import { Review } from "./Review";
import { Cart } from "./Cart";
import { Wishlist } from "./Wishlist";
import { ActivityLog } from "./ActivityLog";
import { Notification } from "./Notification";
import { Address } from "./Address";
import { CustomerService } from "./CustomerService";
import { Blog } from "./Blog";
import { Reward } from "./Reward";

export enum Role {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
    EMPLOYEE = 'EMPLOYEE'
}

export class User extends BaseEntity {
    id?: number;
    username: string;
    password: string;
    email: string;
    phone?: string;
    address?: string;
    role: Role;
    deleted: boolean;
    orders?: Order[];
    reviews?: Review[];
    carts?: Cart[];
    wishlists?: Wishlist[];
    activityLogs?: ActivityLog[];
    notifications?: Notification[];
    addresses?: Address[];
    customerServices?: CustomerService[];
    blogs?: Blog[];
    rewards?: Reward[];

    constructor(
        username: string,
        password: string,
        email: string,
        role: Role,
        deleted: boolean = false,
        phone?: string,
        address?: string,
        id?: number,
        orders?: Order[],
        reviews?: Review[],
        carts?: Cart[],
        wishlists?: Wishlist[],
        activityLogs?: ActivityLog[],
        notifications?: Notification[],
        addresses?: Address[],
        customerServices?: CustomerService[],
        blogs?: Blog[],
        rewards?: Reward[],
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.role = role;
        this.deleted = deleted;
        this.orders = orders;
        this.reviews = reviews;
        this.carts = carts;
        this.wishlists = wishlists;
        this.activityLogs = activityLogs;
        this.notifications = notifications;
        this.addresses = addresses;
        this.customerServices = customerServices;
        this.blogs = blogs;
        this.rewards = rewards;
    }
}

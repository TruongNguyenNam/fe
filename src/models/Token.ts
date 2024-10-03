import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

export enum TokenType {
    REFRESH_TOKEN = 'REFRESH_TOKEN',
    REGISTER = 'REGISTER',
    FORGOT_PASSWORD = 'FORGOT_PASSWORD'
}

export class Token extends BaseEntity {
    id?: number;
    user: User;
    key: string;
    type: TokenType;
    expiredDate: Date;

    constructor(
        user: User,
        key: string,
        type: TokenType,
        expiredDate: Date,
        id?: number,
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.id = id;
        this.user = user;
        this.key = key;
        this.type = type;
        this.expiredDate = expiredDate;
    }
}
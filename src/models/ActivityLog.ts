import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

export class ActivityLog extends BaseEntity {
    id?: number;
    user: User;
    activity: string;

    constructor(
        user: User,
        activity: string,
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.user = user;
        this.activity = activity;
    }
}
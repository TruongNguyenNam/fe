import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

export class Reward extends BaseEntity {
    id?: number;
    user: User;
    points: number;
    earnedAt: Date;
    expiresAt: Date;
    isRedeemed: boolean;

    constructor(
        user: User,
        points: number,
        earnedAt: Date,
        expiresAt: Date,
        isRedeemed: boolean,
        id?: number,
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.id = id;
        this.user = user;
        this.points = points;
        this.earnedAt = earnedAt;
        this.expiresAt = expiresAt;
        this.isRedeemed = isRedeemed;
    }
}
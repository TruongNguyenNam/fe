import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

export enum NotificationStatus {
  UNREAD = 'UNREAD',
  READ = 'READ'
}

export class Notification extends BaseEntity {
  id?: number;
  user: User;
  message?: string;
  status: NotificationStatus;

  constructor(
    user: User,
    message?: string,
    status: NotificationStatus = NotificationStatus.UNREAD,
    createdBy?: number,
    createdDate?: Date,
    lastModifiedBy?: number,
    lastModifiedDate?: Date
  ) {
    super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
    this.user = user;
    this.message = message;
    this.status = status;
  }
}
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

export enum CustomerServiceStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}

export class CustomerService extends BaseEntity {
  id?: number;
  user: User;
  requestDate: Date;
  issue?: string;
  status: CustomerServiceStatus;

  constructor(
    user: User,
    requestDate: Date = new Date(),
    issue?: string,
    status: CustomerServiceStatus = CustomerServiceStatus.OPEN,
    createdBy?: number,
    createdDate?: Date,
    lastModifiedBy?: number,
    lastModifiedDate?: Date
  ) {
    super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
    this.user = user;
    this.requestDate = requestDate;
    this.issue = issue;
    this.status = status;
  }
}
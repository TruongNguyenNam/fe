export abstract class BaseEntity {
    createdBy?: number;
    createdDate?: Date;
    lastModifiedBy?: number;
    lastModifiedDate?: Date;
    
    constructor(
    createdBy?: number,
    createdDate?: Date,
    lastModifiedBy?: number,
    lastModifiedDate?: Date
    ) {
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.lastModifiedBy = lastModifiedBy;
    this.lastModifiedDate = lastModifiedDate;
    }
    }
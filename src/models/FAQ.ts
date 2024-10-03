import { BaseEntity } from "./BaseEntity";

export class FAQ extends BaseEntity {
    id?: number;
    question: string;
    answer: string;

    constructor(
        id?: number,
        question?: string,
        answer?: string,
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.id = id;
        this.question = question || '';
        this.answer = answer || '';
    }
}
import { BaseEntity } from "./BaseEntity";
import { CampaignProduct } from "./CampaignProduct";

export class Campaign extends BaseEntity {
    id?: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    campaignProducts: CampaignProduct[];

    constructor(
        name: string,
        description: string,
        startDate: Date,
        endDate: Date,
        campaignProducts: CampaignProduct[] = [],
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.campaignProducts = campaignProducts;
    }
}
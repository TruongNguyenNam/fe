import { BaseEntity } from "./BaseEntity";
import { Campaign } from "./Campaign";
import { Product } from "./Product";

export class CampaignProduct extends BaseEntity {
    id?: number;
    campaign: Campaign;
    product: Product;
    discountPercentage: number;

    constructor(
        campaign: Campaign,
        product: Product,
        discountPercentage: number,
        createdBy?: number,
        createdDate?: Date,
        lastModifiedBy?: number,
        lastModifiedDate?: Date
    ) {
        super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
        this.campaign = campaign;
        this.product = product;
        this.discountPercentage = discountPercentage;
    }
}
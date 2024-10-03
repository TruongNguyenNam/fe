import { BaseEntity } from "./BaseEntity";
import { Product } from "./Product";

export class ProductImage extends BaseEntity {
    id?: number;
    product: Product;
    imageUrl: string;
  
    constructor(
      product: Product,
      imageUrl: string,
      createdBy?: number,
      createdDate?: Date,
      lastModifiedBy?: number,
      lastModifiedDate?: Date
    ) {
      super(createdBy, createdDate, lastModifiedBy, lastModifiedDate);
      this.product = product;
      this.imageUrl = imageUrl;
    }
}
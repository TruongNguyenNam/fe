import { BaseEntity } from "./BaseEntity";
import { Category } from "./Category";
import { Brand } from "./Brand";
import { Size } from "./Size";
import { Color } from "./Color";
import { OrderDetail } from "./OrderDetail";
import { Cart } from "./Cart";
import { Review } from "./Review";
import { ProductImage } from "./ProductImage";
import { ProductTag } from "./ProductTag";
import { CampaignProduct } from "./CampaignProduct";
import { Inventory } from "./Inventory";
import { ReturnDetail } from "./ReturnDetail";
import { ProductSupplier } from "./ProductSupplier";

export class Product extends BaseEntity {
    id?: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: Category;
    brand: Brand;
    size: Size;
    color: Color;
    orderDetails: OrderDetail[];
    carts: Cart[];
    reviews: Review[];
    images: ProductImage[];
    tags: ProductTag[];
    campaignProducts: CampaignProduct[];
    inventories: Inventory[];
    returnDetails: ReturnDetail[];
    productSuppliers: ProductSupplier[];

    constructor(
        name: string,
        description: string,
        price: number,
        stock: number,
        category: Category,
        brand: Brand,
        size: Size,
        color: Color
    ) {
        super();
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.brand = brand;
        this.size = size;
        this.color = color;
        this.orderDetails = [];
        this.carts = [];
        this.reviews = [];
        this.images = [];
        this.tags = [];
        this.campaignProducts = [];
        this.inventories = [];
        this.returnDetails = [];
        this.productSuppliers = [];
    }
}
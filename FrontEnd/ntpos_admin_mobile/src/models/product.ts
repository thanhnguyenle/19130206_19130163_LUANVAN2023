import { Category } from "./categorys";

export interface Product {
    id: string;
    name: string;
    description: string;
    images: [url: string];
    categories: Category[];
    quantity: string;
    price: string;
    unit: string;
    status: string,
}
import { Category } from "./category";

export interface Product {
    id: string;
    name: string;
    description: string;
    images: [url: string];
    categories: Category[];
    quantity: string;
    price: number;
    unit: string;
    status: string,
}

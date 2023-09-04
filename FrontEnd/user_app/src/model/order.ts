export interface Order {
    id: string;
    userID: string;
    group: string;
    orderDate: number;
    status: string;
    note: string;
    orderLineItems: OrderLineItem[];
    tables: OrderTable[];
}

export interface OrderLineItem {
    productID: string;
    quantity: number;
    name: string,
    price: number;
    discount: number;
}

export interface OrderTable {
    tableID: string;
    note: string;
    name:string;
    status: string;
    startTime: number;
    endTime: number;
}

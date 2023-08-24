export  interface Order {
    id: string;
    userID: string;
    group: string;
    orderDate: number;
    status: string;
    note: string;
    orderLineItems: OrderLineItem[];
    tables:OrderTable [];
}
export  type OrderTable ={
    tableID: string;
    name: string;
    note: string;
    status: string;
    startTime: number;
    endTime: number;
}
export type OrderLineItem = {
    productID: string;
    name: string;
    quantity: number;
    price: number;
    discount: number;
}

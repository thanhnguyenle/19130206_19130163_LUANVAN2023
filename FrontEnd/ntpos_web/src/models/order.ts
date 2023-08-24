interface Order {
    id: string;
    userID: string;
    group: string;
    orderDate: number;
    status: string;
    note: string;
    orderLineItems: OrderLineItem[];
    tables: OrderTable[];
}
interface OrderTable {
    tableID: string;
    note: string;
    status: string;
    startTime: string;
    endTime: string;
}
interface OrderLineItem {
    productID: string;
    quantity: number;
    price: number;
    discount: number;
}

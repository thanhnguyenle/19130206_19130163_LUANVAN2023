interface Order {
    id: string;
    userID: string;
    group: string;
    orderDate: string;
    status: string;
    note: string;
    orderLineItems: OrderLineItem[];
    tables: OrderTable[];
}

interface OrderLineItem {
    productID: string;
    quantity: number;
    price: number;
    discount: number;
}

interface OrderTable {
    tableID: string;
    note: string;
    status: string;
    startTime: string;
    endTime: string;
}
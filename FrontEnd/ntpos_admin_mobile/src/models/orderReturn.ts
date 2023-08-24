import { OrderLineItem, OrderTable } from "./order";

export  interface OrderReturn {
  id: string;
  userID: string;
  orderID: string;
  group: string;
  orderReturnDate: number;
  status: string;
  note: string;
  orderLineItemsReturn: OrderLineItem[];
  tablesReturn:OrderTable [];
}

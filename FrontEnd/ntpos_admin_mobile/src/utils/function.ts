import { OrderLineItem } from "../models/order";

export function generateFourDigitCode(number: number): string {
  if (Number.isNaN(number) || number < 0 || number > 9999) {
    throw new Error("Input number must be between 0 and 9999");
  }
  return number.toString().padStart(4, "0");
}
export function formatDateFromNumber(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}
export function calculateTotalPrice(orderLineItems: OrderLineItem[]): number {
  let totalPrice = 0;
  for (const item of orderLineItems) {
    totalPrice += item.price * item.quantity;
  }
  return totalPrice;
}
export function calculateQuality(orderLineItems: OrderLineItem[]): number {
  let totalQuality = 0;
  for (const item of orderLineItems) {
    totalQuality += item.quantity;
  }
  return totalQuality;
}
export  function shortenOrderID(orderID: string): string {
  return orderID.substring(0, 6) + '...';
}

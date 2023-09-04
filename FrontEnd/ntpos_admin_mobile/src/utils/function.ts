import { OrderLineItem } from "../models/order";
import moment from "moment";

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
export function formatDateFromNumberHour(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year} `;
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
export  function convertDateToTimestampInSeconds(dateString:string) {
  const dateMoment = moment(dateString);
  const timestampInSeconds =dateMoment.valueOf() / 1000; // Chia cho 1000 để lấy giây và sử dụng Math.floor để làm tròn xuống
  return timestampInSeconds.toString();
}
export function isValidDate(dateString: string) {
  const pattern = /^\d{4}-\d{2}-\d{2}$/; // Định dạng yyyy-mm-dd
  if (!pattern.test(dateString)) {
    return false; // Không khớp với định dạng
  }

  const parts = dateString.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return false; // Không phải số
  }

  if (year < 1000 || year > 9999 || month === 0 || month > 12) {
    return false; // Giá trị không hợp lệ
  }

  const daysInMonth = new Date(year, month, 0).getDate();
  if (day === 0 || day > daysInMonth) {
    return false; // Ngày không hợp lệ
  }

  return true; // Tất cả điều kiện hợp lệ
}
export const formatPrice = (price: number): string => {
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

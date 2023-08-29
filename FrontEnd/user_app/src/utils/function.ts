import {CartItem} from "../views/ProductDetail";

export const calculateTotalPrice = (cartItems: CartItem[]): number => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};
export const calculateTotalQuantity = (cartItems: CartItem[]): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
};
export const formatPrice = (price: number): string => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
export function formatDateFromNumber(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
}
export  function shortenOrderID(orderID: string): string {
    return orderID.substring(0, 6) + '...';
}
export function stringStatus(status: string) {
    if (status === 'PAYMENT') {
        return 'Đã hoàn thành';
    } else if (status === 'CREATED') {
        return 'Chưa hoàn thành';
    } else if (status === 'CANCER') {
        return 'Đã hủy';
    }
    return '';
}
export function colorStatus(status: string) {
    if (status === 'PAYMENT') {
        return 'green';
    } else if (status === 'CREATED') {
        return '#f5c542';
    } else if (status === 'CANCER') {
        return 'red';
    }
    return '';
}

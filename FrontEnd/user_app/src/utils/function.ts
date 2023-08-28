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


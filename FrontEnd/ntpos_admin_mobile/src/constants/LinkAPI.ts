// export const linkLogin = 'http://localhost:8080/auth-service/login';
// export const linkRegister = 'http://localhost:8080/auth-service/register'
// export const clientUri = 'http://localhost:8082/user-service/graphql'
// https://5489-27-65-196-160.ngrok-free.app/
const context = 'http://20.24.122.61'
export const linkLogin = context + '/auth-service/login';
export const linkRegister = context + '/auth-service/register';
export const linkMe = context + '/auth-service/me'
export const clientUri = context + '/user-service/graphql';
export const productUri = context + '/product-service/graphql';
export const orderUri = context + '/order-service/graphql';
export const paymentUri = context + '/payment-service/graphql';
export const inventoryUri = context + '/inventory-service/graphql';
export const linkImage = 'https://4cb1-27-65-196-160.ngrok-free.app/api/image/';

// export const linkLogin = 'http://localhost:8080/auth-service/login';
// export const linkRegister = 'http://localhost:8080/auth-service/register'
// export const clientUri = 'http://localhost:8082/user-service/graphql'
// https://5489-27-65-196-160.ngrok-free.app/ 
const context = 'https://5489-27-65-196-160.ngrok-free.app'
export const linkLogin = context + '/auth-service/login';
export const linkRegister = context + '/auth-service/register'
export const clientUri = context + '/user-service/graphql';
export const productUri = context + '/product-service/graphql'
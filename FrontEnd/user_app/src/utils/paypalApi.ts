let baseUrl = 'https://api-m.sandbox.paypal.com';
const base64 = require('base-64');
let clientId = 'AUd2tOjhRzM4tSskE-hVT6dyMZDyktRblhVZEo8FKPJbNW1pEUigy9D1rKE_HbHuSPoi7F_wQS4ldMmm';
let secretKey = 'EKrx8Tw51Mzdaf4onpeGRgGq1W67k8K3NwNkGbjqKm9SrJhh3rSpZOrGNx9CbAyLmwD82q4ADK0o9cUS';
let orderDetail = {
    "intent": "CAPTURE",
    "purchase_units": [
        {
            "items": [
                {
                    "name": "T-Shirt",
                    "description": "Green XL",
                    "quantity": "1",
                    "unit_amount": {
                        "currency_code": "USD",
                        "value": "100.00"
                    }
                }
            ],
            "amount": {
                "currency_code": "USD",
                "value": "100.00",
                "breakdown": {
                    "item_total": {
                        "currency_code": "USD",
                        "value": "100.00"
                    }
                }
            }
        }
    ],
    "application_context": {
        "return_url": "https://example.com/return",
        "cancel_url": "https://example.com/cancel"
    }
}
const generateToken = () => {
  var headers = new Headers();
  headers.append("Content-Type","application/x-www-form-urlencoded");
  headers.append("Authorization","Basic "+ base64.encode(`${clientId}:${secretKey}`));
  var requestOptions  = {
    method : 'POST',
    headers: headers,
    body : 'grant_type=client_credentials'
  }
  return new Promise((resolve, reject) => {
    fetch(baseUrl + '/v1/oauth2/token', requestOptions).then(response => response.text()).then(result =>{
       console.log("result print", result);
       const {access_token} = JSON.parse(result);
       resolve(access_token);
    }).catch(error => {
      console.log('error raised', error);
      reject(error);
    })
  });
}
const createOrder = (token='') => {
  var requestOptions  = {
    method : 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body : JSON.stringify(orderDetail)
  }
  return new Promise((resolve, reject) => {
    fetch(baseUrl + '/v2/checkout/orders', requestOptions).then(response => response.text()).then(result =>{
      console.log("result print", result);
      const res = JSON.parse(result);
      resolve(res);
    }).catch(error => {
      console.log('error raised', error);
      reject(error);
    })
  });
}
const capturePayment = (id:string,token='') => {
  var requestOptions  = {
    method : 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }
  return new Promise((resolve, reject) => {
    fetch(baseUrl + `v2/checkout/orders/${id}/capture`, requestOptions).then(
      response =>response.text()
      ).then(result =>{
      console.log("result print", result);
      const res = JSON.parse(result);
      resolve(res);
    }).catch(error => {
      console.log('error raised', error);
      reject(error);
    });
  });
}
export default {
  capturePayment,
  generateToken,
  createOrder
}



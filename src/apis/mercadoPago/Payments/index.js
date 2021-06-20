
import { configPaymentInfo } from './payments'

export default class Payments {
    static getPayments() {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/V1/payments`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
        })
            .then(response => {
                console.log(response.json())
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    };
    
    static getPaymentsMethods() {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/v1/payment_methods`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
        })
            .then(response => {
                console.log(response.json())
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    }
    
    static createPayments(card) {
        let payment_info = configPaymentInfo(card)
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/v1/payments`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
            body: payment_info
        })
            .then(response => {
                console.log(response.json())
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    
    }
    
    static getPayments (card) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/V1/payments/search?sort=${card.date_created}&criteria=desc&external_reference=${card._id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
        })
            .then(response => {
                console.log(response.json())
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    }
}

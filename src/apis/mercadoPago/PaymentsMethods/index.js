export default class PaymentsMethods {
    async get() {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/v1/payment_methods`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
        })
            .then(response => {
                console.log(response.json());
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    }
}
export default class ChargeBack {
    async get (id) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/V1/chargebacks/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    }
}
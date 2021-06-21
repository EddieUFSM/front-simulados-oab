export default class Preapproval {
    async create (auto_recurring) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/preapproval`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
            body: auto_recurring
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                return err;
            });
    }
}
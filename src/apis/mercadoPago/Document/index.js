export default class Document {
    async get () {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/V1/identification_types`, {
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
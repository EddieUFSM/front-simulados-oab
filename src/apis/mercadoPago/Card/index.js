export default class Card {
    async create (customer_id, card_token) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/V1/customers/${customer_id}/cards`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
            body: card_token
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    }

    async list (customer_id) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/V1/customers/${customer_id}/cards`, {
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
    async read (customer_id, id) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/V1/customers/${customer_id}/cards/${id}`, {
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

    async update (customer_id, id, card_token) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/V1/customers/${customer_id}/cards/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
            body: card_token
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    }

    async delete (customer_id, id) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/V1/customers/${customer_id}/cards/${id}`, {
            method: 'DELETE',
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


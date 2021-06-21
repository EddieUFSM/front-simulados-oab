export default class Customer {
    async create (custumer) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/V1/customers`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
            body: custumer
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    }

    async getByEmail (email) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/V1/customers/search?email=${email}`, {
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

    async getById (id) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/V1/customers/${id}`, {
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

    async update(id, customer) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/V1/customers/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
            body: customer
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    }
}


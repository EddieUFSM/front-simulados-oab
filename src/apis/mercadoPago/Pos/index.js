export default class Pos {
    async create (pos) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/pos`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
            body: pos
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                return err;
            });

    }

    async find (category, store_id,external_id, external_store_id) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/pos?external_id=${external_id}&external_store_id=${external_store_id}&store_id=${store_id}&category=${category}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                return err;
            });
    }

    async read (id) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/pos/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                return err;
            });
    }

    async update (id, pos) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/pos/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
            body: pos
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                return err;
            });
    }

    async delete (id) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/pos/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            }
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                return err;
            });
    }
}
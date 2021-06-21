export default class Instore {
    async create(external_store_id,user_id, order) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/instore/qr/${user_id}/${external_store_id}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
            body: order
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    }

    async update(external_pos_id,external_store_id,user_id, order) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/instore/qr/seller/collectors/${user_id}/stores/${external_store_id}/pos/${external_pos_id}/orders`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
            body: order
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    }

    async read(external_pos_id,user_id, order) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/instore/qr/seller/collectors/${user_id}/pos/${external_pos_id}/orders`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            }
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    }

    async delete(external_pos_id,user_id) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/instore/qr/seller/collectors/${user_id}/pos/${external_pos_id}/orders`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            }
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    }

    async remove(external_id,user_id) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/mpmobile/instore/qr/${user_id}/${external_id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            }
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    }
}
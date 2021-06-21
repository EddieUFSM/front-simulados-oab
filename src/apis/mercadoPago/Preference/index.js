
export default class Preference {
    async create (items) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/checkout/preferences`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
            body:items
        })
            .then(response => {
                console.log(response.json());
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    }
    async find (sponsor_id, external_reference, site_id,marketplace) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/checkout/preferences/search?sponsor_id=${sponsor_id}&external_reference=${external_reference}&site_id=${site_id}&marketplace=${marketplace}`, {
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
    async read (id) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/checkout/preferences/${id}`, {
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
    async update (id, items) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/checkout/preferences/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
            body: items
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    }
}
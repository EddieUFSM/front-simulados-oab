export default class Order {
    async create (order) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/merchant_orders`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
            body:order
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    }

    async update (order, id) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/merchant_orders/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
            body:order
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    }

    async read (id) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/merchant_orders/${id}`, {
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

    async search (
        status, 
        preference_id,
        application_id, 
        payer_id, 
        sponsor_id,
        external_reference,
        site_id,
        marketplace,
        date_created_from,
        date_created_to,
        last_updated_from,
        last_updated_to,
        items,
        limit,
        offset) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/merchant_orders/search?status=${status}&preference_id=${preference_id}&application_id=${application_id}&payer_id=${payer_id}&sponsor_id=${sponsor_id}&external_reference=${external_reference}&site_id=${site_id}&marketplace=${marketplace}&date_created_from=${date_created_from}&date_created_to=${date_created_to}&last_updated_from=${last_updated_from}&last_updated_to=${last_updated_to}&items=${items}&limit=${limit}&offset=${offset}`, {
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
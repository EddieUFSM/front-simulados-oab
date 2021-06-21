export default class Store {
    async create (store){
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/stores`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
            body: store
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
		
    }

    async read(id) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/stores/${id}`, {
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

    async searchById(user_id, id) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/users/${user_id}/stores/search?external_id=${id}`, {
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

    async put (store, id){
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/stores/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
            body: store
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
		
    }

    async delete(id) {
        return fetch(`${process.env.MERCADOPAGO_URL_BASE}/stores/${id}`, {
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
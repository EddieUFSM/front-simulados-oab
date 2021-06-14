import { API } from 'config';


export const getListProductsCard = (token, currentShoppingCard) => {
    return fetch(`${API}/card/listProductsCard/${currentShoppingCard}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });

};


export const addProduct = (userId, token, product) => {
    return fetch(`${API}/card/add/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ product: product })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};


export const getCard = (token, currentShoppingCard) => {
    return fetch(`${API}/Card/${currentShoppingCard}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });

};
import { API } from 'config';

export const createProduct = (userId, token, product) => {
    for (var pair of product.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const listProducts = (token) => {
    return fetch(`${API}/products`, {
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
        .catch(err => console.log(err));
};
export const readProduct = (token, idProduct) => {
    return fetch(`${API}/product/${idProduct}/Single`, {
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
        .catch(err => console.log(err));
};
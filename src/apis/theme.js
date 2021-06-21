import { API } from 'config';

export const createTheme = (userId, token, theme) => {
    return fetch(`${API}/theme/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(theme)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const listThemes = (token) => {
    return fetch(`${API}/themes`, {
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

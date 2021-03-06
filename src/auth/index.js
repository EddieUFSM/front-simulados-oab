
import { API } from 'config';

export const signup = (user) => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            if(err){
                return err.json();
            }
        });
};

export const signin = (user) => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const signout = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/signout`, {
            method: 'GET',
        }).then(response => {
            console.log('signout', response);
        })
            .catch(err => console.log(err));
    }
};

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    } if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};

export const isAdmin = () => {

    if (typeof window == 'undefined') {
        return false;
    } if (JSON.parse(localStorage.getItem('jwt')) === null) {
        return false;
    } if (JSON.parse(localStorage.getItem('jwt')).user.role === 1) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};

export const isPro = () => {
    if (typeof window == 'undefined') {
        return false;
    } if (JSON.parse(localStorage.getItem('jwt')) === null) {
        return false;
    } if (JSON.parse(localStorage.getItem('jwt')).user.roleSubscription === 1) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};

export const isFull = () => {
    if (typeof window == 'undefined') {
        return false;
    } if (JSON.parse(localStorage.getItem('jwt')) === null) {
        return false;
    } if (JSON.parse(localStorage.getItem('jwt')).user.roleSubscription === 2) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};
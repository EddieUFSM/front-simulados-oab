import { API } from 'config';

export const updateUser = (user, next) => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('jwt')) {
            let auth = JSON.parse(localStorage.getItem('jwt'));
            auth.user = user;
            localStorage.setItem('jwt', JSON.stringify(auth));
            next();
        }
    }
};
export const update = (userId, token, body) => {
    return fetch(`${API}/user/resetPassword/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const getAllUsers = (token) => {
    return fetch(`${API}/users`, {
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
export const deleteUser = (userId, token) => {
    return fetch(`${API}/user/delete/${userId}`, {
        method: 'DELETE',
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
export const editUser = (userId, token, user) => {
    return fetch(`${API}/user/edit/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
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

export const editProfilePhoto = (userId, token, photo) => {
    for (var pair of photo.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    return fetch(`${API}/user/edit/profile/photo/${userId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: photo
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
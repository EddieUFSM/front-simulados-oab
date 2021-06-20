import { API } from 'config';

export const getPiece = (token, pieceID) => {
    return fetch(`${API}/Piece/${pieceID}`, {
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
export const getAllPieces = (token) => {
    return fetch(`${API}/pieces`, {
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
        .catch(err => console.log(err));
};

export const createPiece = (userId, token, piece) => {
    return fetch(`${API}/piece/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(piece)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const deletePiece = (token, pieceId) => {
    return fetch(`${API}/piece/${pieceId}`, {
        method: 'delete',
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const editPiece = (token,idPiece, piece) => {
    return fetch(`${API}/piece/${idPiece}/edit`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(piece)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

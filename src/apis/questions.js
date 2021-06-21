import { API } from 'config';

export const createQuestion = (userId, token, question) => {
    return fetch(`${API}/question/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(question)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const deleteQuestion = (token, questionId) => {
    return fetch(`${API}/question/${questionId}`, {
        method: 'delete',
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const updateQuestion = (userId, token, question) => {
    return fetch(`${API}/question/${question._id}/edit`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(question)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const listQuestions = (token) => {
    return fetch(`${API}/questions`, {
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
export const readQuestion = (token, idQuestion) => {
    return fetch(`${API}/question/${idQuestion}/Single`, {
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
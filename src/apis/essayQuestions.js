import { API } from 'config';

export const createEssayQuestion = (userId, token, essayQuestion) => {
    return fetch(`${API}/essayQuestion/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(essayQuestion)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const updateEssayQuestion = (userId, token, essayQuestionId, essayQuestion) => {
    console.log(JSON.stringify(essayQuestion));
    return fetch(`${API}/essayQuestion/${essayQuestionId}/edit`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(essayQuestion)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const readEssayQuestion = (token, essayQuestionID) => {
    return fetch(`${API}/essayQuestion/${essayQuestionID}`, {
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
export const deleteEssayQuestion = (token, EssayQuestionId) => {
    return fetch(`${API}/EssayQuestion/${EssayQuestionId}`, {
        method: 'delete',
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listEssayQuestions = (token) => {
    return fetch(`${API}/essayquestions`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err));
};
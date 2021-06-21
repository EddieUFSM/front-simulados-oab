import { API } from 'config';

export const createExam = (userId, token, exam) => {
    return fetch(`${API}/exam/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(exam)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const listExams = (token) => {
    return fetch(`${API}/exams`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err));
};
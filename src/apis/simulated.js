import { API } from 'config';

export const createCustomSimulatedByDiscipline = (userId, token, simulated) => {
    return fetch(`${API}/simulated/create-simulated-by-discipline/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(simulated)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const createSimulatedByExam = (userId, token, simulated) => {
    return fetch(`${API}/simulated/create-simulated-by-exam/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(simulated)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const endSimulated = (userId, token, simulatedId, reportId, simulated) => {
    console.log(reportId);
    return fetch(`${API}/simulated/${simulatedId}/endGame/${userId}/${reportId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(simulated)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const getSimulated = (token, simulatedId) => {
    return fetch(`${API}/simulated/${simulatedId}`, {
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
export const getPoints = (userId, token, simulatedId) => {
    return fetch(`${API}/simulated/${simulatedId}/points/${userId}`, {
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
export const saveSimulated = (userId, token, simulatedId, simulated) => {
    return fetch(`${API}/simulated/${simulatedId}/save/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(simulated)
    })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

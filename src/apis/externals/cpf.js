export const getAddressFromPostalCode = (cep) => {
    return fetch(`https://viacep.com.br/ws/${cep}/json`, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};
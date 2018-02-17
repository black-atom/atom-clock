const axios = require('axios');

const urlApi = cnpjCpf => `http://165.227.78.113:3000/api/clientes/${cnpjCpf}`;

const headers = Authorization => ({ 'Content-Type': 'application/json', Authorization });
const companyRequest = cnpjCpf => token => axios.get(urlApi(cnpjCpf), { headers: headers(token) })
  .then(response => response.data)
  .catch(error => error.response.data);

module.exports = {
  companyRequest,
};

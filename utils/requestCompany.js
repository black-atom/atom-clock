const axios = require('axios');

const urlApi = cnpjCpf => `http://165.227.78.113:3000/api/clientes?skip=0&limit=1&search=%7B%22cnpj_cpf%${cnpjCpf}%22%7D`;

const headers = token => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` });
const companyRequest = cnpjCpf => token => axios.get(urlApi(cnpjCpf), headers(token));

module.exports = {
  companyRequest,
};

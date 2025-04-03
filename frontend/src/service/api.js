import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // URL base do backend
  timeout: 10000, // Timeout de 10 segundos
  headers: {
    'Content-Type': 'application/json', // Tipo de conteúdo padrão
  },
});

export default api;

# Use uma imagem base oficial do Node.js
FROM node:16

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o arquivo package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Exponha a porta usada pelo backend (exemplo: 5000)
EXPOSE 5000

# Comando para iniciar o backend
CMD ["npm", "run", "dev"]

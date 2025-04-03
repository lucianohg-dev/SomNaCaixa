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

# Exponha a porta usada pelo frontend (exemplo: 3000)
EXPOSE 3000

# Comando para iniciar o servidor de desenvolvimento do React
CMD ["npm", "start"]

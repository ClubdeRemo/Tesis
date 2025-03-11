# Usa una imagen oficial de Node.js
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el package.json y el package-lock.json
COPY ./Backend/package.json ./Backend/package-lock.json

# Instala las dependencias de tu backend
RUN npm install

# Copia el resto de los archivos de tu backend
COPY Backend/ .

# Compila el proyecto (si es necesario)
RUN npm run build

# Expone el puerto en el que tu servidor escuchará
EXPOSE 3000

# Comando para iniciar el backend
CMD ["npm", "run", "start"]

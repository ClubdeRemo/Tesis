# Usa una imagen oficial de Node.js
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el package.json y el package-lock.json desde Backend a la raíz del contenedor
COPY Backend/package.json Backend/package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del backend
COPY Backend/ .

# Compila el proyecto (si es necesario)
RUN npm run build

# Expone el puerto en el que el backend escuchará
EXPOSE 3000

# Comando para iniciar el backend
CMD ["npm", "run", "start"]

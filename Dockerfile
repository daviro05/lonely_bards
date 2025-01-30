FROM node:20-alpine

WORKDIR /src/app

# Copia los archivos de dependencia y luego instala
COPY package.json /src/app/
COPY package-lock.json /src/app/

RUN npm install

# Instala Angular CLI localmente si no está en `package.json`
RUN npm install @angular/cli

# Copia el resto de los archivos del proyecto
COPY . /src/app

# Construye la aplicación Angular
RUN npm run build

# Cambia el comando para asegurarte de ejecutar el ng local
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]


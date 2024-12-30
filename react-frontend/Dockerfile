# Utilisez une image Node.js pour le build
FROM node:16 as build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers nécessaires dans le conteneur
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Construire l'application
RUN npm run build

# Utiliser une image Nginx pour servir l'application
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80 pour Nginx
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]

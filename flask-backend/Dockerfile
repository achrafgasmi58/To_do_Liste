# Utilisez une image Python officielle
FROM python:3.9-slim

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers nécessaires dans le conteneur
COPY requirements.txt requirements.txt
COPY . .

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Exposer le port Flask
EXPOSE 5000

# Commande pour lancer l'application
CMD ["flask", "run", "--host=0.0.0.0"]

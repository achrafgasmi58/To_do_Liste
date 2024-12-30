# To-Do List Application

Cette application est une solution complète pour gérer vos tâches quotidiennes. Elle inclut un frontend moderne avec React et un backend robuste avec Flask, ainsi qu'une base de données PostgreSQL.

---

## Fonctionnalités

- Ajouter, modifier, supprimer et marquer les tâches comme terminées.
- Filtrer les tâches par titre, catégorie ou statut.
- Afficher des statistiques graphiques sur les tâches.
- Thème clair/sombre pour une meilleure expérience utilisateur.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

### Pour une installation avec Docker :
- **[Docker Desktop](https://www.docker.com/products/docker-desktop)**

### Pour une installation sans Docker :
- **Git** : [Télécharger Git](https://git-scm.com/downloads)
- **Node.js** (16+) et **npm** : [Télécharger Node.js](https://nodejs.org/)
- **Python** (3.9+) : [Télécharger Python](https://www.python.org/)

---

## Installation avec Docker

### **1. Cloner le projet**
Clonez ce dépôt Git sur votre machine locale :
```bash
git clone https://github.com/achrafgasmi58/To_do_Liste.git
cd To_do_Liste
```

---

### **2. Lancer l'application avec Docker**
Dans le répertoire racine du projet, exécutez la commande suivante pour construire et démarrer les services Docker :
```bash
docker-compose up --build
```

---

### **3. Accéder à l'application**
Une fois les conteneurs démarrés, accédez aux différents services :

- **Frontend (React)** : [http://localhost:3000](http://localhost:3000)
- **Backend (API Flask)** : [http://localhost:5000](http://localhost:5000)

---

## Installation sans Docker

### **1. Cloner le projet**
Clonez ce dépôt Git sur votre machine locale :
```bash
git clone https://github.com/achrafgasmi58/To_do_Liste.git
cd To_do_Liste
```

---

### **2. Installation et exécution du Backend (Flask)**

1. Naviguez vers le dossier `flask-backend` :
   ```bash
   cd flask-backend
   ```

2. Créez un environnement virtuel et activez-le :
   ```bash
   python -m venv venv
   source venv/bin/activate  # Sur Windows : venv\Scripts\activate
   ```

3. Installez les dépendances Python :
   ```bash
   pip install -r requirements.txt
   ```

4. Configurez PostgreSQL (localement ou avec Docker) :
   Si vous utilisez Docker pour PostgreSQL, lancez la commande suivante :
   ```bash
   docker run --name postgres-todo -e POSTGRES_USER=achraf -e POSTGRES_PASSWORD=Pearlexport58 -e POSTGRES_DB=todo_db -p 5433:5432 -d postgres
   ```

5. Lancez le serveur Flask :
   ```bash
   flask run --host=0.0.0.0
   ```

6. Le backend est accessible à l'adresse : [http://localhost:5000](http://localhost:5000).

---

### **3. Installation et exécution du Frontend (React)**

1. Naviguez vers le dossier `react-frontend` :
   ```bash
   cd ../react-frontend
   ```

2. Installez les dépendances Node.js :
   ```bash
   npm install
   ```

3. Lancez le serveur React :
   ```bash
   npm start
   ```

4. Le frontend est accessible à l'adresse : [http://localhost:3000](http://localhost:3000).

---

## Structure du projet

### **Frontend (React)** :
- **React** est utilisé pour construire une interface utilisateur moderne.
- **Principaux fichiers et dossiers** :
  - `src/components` : Contient tous les composants React (TaskList, TaskForm, StatsDashboard).
  - `src/services/api.js` : Définit les appels API vers le backend Flask.
  - `Dockerfile` : Configure le conteneur Docker pour l'application React.

---

### **Backend (Flask)** :
- **Flask** sert d'API backend, connectée à PostgreSQL pour gérer les données.
- **Principaux fichiers et dossiers** :
  - `app/routes` : Contient les routes de l'API (CRUD pour les tâches).
  - `app/models.py` : Définit le modèle de base de données pour les tâches.
  - `Dockerfile` : Configure le conteneur Docker pour le backend Flask.

---

### **Base de données (PostgreSQL)** :
- PostgreSQL est exécuté dans un conteneur Docker.
- Les données sont persistées grâce à un volume Docker.

---

## Dépannage

1. **Erreur : "Docker Desktop non trouvé"** :
   - Vérifiez que Docker Desktop est installé et en cours d'exécution.

2. **Erreur : "Impossible de se connecter à PostgreSQL"** :
   - Assurez-vous que le conteneur PostgreSQL est démarré :
     ```bash
     docker ps
     ```
   - Le conteneur `postgres-todo` doit être listé.

3. **Problème d'affichage sur le frontend** :
   - Vérifiez que le backend est bien démarré et accessible sur [http://localhost:5000](http://localhost:5000).

4. **Erreur : "Module not found"** :
   - Assurez-vous d'avoir installé toutes les dépendances avec `npm install` pour le frontend et `pip install -r requirements.txt` pour le backend.

---

## Arrêter l'application

Pour arrêter les conteneurs Docker :
```bash
docker-compose down
```

---

## Contribution

Les contributions sont les bienvenues ! Pour signaler un problème ou proposer une amélioration, ouvrez une **issue** ou soumettez une **pull request**.






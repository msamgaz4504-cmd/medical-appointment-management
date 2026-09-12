# Gestion des rendez-vous d’un cabinet médical

Application web permettant aux patients de prendre et de gérer leurs rendez-vous médicaux, ainsi qu’à l’administrateur de superviser les réservations et les créneaux disponibles.

Ce projet a été réalisé dans un cadre académique à l’École Nationale des Sciences Appliquées de Safi.

## Fonctionnalités

### Espace patient

* Création d’un compte patient
* Authentification sécurisée
* Consultation des créneaux disponibles
* Prise d’un rendez-vous
* Consultation des rendez-vous réservés
* Annulation d’un rendez-vous
* Déconnexion

### Espace administrateur

* Authentification de l’administrateur
* Consultation de l’ensemble des rendez-vous
* Confirmation d’un rendez-vous
* Annulation d’un rendez-vous
* Consultation des statistiques

## Technologies utilisées

### Frontend

* React 19
* React Router
* Axios
* Vite
* CSS

### Backend

* Node.js
* Express
* MySQL2
* JSON Web Token
* bcrypt
* Cookie Parser
* CORS
* dotenv

### Base de données

* MySQL 8

## Structure du projet

```text
mini_projet/
├── backend/        # API Node.js et Express
│   ├── config/     # Configuration de la base de données
│   ├── routes/     # Routes d’authentification, de réservation et d’administration
│   └── server.js   # Point d’entrée du serveur
├── clinic-app/     # Interface React destinée aux patients
├── pageAdmin/      # Interface React destinée à l’administrateur
├── database/
│   ├── schema.sql  # Structure de la base de données
│   └── seed.sql    # Données fictives de démonstration
└── README.md
```

## Prérequis

Avant de lancer le projet, installez :

* Node.js 20 ou une version ultérieure
* npm
* MySQL 8

## Installation

### 1. Cloner le dépôt

```bash
git clone URL_DU_DEPOT
cd mini_projet
```

Remplacez `URL_DU_DEPOT` par l’adresse du dépôt GitHub.

### 2. Installer les dépendances du backend

```bash
cd backend
npm install
cd ..
```

### 3. Installer les dépendances de l’interface patient

```bash
cd clinic-app
npm install
cd ..
```

### 4. Installer les dépendances de l’interface administrateur

```bash
cd pageAdmin
npm install
cd ..
```

## Configuration des variables d’environnement

Copiez le fichier d’exemple :

```bash
cp backend/.env.example backend/.env
```

Sous Windows PowerShell :

```powershell
Copy-Item .\backend\.env.example .\backend\.env
```

Complétez ensuite `backend/.env` avec votre propre configuration :

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=reservation_app
JWT_SECRET=replace_with_a_long_random_secret
PORT=5002
CORS_ORIGINS=http://localhost:5174,http://localhost:5173
```

Le fichier `.env` contient des informations sensibles et ne doit jamais être publié sur GitHub.

## Initialisation de la base de données

Le dossier `database` contient :

* `schema.sql` : crée la base et les tables nécessaires ;
* `seed.sql` : ajoute uniquement des données fictives de démonstration.

Importez d’abord la structure :

```bash
mysql -u root -p < database/schema.sql
```

Vous pouvez ensuite ajouter les données fictives :

```bash
mysql -u root -p reservation_app < database/seed.sql
```

N’exécutez `seed.sql` que dans une base destinée aux tests ou à la démonstration.

## Lancement de l’application

L’application nécessite trois terminaux.

### Terminal 1 — Backend

```bash
cd backend
node server.js
```

Le backend est accessible sur :

```text
http://localhost:5002
```

### Terminal 2 — Interface patient

```bash
cd clinic-app
npm run dev -- --port 5173
```

L’interface patient est accessible sur :

```text
http://localhost:5173
```

### Terminal 3 — Interface administrateur

```bash
cd pageAdmin
npm run dev -- --port 5174
```

L’interface administrateur est accessible sur :

```text
http://localhost:5174
```

## Comptes fictifs

Après l’importation de `database/seed.sql`, les comptes suivants peuvent être utilisés.

### Patient

```text
E-mail : patient.demo@example.com
Mot de passe : PatientDemo2026!
```

### Administrateur

```text
E-mail : admin.demo@example.com
Mot de passe : AdminDemo2026!
```

Ces identifiants sont exclusivement destinés à la démonstration.

## Sécurité

* Les mots de passe sont hachés avec bcrypt.
* L’authentification utilise des JSON Web Tokens.
* Les paramètres MySQL et la clé JWT sont stockés dans `.env`.
* Le fichier `.env` est exclu du dépôt par `.gitignore`.
* Les données réelles de la base ne sont pas publiées.
* Le dépôt contient uniquement des données fictives de démonstration.

## Auteurs

* Maroua Oufik
* Meryem Samgaz

Projet réalisé à l’ENSA Safi sous l’encadrement de M. Othman Chahbouni.



<h1 align="center">    Architecture Microservices pour la Gestion des Tâches et des Employés   </h1>

Ce projet est un exemple d'implémentation de l'architecture par Microservices pour le cours d'Architecture Logicielle (A.L.) en 2ème année du cycle ingénieur.  
Il démontre la séparation des responsabilités (CRUD Employé / CRUD Tâche) avec une persistance cloud moderne via Google Firebase/Firestore.

---

## 🎯 Objectifs du Projet

- **Démonstration Microservices** : Séparer la logique métier en deux services distincts communiquant par API REST.  
- **Persistance NoSQL** : Utiliser Firebase Firestore comme solution de base de données cloud pour les deux backends.  
- **Expérience Utilisateur Moderne** : Fournir un front-end réactif développé avec Next.js et Shadcn UI.  
- **Conformité CORS** : Assurer la communication sécurisée entre les applications s'exécutant sur des ports différents.  

---

## 🏗️ Architecture Technique

Le projet est divisé en trois composants principaux :

### 1. Front-end (FE)

| Détail                 | Technologie / Port / Nom |
|------------------------|-------------------------|
| Framework              | Next.js (App Router)    |
| Interface Utilisateur  | Shadcn UI / Tailwind CSS|
| Logique de Fetch       | Axios (Requêtes directes aux microservices) |
| Fonctionnalités        | Gestion des états (Modals, Toasts) et rafraîchissement en temps réel |

### 2. Backends (Microservices Spring Boot)

Les deux services sont construits sur Spring Boot et utilisent le Firebase Admin SDK pour la persistance des données.

| Service         | Responsabilité                          | Port  | Base de Données |
|-----------------|----------------------------------------|-------|----------------|
| Employee Service| Gère le CRUD des employés               | 8082  | Firestore (Collection `employes`) |
| Task Service    | Gère le CRUD des tâches et l'assignation aux employés | 8081 | Firestore (Collection `taches`) |

---

## ⚙️ Configuration Requise et Installation

### Prérequis

- Java (JDK 21 ou supérieur)  
- Node.js (LTS) et npm  
- IntelliJ IDEA Ultimate (pour faciliter le développement Spring) ou VS Code  
- Compte Google/Firebase  

---

### 🗂️ 1. Configuration Firebase Firestore (Backend)

1. **Créer le Projet Firebase**  
   Accédez à la Console Firebase et créez un projet (ex: `projet-microservice-f4e3a`).  

2. **Activer Firestore**  
   Dans la section Build de la console, activez Firestore Database en mode *Start in test mode* (pour 30 jours, afin de simplifier le développement).  

3. **Créer les Collections**  
   Créez manuellement les collections `employes` et `taches` (vous pouvez y ajouter un document factice).  

4. **Télécharger la Clé Secrète**  
   - Allez dans *Project Settings* (Paramètres du projet) ⚙️ → *Service Accounts* (Comptes de service).  
   - Cliquez sur *Generate new private key* et téléchargez le fichier JSON.  
   - Renommez ce fichier : `firebase-service-account.json`.  
   - Placez-le dans le dossier `src/main/resources` des deux projets Spring Boot (`employee-service` et `task-service`).  

---

### 🖥️ 2. Démarrage des Microservices (Backend)

- **Service Tâches (8081)** : Exécutez la classe principale `TaskServiceApplication.java` dans IntelliJ.  
- **Service Employé (8082)** : Exécutez la classe principale `EmployeeServiceFirebaseApplication.java` dans IntelliJ.  

⚠️ Vérification : Si les services échouent, assurez-vous que les ports 8081 et 8082 sont libres.  


---

### 🧰 3. Captures Ecrans


|<img width="1906" height="937" alt="Screenshot 2025-12-02 230542" src="https://github.com/user-attachments/assets/9c91a09c-21a0-4a46-89f9-a797bde1ecef" />|<img width="1904" height="942" alt="Screenshot 2025-12-02 230553" src="https://github.com/user-attachments/assets/c14055d3-5182-47e5-9b07-82d6bc3a78da" />|<img width="1919" height="938" alt="Screenshot 2025-12-02 230612" src="https://github.com/user-attachments/assets/ff468f8b-581a-47ce-aff8-0d14346907a0" />|
|---------|---------|---------|

---

### 💻 4. Démarrage du Front-end (Next.js)

1. **Installation des Dépendances**  

```bash
npm install
npm run dev


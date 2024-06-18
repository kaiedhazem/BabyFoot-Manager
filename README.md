# BabyFoot Manager

![image](https://github.com/kaiedhazem/BabyFoot-Manager/assets/59137622/ae3187b0-c6af-4570-941b-95eb66f23c0c)


## Description
BabyFoot Manager est une application web de type RIA permettant de créer des parties de babyfoot. Sa
particularité sera de pouvoir créer des parties de manière collaborative.

## Fonctionnalités
- Gestion des parties BabyFoot ( ajout,suppression et marquer la fin des parties)
- Suivi des matchs
- Chat en temps rééls

## Technologies utilisées
- Frontend : HTML, CSS, JavaScript
- Backend : Node.js, Express.js
- Base de données : PostgreSQL

## Installation
Pour installer et exécuter localement le projet :

1. Clonez le dépôt : `git clone https://github.com/kaiedhazem/BabyFoot-Manager.git`
2. Naviguez dans le répertoire du projet : `cd BabyFoot-Manager`
3. Installez les dépendances : `npm install`
4. Installez pgAdmin 4
5. Créez une nouvelle base de données
6. Créez une table nommée parties avec la commande suivante: `CREATE TABLE parties (
  id SERIAL PRIMARY KEY,
  joueurs VARCHAR(255) NOT NULL,
  terminee BOOLEAN DEFAULT FALSE
);`
7. Lancez l'application : `npm start`

## Utilisation
Pour utiliser l'application :

- Créez et suivez vos matchs.
- Profitez de systèmes de chat en communiquant en temps réel avec les utilisateurs disponibles.

## Contribuer
Vous pouvez contribuer au projet en suivant ces étapes :

- Forkez le dépôt.
- Créez une nouvelle branche (`git checkout -b feature`)
- Effectuez vos modifications et committez-les (`git commit -am 'Ajouter une nouvelle fonctionnalité'`)
- Pushez les modifications sur la branche (`git push origin feature`)
- Créez une pull request.

## Contact
Pour toute question ou commentaire, vous pouvez me contacter à [gaiedhazem@gmail.com].

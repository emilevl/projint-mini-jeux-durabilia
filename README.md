# Projet d'intégration
Ce projet a été réalisé dans le cadre du projet d'intégration de 3e année du département COMEM+, HEIG-VD.

Il s'agit de 3 mini-jeux éducatifs qui s'implémentent dans un jeu de plateforme générale, où le joueur peut se balader parmis des transformers. En entrant dans un Transformer, il se retrouvera dans l'un des mini-jeux. Le but est de présenter les 17 objectifs de développement durable (ODD) des Nations Unies.

Dans chaque mini-jeu, des éléments similaires pourront être vus: 
- Une présentation des règles avec les ODD impactés par le mini-jeu. 
- Une cinématique permettant de présenter le mini-jeu

Ensuite, chaque mini-jeu aura son propre fonctionnement et son propre but.

## Jeu de cartes
Le jeu de cartes est un jeu éducatif et divertissant qui vise à sensibiliser aux 17 ODD de manière ludique et agréable. Les joueurs endossent le rôle de juge, prenant des décisions sur diverses situations et observant leur impact sur le monde.

### Type de jeu
Il s'agit d'un jeu interactif de prise de décision où les joueurs doivent faire des choix basés sur des situations présentées. Le jeu s'inspire des mécaniques de "Reigns" et est conçu pour être à la fois divertissant et éducatif, favorisant la sensibilisation aux 17 ODD.

### Déroulement du jeu

Le jeu consiste en une pioche de carte avec, sur chacune des cartes: 
- une situation définie
- une décision à prendre parmis les deux

Voici comment se déroule une partie : 
- A chaque fois que le joueur entre dans le jeu, 5 cartes sont tirées du deck principal.
- Chaque carte présente une situation liée à un ou plusieurs ODD, et le joueur doit prendre une décision en faisant glisser la carte vers la droite ou la gauche.
- Le joueur voit l'impact potentiel (par exemple, l'impact sur l'eau et l'aspect social) de sa décision, mais ne sait pas si cet impact sera positif ou négatif.
- Après avoir pris des décisions sur les 5 cartes, le joueur se voit présenter un tableau de bord qui montre les conséquences de ses choix (impacts positifs et négatifs).
- Le jeu peut être joué plusieurs fois, permettant aux joueurs d'en apprendre davantage sur les ODD et de comprendre les effets potentiels de différentes décisions.

### Technologies utilisées
L'application du jeu de cartes Transformer est construite en utilisant les technologies suivantes :

- Vue.js
- JSON
- CSS
- SVG
- Anime.js

### ODD impactés
Pour ce jeu, le temps est l'ODD impacté par défaut. Ensuite, les 17 SDG peuvent être impactés, en fonction des décisions prises. Il s'agit du seul mini-jeu où l'impact des SDG n'est pas fixe.


## STEP
...

### ODD impactés
...


## Scierie
Le jeu de la scierie est un jeu de plateforme rapide, addictif et offrant un petit challenge. Les joueurs se retrouvent dans une scierie où les machines sont hors de contrôle. Ils devront alors la traverser afin de couper le courant, en évitant sur leur passage les diverses scies et bûches.

### Technologies utilisées
L'application du jeu de la scierie est construite en utilisant le framework [Phaser 3](https://phaser.io).

### ODD impactés
Pour jouer à ce jeu, le joueur devra dépenser la ressource *Terradiversité*. Il recevra alors, en finissant le niveau, la ressource *Croissance* mais cela entraînera également une augmentation du *CO2*.

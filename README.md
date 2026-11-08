# Ma ToDo List

Une petite application de liste de tâches réalisée avec HTML, CSS et JavaScript, sans dépendance ni étape de compilation.

## Fonctionnalités

- Ajouter des tâches.
- Afficher les tâches par jour de la semaine ou dans la vue « Tous les jours ».
- Marquer une tâche comme terminée : elle apparaît dans la section « Tâches terminées ».
- Supprimer les tâches cochées avec le bouton **CLEAR**.
- Utiliser une interface responsive, adaptée aux petits et grands écrans.
- Afficher une image de fond sur les écrans d’au moins 1024 px de large.

## Lancer l’application

1. Téléchargez ou clonez le projet.
2. Ouvrez le fichier [`index.html`](./index.html) dans un navigateur.

Aucun serveur, gestionnaire de paquets ou outil de compilation n’est nécessaire.

## Fichiers du projet

| Fichier | Rôle |
| --- | --- |
| [`index.html`](./index.html) | Structure de la page et éléments de l’interface |
| [`style.css`](./style.css) | Apparence, transitions et règles responsive |
| [`script.js`](./script.js) | Ajout, affichage, sélection des jours et gestion des tâches |
| [`img/télécharger (7).jpg`](./img/télécharger%20(7).jpg) | Image de fond utilisée sur les grands écrans |

## Utilisation

1. Saisissez une tâche dans le champ, puis cliquez sur **ADD**.
2. Sélectionnez un jour dans le menu pour afficher sa liste.
3. Cochez une tâche pour la marquer comme terminée.
4. Ouvrez **Tâches terminées** pour consulter les tâches cochées.
5. Cliquez sur **CLEAR** pour supprimer les tâches cochées de la vue affichée.

## Limite actuelle

Les tâches sont conservées uniquement en mémoire pendant l’utilisation de la page. Elles ne sont pas sauvegardées dans le navigateur ou sur un serveur : recharger ou fermer la page les efface.

## Personnaliser l’image de fond

L’image de fond est définie dans la media query `@media (min-width: 1024px)` de [`style.css`](./style.css). Pour la remplacer, ajoutez une autre image dans le dossier `img`, puis modifiez le chemin de `url(...)`. Sur les écrans plus étroits, le dégradé reste affiché à la place de l’image.

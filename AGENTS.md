# Pistil & Ronce

## Langue

- Toujours répondre en français : messages, synthèses, commentaires, documentation, messages de commit.
- Le site est en français uniquement.

## Contexte du projet

Site vitrine **one page** d'une fleuriste **fictive** à Nantes. C'est une démo du portfolio de Simon Dabin, développeur freelance.

- **But :** prouver l'offre « site vitrine one page » (550 € + 49 €/mois) auprès des PME, et mesurer le niveau de design obtenu avec l'IA, et en combien de temps.
- **Suivi et étude de cas :** la fiche du projet est dans le portfolio, `~/Local Sites/portfolio/docs/demo-fleuriste.md`. Mettre à jour ses cases à cocher à la fin de chaque étape. Les décisions importantes vont dans le journal de `~/Local Sites/portfolio/ROADMAP.md`.
- **Contenu validé :** `contenu/textes.md`. Ne pas modifier un texte validé sans mon accord.

### Tout est fictif, et doit le rester

- Adresse : « 2 rue des Glaneuses, 44000 Nantes ». Cette rue n'existe pas à Nantes (vérifié le 24/11/2026).
- Téléphone : bloc 02 61 91 xx xx, réservé par l'ARCEP aux œuvres de fiction.
- E-mail, Instagram et avis : fictifs. Les liens externes sont désactivés, et les avis portent la mention « Avis fictifs (démo) ».
- Bandeau « Démo de portfolio · boutique fictive », visible sur toutes les pages, avec le lien « Voir le code ».
- Le formulaire n'envoie rien. Il affiche un message de démo.
- Ne jamais reprendre le nom, le logo ou les photos d'un vrai fleuriste.

### Photos

- Uniquement Unsplash ou Pexels (licence libre). Noter pour chaque photo l'auteur, la source et l'URL dans `contenu/photos.md`.
- Optimiser chaque photo comme pour un vrai client : AVIF/WebP, plusieurs tailles, dimensions explicites.

## Workflow de travail

- Avancer **étape par étape**, dans l'ordre de la fiche : textes → photos → direction artistique → réalisation → mise en ligne.
- **Ne jamais commencer une étape avant que j'aie validé la précédente.** Présenter chaque livrable, puis attendre ma validation.
- **Chronométrer :** noter le temps passé dans le tableau « Temps passé » du `README.md`, à chaque session. C'est ce qui permet de confirmer le délai d'environ 1 semaine de l'offre.
- Me rappeler brièvement l'étape en cours, la prochaine action à valider et les blocages éventuels.

## Stack

- **À décider** à l'étape « Réalisation », avec une proposition argumentée que je valide. Critères : site statique, rapide, sans CMS, hébergé sur Vercel.
- Ne pas se fier à sa mémoire pour les API des outils : consulter la documentation de la version installée.

## Git et GitHub

- Commits **atomiques** : un commit = un changement cohérent (une section, un correctif, une doc).
- Messages au format **Conventional Commits**, en français : `feat: ajoute la section Prestations`, `fix: …`, `docs: …`, `chore: …`, `style: …`.
- Ne jamais commiter de secrets (`.env`, clés).
- Branches : `main` reste toujours déployable. Chaque étape se fait sur une branche `feat/<nom>` ou `docs/<nom>`.
- Créer des branches et commiter **en local sans me demander la permission**.
- **Ne jamais pousser vers le dépôt distant sans que je le demande.**
- Fusion dans `main` uniquement par **pull request**, et **toujours après mon accord**. La description de la PR dit ce qui change, comment le vérifier, et donne des captures pour les changements visuels.
- **Ne jamais supprimer une branche** (locale ou distante) sans mon accord, même après une fusion : pas de `--delete-branch`. Proposer le nettoyage et attendre ma réponse.

## Qualité (avant chaque PR qui touche au site)

### Accessibilité (WCAG 2.2 AA / RGAA)

- HTML sémantique : un seul `h1`, titres hiérarchisés, landmarks (`header`, `nav`, `main`, `footer`), lien d'évitement.
- Navigation complète au clavier, avec un focus toujours visible.
- Contrastes AA vérifiés : 4,5:1 pour le texte, 3:1 pour le grand texte et les éléments d'interface.
- Textes alternatifs pertinents, et `alt=""` pour les images décoratives.
- Formulaire : `label` sur chaque champ, erreurs explicites et reliées au champ, message de confirmation annoncé (`aria-live`).
- Cibles tactiles d'au moins 24 × 24 px.
- Animations discrètes, qui respectent `prefers-reduced-motion`.
- La carte ne doit pas piéger le clavier, et l'adresse est aussi écrite en texte.

### Performance

- Lighthouse ≥ 95 sur mobile. LCP < 2,5 s, INP < 200 ms, CLS < 0,1.
- Polices auto-hébergées, `font-display: swap`, sous-ensembles.
- Images responsives (`srcset`, AVIF/WebP), chargement différé sous la ligne de flottaison.
- La carte est chargée seulement au clic ou à l'approche, ou remplacée par une image statique.

### SEO

- `title` et `meta description` repris de `contenu/textes.md`.
- Open Graph avec une image de partage.
- Données structurées `Florist` (schema.org) avec les infos fictives.
- Comme le site est une démo, la page n'est pas indexée (`noindex`), pour ne pas tromper un internaute qui cherche un vrai fleuriste.

### Responsive

- Mobile d'abord, testé de 320 px à 1920 px.
- Navigateurs : Chrome, Firefox, Safari (+ iOS et Android).

### Légal

- Mentions légales et politique de confidentialité adaptées à une démo : éditeur Simon Dabin, hébergeur, aucune donnée collectée.
- Aucun cookie ni traceur, donc pas de bandeau cookies.

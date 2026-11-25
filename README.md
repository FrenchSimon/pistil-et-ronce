# Pistil & Ronce

Site vitrine one page d'une fleuriste **fictive** à Nantes : démo de portfolio de Simon Dabin.

- Boutique, adresse, téléphone et avis : **fictifs**.
- Suivi du projet et étude de cas : `~/Local Sites/portfolio/docs/demo-fleuriste.md`.

## Stack

- [Astro](https://astro.build) 7, en sortie 100 % statique, hébergé sur Vercel.
- CSS natif : les variables de la direction artistique sont dans `src/styles/global.css`.
- Polices Cormorant Garamond et Karla auto-hébergées (WOFF2, sous-ensemble latin, licence OFL).
- Aucun script tiers ; aucun style ni script en ligne, pour une CSP stricte.
- Versions figées (`package-lock.json`, `save-exact`), Node 24 (`.nvmrc`).

Choix détaillés : `docs/stack.md`.

## Commandes

```sh
nvm use          # Node 24
npm install
npm run dev      # serveur de développement : http://localhost:4321
npm run build    # site statique dans dist/
npm run preview  # aperçu du build
npm run check    # contrôle des types et des composants Astro
npm run photos   # étalonne les photos de contenu/photos/ vers src/assets/photos/
```

## Organisation du code

- `src/pages/` : la page d'accueil (one page), puis les mentions légales.
- `src/layouts/Base.astro` : structure commune (`head`, lien d'évitement, en-tête, pied de page).
- `src/components/` : un composant par bloc de la page.
- `src/styles/` : variables de la direction artistique, base typographique, polices.
- `src/assets/` : polices et éléments de décor, traités au build.

## Documentation (`docs/`)

- `docs/ROADMAP.md` : étapes du projet, livrables et décisions ouvertes.
- `docs/textes.md` : textes de chaque section (validés).
- `docs/photos.md` : sélection des photos, auteurs et sources (validée pour avancer, définitive plus tard).
- `docs/direction-artistique.md` : direction artistique retenue (palette, typographies, logo, composants), avec le lien de la planche de style.
- `docs/stack.md` : stack retenue et vérification sécurité, accessibilité, performance, SEO.
- `docs/pistes.html` : pistes d'ambiance de la direction artistique (à ouvrir via un serveur local, par exemple `python3 -m http.server`).

## Contenu

- `contenu/photos/` : originaux des 12 photos retenues (3000 px) et planche contact des candidats (`planche.html`). Le site utilise leurs versions étalonnées (`src/assets/photos/`, générées par `npm run photos`).
- `contenu/logo/` : logo et favicon vectorisés, utilisés directement par le site.

## Droits d'utilisation

© 2026 Simon Dabin. Tous droits réservés, sauf :

- photos : [licence Unsplash](https://unsplash.com/license), auteurs et sources dans `docs/photos.md` ;
- polices Cormorant Garamond et Karla : licence SIL Open Font License, textes dans `src/assets/fonts/`.

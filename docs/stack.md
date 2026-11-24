# Stack — Pistil & Ronce

> Étape 4. Version 1 — 2026-11-24 · Statut : **proposition, à valider**
>
> Critères (`AGENTS.md`) : site statique, rapide, sans CMS, hébergé sur Vercel ; aucun script tiers ; CSP stricte sans `unsafe-inline` ; images AVIF/WebP en plusieurs tailles ; dépendances minimales. Versions relevées sur npm le 24/11/2026.

## Recommandation : Astro 7, en sortie 100 % statique

CSS natif, un seul petit script pour le formulaire, images optimisées au build, en-têtes de sécurité dans `vercel.json`.

## Comparaison

| Critère | **Astro 7.4** | Eleventy 3.1 | HTML + Vite 8 |
|---|---|---|---|
| Sortie | HTML statique, 0 Ko de JS par défaut | HTML statique | HTML statique |
| Découpage en composants (sections, cartes, boutons) | Natif (`.astro`), CSS limité au composant | Gabarits Nunjucks ou WebC, moins lisibles | Aucun : HTML répété ou outil à ajouter |
| Images AVIF/WebP, `srcset`, `width`/`height` | Natif : `<Picture formats={['avif','webp']}>` avec sharp, au build | Très bon, mais plugin à brancher (`eleventy-img`) | À assembler (`vite-imagetools`), balisage à la main |
| Page « Mentions légales » en plus de la one page | Un fichier dans `src/pages/` | Simple | Configuration multi-pages à écrire |
| CSS et JS regroupés, versionnés (hash) | Natif (Vite intégré) | À configurer | Natif |
| Vercel | Détecté sans configuration, pas d'adaptateur en statique | Détecté | Détecté |
| Poids des dépendances | Moyen (un seul paquet, mais gros) | Léger | Le plus léger |
| Valeur pour le portfolio | Forte : outil répandu pour les sites vitrines, réutilisable pour les prochains clients | Moyenne | Faible : montre peu de méthode |

**Pourquoi Astro :** c'est le seul des trois qui couvre nativement les trois besoins lourds du projet (composants, pipeline d'images, pages annexes) sans plugin. Le code reste lisible pour un client qui ouvre le dépôt, et la même base resservira aux prochaines démos et aux vrais clients de l'offre one page. Eleventy serait un bon second choix, plus léger, mais demande plus d'assemblage. HTML + Vite oblige à tout réécrire à la main, ce qui va contre le délai d'une semaine.

## Briques retenues

| Besoin | Choix | Remarques |
|---|---|---|
| Framework | `astro` 7.4 (version figée dans `package-lock.json`) | Aucune intégration UI (pas de React, Vue…). |
| CSS | CSS natif : variables de la direction artistique dans un fichier global, styles par composant | Pas de Tailwind ni de préprocesseur : une dépendance de moins, et les variables `--papier`, `--sapin`, `--pivoine`… restent celles de la DA. |
| Polices | Cormorant Garamond et Karla en WOFF2, sous-ensemble latin, auto-hébergées, `font-display: swap` | Via l'API de polices d'Astro si elle est stable en v7 (à vérifier dans la doc à la réalisation), sinon fichiers Fontsource copiés dans le projet. Préchargement de la seule police de l'accroche. |
| JavaScript | Un seul petit script pour le formulaire (validation, message de démo en `aria-live`), uniquement `textContent`, jamais `innerHTML` | Le reste du site fonctionne sans JS. |
| Contrôle | `astro check` et `npm audit` avant chaque PR | Recette (étape 6) avec Lighthouse et axe. |

## Points à trancher en même temps

### 1. Pipeline d'images

- Les originaux passent de `contenu/photos/` à `src/assets/photos/` : Astro ne traite que les images importées. Les originaux restent versionnés (21 Mo, acceptable), seuls les fichiers optimisés sont servis.
- `<Picture>` avec `formats={['avif', 'webp']}`, repli JPEG, largeurs adaptées à chaque emplacement (par exemple 480 à 1920 px pour l'accroche, 400 à 800 px pour les cartes), `sizes` calé sur la grille de la DA. `width` et `height` sont écrits par Astro, donc pas de décalage de mise en page (CLS).
- Accroche : `loading="eager"` et `fetchpriority="high"` (image LCP). Toutes les autres : `loading="lazy"`.
- `contenu/photos/planche.html` et `candidats.tsv` restent dans `contenu/` (documents de travail de l'étape 2), hors du site.

### 2. Rendu du plan statique

**Proposition : un script Node maison, reproductible et versionné** (`scripts/plan/`), lancé une fois à la main, pas à chaque build :

1. Extraction unique des données OpenStreetMap d'un quartier du centre de Nantes (API Overpass), enregistrée dans le dépôt (`scripts/plan/donnees.json`).
2. Conversion en GeoJSON (`osmtogeojson`), projection et tracé en SVG (`d3-geo`), avec les couleurs exactes de la DA : fond papier, îlots lin, rues papier clair, eau et parcs en gris verdi, quelques noms de rues en Karla sapin doux.
3. Conversion du SVG en image haute définition avec Chromium headless (Playwright, qui sert aussi aux captures des PR et à la recette responsive), pour que les noms de rues utilisent bien la police Karla.
4. L'image va dans `src/assets/` et passe par le même pipeline AVIF/WebP. Le repère pivoine (SVG G) est posé par-dessus en HTML, la légende « Plan illustratif, adresse fictive. » et « © contributeurs OpenStreetMap » sont en texte.

Ces trois outils sont des dépendances de développement : rien n'arrive dans le site servi.

**Écartés :** QGIS (rendu manuel, non reproductible), MapLibre avec tuiles vectorielles (serveur de tuiles et feuille de style à héberger, démesuré pour une image), prettymaps (Python : un second écosystème pour une seule image).

### 3. Mentions légales et confidentialité

**Proposition : une page dédiée** `/mentions-legales/`, avec deux sections (`#mentions-legales` et `#confidentialite`) vers lesquelles pointent les deux liens du pied de page. Même bandeau démo, même en-tête et `noindex`.

Une fenêtre modale demanderait du JS, une gestion du focus et ne serait pas partageable par lien ; une page est plus simple, plus accessible et sans JS.

## Sécurité : comment tenir la CSP sans `unsafe-inline`

- En-têtes dans `vercel.json` (la CSP doit être un en-tête HTTP : `frame-ancestors` n'a pas d'effet dans une balise `meta`) : `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; form-action 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'`, plus HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy`.
- Astro met en ligne les petites feuilles de style par défaut (`build.inlineStylesheets: 'auto'`) : on passe l'option à `'never'` pour que tout le CSS soit en fichiers.
- Le script du formulaire est un fichier externe. Vérification après chaque build qu'aucune balise `<script>` ou `<style>` en ligne ne reste dans `dist/` (hors JSON-LD, qui n'est pas exécuté et n'est pas concerné par la CSP).
- Astro propose aussi une CSP intégrée (`security.csp`, par hachages), mais elle ne produit qu'une balise `meta` : on garde l'en-tête de `vercel.json`, plus strict.

## Hébergement

- Vercel, sortie statique (`dist/`), sans adaptateur ni fonction serveur. Version de Node fixée dans `package.json` (`engines`).
- Prévisualisation sur chaque PR, production sur `main` (étape 7).

## Blocage à lever avant la réalisation

- **Node local en 22.23.3, Astro 7 demande au moins 22.23.4.** Mettre Node à jour (dernière 22 LTS ou 24 LTS) avant de créer le projet. Aucun gestionnaire de versions (nvm, fnm, Volta) n'est installé : mise à jour par l'installeur officiel ou `brew`, à ton choix.

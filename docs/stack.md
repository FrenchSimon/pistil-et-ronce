# Stack — Pistil & Ronce

> Étape 4. Version 1 — 2026-11-24 · Statut : **validé le 24/11/2026**
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
2. Conversion en GeoJSON par une fonction maison d'une trentaine de lignes (on n'a besoin que des rues, îlots, eau et parcs), projection et tracé en SVG (`d3-geo`), avec les couleurs exactes de la DA : fond papier, îlots lin, rues papier clair, eau et parcs en gris verdi, quelques noms de rues en Karla sapin doux.
3. Conversion du SVG en image haute définition avec Chromium headless (Playwright, qui sert aussi aux captures des PR et à la recette responsive), pour que les noms de rues utilisent bien la police Karla.
4. L'image va dans `src/assets/` et passe par le même pipeline AVIF/WebP. Le repère pivoine (SVG G) est posé par-dessus en HTML, la légende « Plan illustratif, adresse fictive. » et « © contributeurs OpenStreetMap » sont en texte.

`d3-geo` et Playwright sont des dépendances de développement : rien n'arrive dans le site servi.

**Écartés :** `osmtogeojson` (dernière version : une bêta de 2022, avec des dépendances figées anciennes comme `@xmldom/xmldom` 0.8.3, qui feraient échouer `npm audit`), QGIS (rendu manuel, non reproductible), MapLibre avec tuiles vectorielles (serveur de tuiles et feuille de style à héberger, démesuré pour une image), prettymaps (Python : un second écosystème pour une seule image).

### 3. Mentions légales et confidentialité

**Proposition : une page dédiée** `/mentions-legales/`, avec deux sections (`#mentions-legales` et `#confidentialite`) vers lesquelles pointent les deux liens du pied de page. Même bandeau démo, même en-tête et `noindex`.

Une fenêtre modale demanderait du JS, une gestion du focus et ne serait pas partageable par lien ; une page est plus simple, plus accessible et sans JS.

## Vérification de la stack, critère par critère

Ce que la stack apporte pour chaque exigence d'`AGENTS.md`, et les pièges repérés. Astro ne produit que le HTML qu'on écrit : la qualité finale dépend surtout de la réalisation, mais rien dans la stack ne l'empêche.

### Sécurité

- **Surface d'attaque minimale :** site statique, pas de serveur, pas de base de données, pas de CMS. Les dépendances npm ne servent qu'à construire le site : aucune n'est envoyée au visiteur.
- **CSP stricte, sans `unsafe-inline`, en en-tête HTTP** dans `vercel.json`. Ce doit être un en-tête, car `frame-ancestors` n'a pas d'effet dans une balise `meta`. Valeur : `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; form-action 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'`. S'y ajoutent HSTS, `nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` et une `Permissions-Policy` qui coupe caméra, micro, géolocalisation, etc.
- **Piège n° 1 :** Astro met en ligne les petites feuilles de style par défaut (`build.inlineStylesheets: 'auto'`), ce qui serait bloqué par la CSP. On passe l'option à `'never'`.
- **Piège n° 2 :** le script du formulaire est un fichier externe. Après chaque build, un contrôle vérifie qu'aucune balise `<script>` ou `<style>` en ligne ne reste dans `dist/`, hors JSON-LD (non exécuté, donc non concerné par la CSP).
- La CSP intégrée d'Astro (`security.csp`, par hachages) est écartée : elle ne produit qu'une balise `meta`.
- **Formulaire :** les champs n'ont **pas d'attribut `name`**. Même si le JS ne se charge pas, l'envoi du formulaire ne transmet alors aucune donnée, et rien n'arrive dans l'URL ni dans les journaux de Vercel. L'auto-remplissage reste possible grâce à `autocomplete`. Le message de démo est écrit avec `textContent`.
- **Dépendances :** quatre paquets directs seulement (`astro`, puis en développement `d3-geo`, `playwright` et `@axe-core/playwright`), versions figées dans `package-lock.json`, `npm audit` avant chaque PR.

### Accessibilité

- Astro n'ajoute aucun balisage : landmarks, titres, lien d'évitement, `label` et `aria-live` sont écrits tels quels dans les composants.
- Le site fonctionne sans JS, sauf la validation du formulaire. Pas de carte interactive, donc pas de piège clavier.
- **Piège :** en v7, `compressHTML` vaut `'jsx'` par défaut et peut supprimer les espaces entre éléments en ligne (par exemple « Claire M.,bouquet »). Un lecteur d'écran lirait alors des mots collés. On remet `compressHTML: true` ou on le vérifie à la relecture.
- Outils : panneau d'audit de la barre d'outils de développement d'Astro (à confirmer en v7) pendant le développement, puis axe (`@axe-core/playwright`, dépendance de développement) et VoiceOver à la recette.

### Performance

- **Zéro JS par défaut**, sauf le petit script du formulaire : très bon INP.
- **Images :** AVIF/WebP en plusieurs tailles, `width`/`height` écrits (CLS nul), image de l'accroche prioritaire (`fetchpriority="high"`), les autres différées.
- **Polices :** WOFF2 latin, `font-display: swap`, préchargement de la police de l'accroche seulement. À vérifier : le sous-ensemble latin doit contenir « œ » et les guillemets français.
- **Coût du CSS en fichiers (pour la CSP) :** une requête bloquante de plus, de quelques Ko, sans effet notable avec HTTP/2.
- **Cache :** les fichiers de `/_astro/` ont une empreinte dans leur nom, donc `Cache-Control: public, max-age=31536000, immutable` dans `vercel.json`.

### SEO (et `noindex`)

- `title` et `meta description` repris de `textes.md`, `lang="fr"`, Open Graph avec image de partage, JSON-LD `Florist` aux infos fictives, favicon SVG et repli PNG pour iOS.
- **`noindex` en double :** balise `<meta name="robots" content="noindex">` et en-tête `X-Robots-Tag: noindex`.
- **Piège :** ne pas bloquer le site dans `robots.txt`. Un robot bloqué ne lit pas le `noindex` et peut indexer l'URL sans contenu. Pas de sitemap non plus.
- **Dépend d'une décision ouverte :** les URL d'Open Graph et de JSON-LD doivent être absolues, donc l'option `site` d'Astro attend l'adresse définitive du site (sous-domaine Vercel ou du portfolio).
- Page 404 (`src/pages/404.astro`) avec le bandeau démo.

## Maintenabilité et évolution

### Maintenance : un site figé, autonome

Objectif : **aucune maintenance une fois en ligne**, en dehors de corrections de bugs éventuelles.

- **Ce qui est servi ne vieillit pas.** Le site en ligne n'est que du HTML, du CSS, quelques lignes de JS standard et des images. Il n'exécute ni Astro, ni Node, ni npm, et n'appelle aucun service tiers. Il n'y a donc rien à mettre à jour pour qu'il continue de fonctionner.
- **Astro et npm ne servent qu'à construire le site.** Une faille dans une dépendance de build ne touche pas le site servi. Aucune montée de version d'Astro n'est prévue, même si de nouvelles versions majeures sortent (5.0 en décembre 2024, 6.0 en mars 2026, 7.0 en juin 2026).
- **Tout est figé :** versions exactes (`save-exact=true` dans `.npmrc`, `package-lock.json` versionné), version de Node fixée dans `package.json`. Pas de Dependabot ni de mise à jour automatique : un même commit reconstruit toujours le même site.
- **Node 24 plutôt que 22 :** support jusqu'en avril 2028, contre avril 2027 pour Node 22. Vercel retire les versions de Node arrivées en fin de vie. Après cette date, une nouvelle construction échouerait, mais **le déploiement déjà en ligne continue d'être servi** : le problème ne se pose que si on corrige un bug plus tard.
- **Plan B pour une correction tardive :** si la construction sur Vercel n'est plus possible, on construit en local et on envoie le dossier `dist/` déjà prêt (`vercel deploy --prebuilt`). La seule chose à changer serait alors la version de Node dans `package.json`.
- **Ce qui reste hors du code :** le nom de domaine, s'il y en a un (à renouveler), et le compte Vercel.
- **Lisibilité, pour corriger vite :** un composant par section, les variables de la DA dans un seul fichier, les textes dans les composants.

### Si le site grandit

| Évolution | Ce que permet Astro | Effort |
|---|---|---|
| Plusieurs pages (une page par prestation, blog, actualités) | Un fichier par page dans `src/pages/`, et des collections de contenu (Markdown typé) pour les articles | Faible, sans changer de stack |
| Textes modifiables par le client | Un CMS « headless » branché sur les collections (par exemple Decap, qui stocke dans Git, ou un CMS hébergé) | Moyen. Sort du cadre « sans CMS » de l'offre one page : ce serait une autre offre |
| Vrai formulaire de contact | Passage en rendu hybride : les pages restent statiques, une seule route s'exécute côté serveur (adaptateur `@astrojs/vercel`, actions d'Astro), avec envoi par un service d'e-mail | Faible à moyen |
| Paiement de quelques produits (bouquets, abonnements) | Stripe Checkout : une route serveur crée la session de paiement, le client paie sur la page hébergée par Stripe. Aucune donnée bancaire ne passe par le site, la CSP reste stricte, la clé secrète vit dans les variables d'environnement de Vercel | Moyen |
| Vraie boutique (stock, livraisons, comptes clients, factures) | Astro peut servir de vitrine devant une solution e-commerce (Shopify en mode headless, par exemple), mais il ne doit pas la remplacer | Élevé. Pour une petite boutique, une solution e-commerce clé en main est souvent plus raisonnable qu'un développement sur mesure |

Le point fort : on passe du statique au rendu hybride page par page, sans réécrire le site. Eleventy, lui, n'a pas de rendu serveur intégré et demanderait de bâtir l'API à côté. Avec HTML + Vite, tout serait à construire.

## Hébergement

- Vercel, sortie statique (`dist/`), sans adaptateur ni fonction serveur. Version de Node fixée dans `package.json` (`engines`).
- Prévisualisation sur chaque PR, production sur `main` (étape 7).

## Blocage à lever avant la réalisation

- **Node local en 22.23.3, Astro 7 demande au moins 22.23.4.** Mettre Node à jour (Node 24 LTS, voir « Maintenance ») avant de créer le projet. Aucun gestionnaire de versions (nvm, fnm, Volta) n'est installé : mise à jour par l'installeur officiel ou `brew`, à ton choix.

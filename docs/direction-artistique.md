# Direction artistique et maquette — Pistil & Ronce

> Version 1 — 2026-11-24 · Statut : **validé le 24/11** (remplace la version 0 : accent rouille → pivoine, boutons « feuille », décor ronce ; décisions ouvertes tranchées le 24/11)
> **Ce fichier est la seule référence** : toutes les valeurs, la structure de la page et les tracés SVG sont ici. Les maquettes de travail ne servent pas de référence ; leurs écarts seront corrigés pendant la réalisation.

## Pour l'agent qui réalise le site

- Respecter `AGENTS.md` (étapes, validation, Git, sécurité, qualité). L'étape suivante de `docs/ROADMAP.md` est la **4. Stack** : proposer la stack avant d'écrire le site.
- Textes : **uniquement** `docs/textes.md`, mot pour mot. Photos : `contenu/photos/` et `docs/photos.md` (auteurs, textes alternatifs).
- Ne rien ajouter de fictif qui ressemble à du vrai : liens e-mail et Instagram désactivés, avis marqués « Avis fictifs (démo). », formulaire sans envoi.
- Toutes les couleurs, tailles et rayons ci-dessous sont à déclarer en variables CSS (noms proposés entre parenthèses) ; aucune autre couleur dans le site.

## Ambiance

Planches botaniques, papier vergé, encre vert sapin. Une seule couleur vive, **la pivoine**, qui signale l'action. Le végétal (la ronce) habille les marges, toujours dessiné une seule fois, jamais en motif répété, jamais sous un texte.

## Palette

Contrastes WCAG 2.2 (luminance relative).

| Nom (variable) | Hex | Rôle | Contraste sur papier |
|---|---|---|---|
| Papier (`--papier`) | `#F4EFE6` | Fond de page | — |
| Papier clair (`--papier-clair`) | `#FBF8F2` | Cartes, champs, passe-partout, bandes « façon de faire » et « avis » | — |
| Lin (`--lin`) | `#E6DECF` | Filets, séparateurs, feuilles des ronces, fond du plan | 1,2:1 · décor |
| Sapin (`--sapin`) | `#1F3A2E` | Texte, titres, menu, bandeau démo, pied de page, focus clavier | 10,8:1 ✔ AAA |
| Sapin doux (`--sapin-doux`) | `#4A5F53` | Surtitre, étiquettes, légendes, bords de champ | 6,0:1 ✔ |
| Pivoine (`--pivoine`) | `#A3404F` | Bouton principal, bouton « Commander », liens d'action, esperluette du logo, repère du plan | 5,4:1 ✔ |
| Sauge (`--sauge`) | `#8A9A7B` | Décor : tiges et épines des ronces, puces feuille | 2,6:1 · jamais en texte |
| Pivoine pâle (`--pivoine-pale`) | `#D0A0A2` | Décor : mûres, cœur des fleurs, guillemet des avis | 2,0:1 · jamais en texte |
| Brique (`--brique`) | `#A33A12` | Erreurs de formulaire uniquement (texte, icône, bord du champ en erreur) | 5,8:1 ✔ |

Associations texte / fond permises (ratio) :

| Texte \ fond | papier | papier clair | lin | sapin | pivoine |
|---|---|---|---|---|---|
| sapin | 10,8 ✔ | 11,6 ✔ | 9,2 ✔ | — | 2,0 ✗ |
| sapin doux | 6,0 ✔ | 6,5 ✔ | 5,1 ✔ | ✗ | ✗ |
| pivoine | 5,4 ✔ | 5,8 ✔ | 4,6 ✔ | 2,0 ✗ | — |
| brique | 5,8 ✔ | 6,3 ✔ | 5,0 ✔ | ✗ | ✗ |
| papier | — | — | — | 10,8 ✔ | 5,4 ✔ |

Règles :
1. **Jamais pivoine et sapin superposés.** Sur fond sapin, l'esperluette du logo passe en papier.
2. **Un seul aplat pivoine visible par écran** : le bouton principal de la section (accroche : « Commander un bouquet » ; contact : « Envoyer »).
3. **Erreurs de formulaire** : en brique, jamais en pivoine (la pivoine reste la couleur de l'action), toujours avec icône et message relié au champ (`aria-describedby`) : la couleur n'est jamais le seul indice. Champ en erreur : bord brique 2 px.
4. Ombre unique (`--ombre-cadre`) : `0 18px 40px -24px rgba(31, 58, 46, .35)`, sous le passe-partout de la photo d'accroche et des photos de la galerie.
5. **Photos étalonnées** : les 12 photos reçoivent le même étalonnage léger (saturation 92 %, bleus atténués, noirs levés ; `scripts/etalonner-photos.mjs`) et les photos encadrées partagent le même passe-partout papier clair (14 px pour l'accroche, 12 px pour la galerie, 8 px sous 900 px). Les cartes de prestation gardent leur cadre de carte.

## Typographies (OFL, WOFF2 auto-hébergées, sous-ensemble latin, `font-display: swap`)

| Rôle | Police | Graisses |
|---|---|---|
| Titres, surtitre, logo, légendes, citations | Cormorant Garamond | 500, 600, romain et italique |
| Texte, interface, boutons, étiquettes | Karla | 400, 600 (500 inutilisé) |

| Style | Police · taille / interligne | Remarque |
|---|---|---|
| Titre d'accroche (h1) | Cormorant 500 · `clamp(42px, 4.6vw, 64px)` / 1,04 | seconde moitié en italique ; `text-wrap: balance` |
| Titre de section (h2) | Cormorant 500 · `clamp(32px, 3vw, 40px)` / 1,1 | |
| Titre de carte (h3) | Cormorant 600 · 26 / 32 | |
| Surtitre | Cormorant italique 500 · 22 | sapin doux |
| Logo | Cormorant 600 · 30 / 30, +0,01 em | |
| Chapeau d'accroche | Karla 400 · 18 / 1,6 | 34 em de large au plus |
| Texte | Karla 400 · 16–17 / 1,6 | |
| Bouton | Karla 600 · 16 | |
| Étiquette | Karla 600 · 13, capitales, +0,12 em | 11 px +0,14 em pour les petites étiquettes |
| Légende de photo | Cormorant italique 500 · 17–19 / 1,35 | |
| Citation d'avis | Cormorant italique 500 · 23 / 1,4 | |

## Espacements et grille

- Conteneur : `max-width: 1440px`, marges latérales `clamp(20px, 5.5vw, 80px)`.
- Pas : 8 · 16 · 24 · 32 · 56 · 80 px. Sections : `padding-block: clamp(56px, 7vw, 96px)`.
- Grilles de cartes : `repeat(auto-fit, minmax(250px, 1fr))`, gouttière 24 px. Exception, les 4 cartes de prestation : 1 colonne, 2 dès 600 px, 4 dès 1 150 px (`auto-fit` laissait une carte seule sur sa ligne vers 1 000 px).
- Point de rupture unique : **900 px** (menu replié, décor d'accroche masqué, galerie en 2 colonnes).

## Logo et favicon

- **Logo** : « Pistil & Ronce » en Cormorant 600 30 px, esperluette italique pivoine ; dessous la branche de ronce (SVG A, 176 × 23 px, trait sapin) ; dessous « Fleuriste · Nantes » en Karla 600 10 px, capitales, +0,32 em, sapin doux, centré sur la largeur du logo. Sur fond sapin, tout en papier.
- **Favicon** : l'esperluette italique, papier sur un carré sapin aux coins arrondis (12 px à 64 px, 6 px à 32 px, 3 px à 16 px).
- **Fichiers vectorisés** dans `contenu/logo/` (tracés tirés des polices OFL, aucune police à charger) : `logo.svg` (complet), `logo-papier.svg` (sur fond sapin), `mot-symbole.svg` (le nom seul), `favicon.svg`. Dans le site, le logo est un SVG en ligne avec `role="img"` et `aria-label="Pistil & Ronce, fleuriste à Nantes"`.

## Composants

### Boutons « feuille »
Deux coins arrondis en diagonale (haut-droit et bas-gauche), les deux autres droits.

| | Principal | Secondaire (« Commander » de l'en-tête) |
|---|---|---|
| Taille | 52 px de haut, padding 0 26 px | 44 px, padding 0 20 px |
| Rayon | `border-radius: 0 26px 0 26px` | `border-radius: 0 22px 0 22px` |
| Repos | fond pivoine, texte papier, petite feuille (SVG B) après le texte, `gap: 10px` | bord 1 px et texte pivoine, fond transparent |
| Survol | fond sapin | fond pivoine, texte papier |
| Focus clavier | contour sapin 2 px, décalé de 4 px | idem |

### Liens
- **Menu** : sapin, sans soulignement, cible de 44 px ; survol pivoine souligné (décalage 6 px).
- **Lien d'action** (« Voir nos réalisations ») : pivoine, souligné 1 px, décalage 6 px ; survol sapin souligné 2 px.
- **Sur fond sapin** (bandeau, pied de page) : papier souligné ; survol soulignement 2 px.
- Focus : contour sapin 2 px décalé de 4 px, partout (`:focus-visible`).

### Champs
48 px de haut, fond papier clair, bord sapin doux 1 px, angles droits ; au focus bord sapin 2 px + contour de focus ; libellé Karla 600 15 px au-dessus. Textarea : 160 px de haut au moins, redimensionnable en hauteur.

### Carte de prestation
Fond papier clair, filet lin, angles droits ; photo 240 px de haut en `object-fit: cover`, `alt=""` (le titre suit) ; corps padding 22 / 24 / 26 px : h3, texte, puis l'indication de prix en étiquette sapin sous un filet lin. La carte « Livraison locale » n'a pas de photo : à la place, un bloc papier de 240 px avec l'illustration du vélo fleuri (`src/assets/deco/velo-livraison.svg`, 300 × 240, couleurs de la palette, décorative), réduite sans déformation sur les cartes étroites. La branche C n'est plus utilisée.

### Éléments de décor (tous `aria-hidden="true"`)
- **Séparateur** : branche fleurie D (224 × 40) centrée entre deux filets lin qui prennent la largeur restante. Deux sur la page : avant « Quelques réalisations » et avant « Une envie de fleurs ? ».
- **Puces feuille** : SVG B en sauge, 18 × 12, décalé de 7 px vers le bas, `gap: 14px`.
- **Cartel** (légendes de la galerie) : « N° 01 » en étiquette 11 px sapin doux, puis la légende en Cormorant italique.
- **Guillemet d'avis** : « en Cormorant italique 600 64 px, pivoine pâle.
- **Pied de page gravé** : branche E (640 × 200) en bas à droite, débordant, trait sapin doux et feuilles sapin sur fond sapin.

## La page, section par section

1. **Lien d'évitement** « Aller au contenu » (masqué, visible au focus) → `#contenu`.
2. **Bandeau démo** : fond sapin, Karla 13 px papier, centré, padding 9 / 16 px ; texte de `textes.md` § 0, lien « Voir le code » vers https://github.com/FrenchSimon/pistil-et-ronce (`rel="noopener noreferrer"`, nouvel onglet annoncé aux lecteurs d'écran), suivi d'une petite flèche oblique ↗ de 10 px (`aria-hidden`) qui signale que le lien sort du site. Sur mobile, sur deux lignes.
3. **En-tête** : filet lin en bas, hauteur 92 px ; logo à gauche (lien vers le haut de page) ; à droite le menu (Prestations, Réalisations, Avis, Nous trouver ; `gap: 32px`) puis le bouton secondaire « Commander » → `#contact`. Sous 900 px : liens et bouton masqués, bouton menu 48 × 48 (bord sapin, rayon feuille 24 px, trois traits) qui doit ouvrir un vrai menu (`aria-expanded`) ; le bandeau démo reste visible en haut du menu ouvert.
4. **Accroche** (`#accroche`) : deux colonnes en `flex-wrap` (texte `flex: 1 1 460px`, max 640 px ; photo `flex: 1 1 360px`, max 600 px), écart `clamp(32px, 7vw, 112px)`. Texte : surtitre « Fleuriste à Nantes » (`textes.md` § 3), h1, chapeau, boutons (principal « Commander un bouquet » → `#contact`, lien d'action « Voir nos réalisations » → `#realisations`), puis les 3 infos rapides en grille sous un filet lin, chacune avec une petite étiquette (Horaires, Livraison, Boutique). Photo : `accroche-bouquet-kraft.jpg` dans un passe-partout papier clair de 14 px, filet lin, ombre cadre, au format 4:3 de l'original pour ne pas rogner le bouquet (`aspect-ratio: 4 / 3`), image LCP non différée ; légende sous la photo en Cormorant italique 17 sapin doux : « Bouquet de saison » / « papier kraft et raphia » (`textes.md` § 3). Décor : SVG F derrière l'en-tête et l'accroche (1440 × 900, positionné en haut à gauche, masqué sous 900 px).
5. **Ce que nous faisons** (`#prestations`) : h2, puis 4 cartes (bouquets du jour, mariages et événements, abonnements entreprises, livraison locale) avec les photos `prestation-*.jpg`. Section pleine largeur sur fond papier opaque : elle passe devant le bas du décor F, qui ne tombe plus sous le titre.
6. **Notre façon de faire** : bande papier clair entre deux filets lin ; h2 ; 3 points en puces feuille sur 3 colonnes (`auto-fit, minmax(240px, 1fr)`), le début en gras en Cormorant 600 22 px sur sa propre ligne (« De saison : »), la suite en Karla 17. Section conservée. Sous les 3 points, bouton secondaire « Calendrier des saisons » (`textes.md` § 5) qui ouvre au clic un popover natif, sans script : fenêtre centrée de 440 px au plus, fond papier clair, filet lin, ombre cadre ; titre h3 et bouton ✕ (44 × 44, rayon feuille) ; vrai `<table>` (mois en en-têtes `th scope="col"` avec leur nom complet pour les lecteurs d'écran, fleurs en `th scope="row"` Cormorant 600 18) ; pastilles de 12 px, pivoine pleine = en saison, filet lin = hors saison (10 px et cases de 15 px sous 400 px) ; légende Karla 14 sapin doux. Au survol d'une case (souris uniquement, `@media (hover: hover)`), la ligne et la colonne se teintent de lin, la fleur et le mois passent en pivoine (4,6:1 sur lin), les pastilles vides de la croix en sauge. Repris de la piste 07 « Calendrier des saisons » du canevas.
7. Séparateur.
8. **Quelques réalisations** (`#realisations`) : grille de 3 colonnes (2 sous 900 px), `gap: 40px 24px` ; ordre 1, 2, 3 / 4, 6 (sur 2 colonnes, seule photo en paysage) / 5, 7, 8 ; photos 440 px de haut (260 px sous 900 px), filet lin ; légende cartel, numérotée dans l'ordre d'affichage (N° 01 à N° 08). Sous 900 px, la photo en paysage n'occupe qu'une colonne (4 rangées de 2), recadrée sur le bouquet (`object-position: 66% 50%`). Texte alternatif = légende de `textes.md` § 6. Images différées.
9. **Ils nous ont fait confiance** (`#avis`) : bande papier clair entre deux filets lin ; 3 cartes (`figure` > `blockquote` + `figcaption` « **Claire M.**, bouquet d'anniversaire ») sur fond papier, filet lin, padding 26 px, en grille `auto-fit, minmax(250px, 1fr)` ; guillemet décoratif (`aria-hidden`) au-dessus de la citation (21 px sous 900 px), signature sous un filet lin en Karla 15 sapin doux, le nom en 600 sapin ; puis « Avis fictifs (démo). » en Karla italique 15 sapin doux ; dessous, « Lire tous nos avis sur Google » en Karla 600 avec la flèche ↗ des liens sortants, en texte simple suivi de l'étiquette « fictif » (sur un vrai site : lien vers la fiche Google en nouvel onglet, jamais de widget d'avis, qui chargerait un script tiers et des traceurs).
10. **Nous trouver** (`#nous-trouver`) : deux colonnes en `flex-wrap`. Gauche : h2, adresse (étiquette + texte), horaires dans un vrai `<table>` (`th scope="row"`, filets lin), accès. Droite : **plan statique** (aucune carte interactive, donc aucun piège clavier ni script tiers), 420 px de haut au moins, filet lin. Rendu depuis les données OpenStreetMap d'un quartier de Nantes, dans un style sur mesure en **niveaux de gris teintés de la palette** : fond papier, îlots lin, rues papier clair, eau et parcs en gris légèrement verdi, noms de rues en sapin doux ; seul élément de couleur, le repère pivoine (SVG G), posé en superposition. L'adresse étant fictive, le repère n'est posé sur aucune rue nommée et une légende l'indique : « Plan illustratif, adresse fictive. ». Attribution obligatoire « © contributeurs OpenStreetMap » (licence ODbL) en étiquette sous le plan. Export AVIF/WebP en plusieurs tailles, `alt` = l'adresse en clair, image différée. L'outil de rendu est choisi à l'étape 4 (Stack).
11. Séparateur.
12. **Une envie de fleurs ?** (`#contact`) : gauche (max 460 px) : h2, texte, coordonnées sous un filet lin (étiquette + valeur) — téléphone en lien `tel:+33261912407`, e-mail et Instagram en texte simple suivis d'une étiquette « fictif ». Droite : formulaire en grille `auto-fit, minmax(220px, 1fr)` : Nom, E-mail ou téléphone, Objet (liste), Date souhaitée (facultatif), Message (pleine largeur), bouton principal « Envoyer ». À l'envoi : `preventDefault`, aucun envoi, message de démo de `textes.md` § 9 dans une zone `role="status"` / `aria-live="polite"` (fond papier clair, bord sapin doux).
13. **Pied de page** : fond sapin, texte papier ; à gauche « Pistil & Ronce » (Cormorant 600 30, esperluette papier) et « Fleuriste à Nantes » ; à droite Mentions légales · Confidentialité ; en bas, sous un filet sapin doux, « Démo réalisée par Simon Dabin — boutique fictive. ».

Repères pour la mise en page : la page fait environ 6 400 px de haut en 1 440 px de large, et 10 400 px en 390 px.

## Tracés SVG à réutiliser

Couleurs en dur = valeurs de la palette ; à remplacer par `currentColor` ou des variables si besoin.

### A · Branche du logo (176 × 23, trait sapin via `currentColor`)
```html
<svg width="176" height="23" viewBox="0 0 360 46" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display: block; margin: 1px 0 1px"><path d="M26 24 C90 10 140 36 180 24 C220 12 272 36 334 20"></path><path d="M0 0 Q7.5 -5.5 15 0 Q7.5 5.5 0 0 Z M2 0 L12 0" transform="translate(66.2 19.7) rotate(-48.2)"></path><path d="M0 0 Q7.5 -5.5 15 0 Q7.5 5.5 0 0 Z M2 0 L12 0" transform="translate(112.0 23.2) rotate(55.3)"></path><path d="M0 0 Q7.5 -5.5 15 0 Q7.5 5.5 0 0 Z M2 0 L12 0" transform="translate(154.8 27.3) rotate(-47.9)"></path><path d="M0 0 Q7.5 -5.5 15 0 Q7.5 5.5 0 0 Z M2 0 L12 0" transform="translate(205.4 20.5) rotate(47.2)"></path><path d="M0 0 Q7.5 -5.5 15 0 Q7.5 5.5 0 0 Z M2 0 L12 0" transform="translate(248.8 23.5) rotate(-42.5)"></path><path d="M0 0 Q7.5 -5.5 15 0 Q7.5 5.5 0 0 Z M2 0 L12 0" transform="translate(294.6 25.6) rotate(45.9)"></path><path d="M89.9 20.8 l-2.3 -3.9"></path><path d="M135.6 26.1 l-2.9 3.4"></path><path d="M189.8 21.8 l-2.0 4.0"></path><path d="M227.8 21.5 l-2.3 -3.9"></path><path d="M271.0 25.3 l-2.8 3.5"></path><path d="M315.7 23.7 l-2.0 4.0"></path></svg>
```

### B · Petite feuille (bouton principal, puces)
```html
<svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><path d="M1 6 Q9 -1 17 6 Q9 13 1 6 Z M3 6 H14"></path></svg>
```

### C · Branche de la carte « Livraison locale » (260 × 200)
```html
<svg width="260" height="200" viewBox="0 0 260 200" fill="none" stroke="#8A9A7B" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ><path d="M14 186 C40 150 70 128 110 112 C150 96 182 70 204 40 C214 26 226 16 244 10"></path><path d="M0 0 Q9.0 -7 18 0 Q9.0 7 0 0 Z M2 0 L15 0" transform="translate(24.8 172.2) rotate(-97.9)" fill="#E6DECF"></path><path d="M34.8 161.1 l1.4 4.8"></path><path d="M0 0 Q9.0 -7 18 0 Q9.0 7 0 0 Z M2 0 L15 0" transform="translate(45.7 150.6) rotate(6.5)" fill="#E6DECF"></path><path d="M57.2 141.1 l-4.6 -2.0"></path><path d="M0 0 Q9.0 -7 18 0 Q9.0 7 0 0 Z M2 0 L15 0" transform="translate(69.9 132.3) rotate(-80.5)" fill="#E6DECF"></path><path d="M82.3 125.0 l-0.1 5.0"></path><path d="M0 0 Q9.0 -7 18 0 Q9.0 7 0 0 Z M2 0 L15 0" transform="translate(96.0 118.0) rotate(23.1)" fill="#E6DECF"></path><path d="M109.4 112.2 l-4.0 -3.1"></path><path d="M0 0 Q9.0 -7 18 0 Q9.0 7 0 0 Z M2 0 L15 0" transform="translate(123.5 106.1) rotate(-73.6)" fill="#E6DECF"></path><path d="M136.8 99.1 l-0.0 5.0"></path><path d="M0 0 Q9.0 -7 18 0 Q9.0 7 0 0 Z M2 0 L15 0" transform="translate(149.5 91.4) rotate(14.7)" fill="#E6DECF"></path><path d="M161.8 82.7 l-4.7 -1.9"></path><path d="M0 0 Q9.0 -7 18 0 Q9.0 7 0 0 Z M2 0 L15 0" transform="translate(173.4 73.3) rotate(-89.3)" fill="#E6DECF"></path><path d="M184.4 62.9 l1.3 4.9"></path><path d="M0 0 Q9.0 -7 18 0 Q9.0 7 0 0 Z M2 0 L15 0" transform="translate(194.5 51.9) rotate(-1.5)" fill="#E6DECF"></path><path d="M204.0 40.0 l-5.0 -0.5"></path><path d="M0 0 Q9.0 -7 18 0 Q9.0 7 0 0 Z M2 0 L15 0" transform="translate(213.6 28.5) rotate(-93.0)" fill="#E6DECF"></path><path d="M225.2 19.0 l0.3 5.0"></path><g fill="#D0A0A2" stroke="none"><circle cx="240.7" cy="6.1" r="3.4"></circle><circle cx="246.3" cy="6.1" r="3.4"></circle><circle cx="243.5" cy="1.3" r="3.4"></circle><circle cx="243.5" cy="10.9" r="3.4"></circle><circle cx="237.9" cy="10.9" r="3.4"></circle><circle cx="249.1" cy="10.9" r="3.4"></circle><circle cx="246.3" cy="15.7" r="3.4"></circle></g></svg>
```

### D · Séparateur (224 × 40, élargi de 4 px pour ne pas rogner la fleur)
```html
<svg width="224" height="40" viewBox="0 0 224 40" fill="none" stroke="#8A9A7B" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ><path d="M10 22 C60 12 110 30 160 20 C180 16 196 18 210 22"></path><path d="M0 0 Q8.0 -6 16 0 Q8.0 6 0 0 Z M2 0 L13 0" transform="translate(29.5 19.4) rotate(-52.1)" fill="#E6DECF"></path><path d="M46.8 18.9 l-2.3 3.9"></path><path d="M0 0 Q8.0 -6 16 0 Q8.0 6 0 0 Z M2 0 L13 0" transform="translate(63.2 19.4) rotate(51.3)" fill="#E6DECF"></path><path d="M80.5 20.6 l-1.9 -4.0"></path><path d="M0 0 Q8.0 -6 16 0 Q8.0 6 0 0 Z M2 0 L13 0" transform="translate(97.0 21.9) rotate(-43.9)" fill="#E6DECF"></path><path d="M114.2 22.9 l-2.4 3.8"></path><path d="M0 0 Q8.0 -6 16 0 Q8.0 6 0 0 Z M2 0 L13 0" transform="translate(131.5 23.1) rotate(46.3)" fill="#E6DECF"></path><path d="M148.0 21.9 l-2.7 -3.6"></path><path d="M0 0 Q8.0 -6 16 0 Q8.0 6 0 0 Z M2 0 L13 0" transform="translate(165.3 19.1) rotate(-56.6)" fill="#E6DECF"></path><path d="M182.2 17.8 l-2.3 3.9"></path><path d="M0 0 Q8.0 -6 16 0 Q8.0 6 0 0 Z M2 0 L13 0" transform="translate(199.1 19.4) rotate(58.4)" fill="#E6DECF"></path><path d="M210.0 22.0 l-1.1 -4.3"></path><circle cx="209.8" cy="14.9" r="5.2" fill="#FBF8F2"></circle><circle cx="216.4" cy="19.8" r="5.2" fill="#FBF8F2"></circle><circle cx="213.9" cy="27.6" r="5.2" fill="#FBF8F2"></circle><circle cx="205.7" cy="27.6" r="5.2" fill="#FBF8F2"></circle><circle cx="203.1" cy="19.8" r="5.2" fill="#FBF8F2"></circle><circle cx="209.78984975" cy="21.9401505" r="2.2" fill="#D0A0A2" stroke="none"></circle></svg>
```

### E · Branche gravée du pied de page (640 × 200, en bas à droite, débordante)
```html
<svg width="640" height="200" viewBox="0 0 640 200" fill="none" stroke="#4A5F53" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M-10 190 C90 150 160 170 250 140 C340 110 380 60 470 50 C540 42 600 60 660 40"></path><path d="M0 0 Q12.0 -9 24 0 Q12.0 9 0 0 Z M2 0 L21 0" transform="translate(13.4 181.5) rotate(-65.9)" fill="#1F3A2E"></path><path d="M33.1 175.7 l-1.8 6.5"></path><path d="M0 0 Q12.0 -9 24 0 Q12.0 9 0 0 Z M2 0 L21 0" transform="translate(52.2 171.1) rotate(36.1)" fill="#1F3A2E"></path><path d="M72.0 167.4 l-4.2 -5.2"></path><path d="M0 0 Q12.0 -9 24 0 Q12.0 9 0 0 Z M2 0 L21 0" transform="translate(92.5 164.5) rotate(-55.0)" fill="#1F3A2E"></path><path d="M111.3 162.4 l-2.8 6.1"></path><path d="M0 0 Q12.0 -9 24 0 Q12.0 9 0 0 Z M2 0 L21 0" transform="translate(131.2 160.6) rotate(42.9)" fill="#1F3A2E"></path><path d="M152.1 158.7 l-3.9 -5.5"></path><path d="M0 0 Q12.0 -9 24 0 Q12.0 9 0 0 Z M2 0 L21 0" transform="translate(171.8 156.6) rotate(-54.8)" fill="#1F3A2E"></path><path d="M191.7 153.9 l-2.4 6.3"></path><path d="M0 0 Q12.0 -9 24 0 Q12.0 9 0 0 Z M2 0 L21 0" transform="translate(210.7 150.5) rotate(36.3)" fill="#1F3A2E"></path><path d="M230.1 146.0 l-4.7 -4.8"></path><path d="M0 0 Q12.0 -9 24 0 Q12.0 9 0 0 Z M2 0 L21 0" transform="translate(250.0 140.0) rotate(-66.5)" fill="#1F3A2E"></path><path d="M268.2 133.4 l-1.0 6.6"></path><path d="M0 0 Q12.0 -9 24 0 Q12.0 9 0 0 Z M2 0 L21 0" transform="translate(287.5 125.4) rotate(23.8)" fill="#1F3A2E"></path><path d="M305.4 116.9 l-5.6 -3.7"></path><path d="M0 0 Q12.0 -9 24 0 Q12.0 9 0 0 Z M2 0 L21 0" transform="translate(323.3 107.6) rotate(-76.2)" fill="#1F3A2E"></path><path d="M340.4 98.2 l-0.1 6.7"></path><path d="M0 0 Q12.0 -9 24 0 Q12.0 9 0 0 Z M2 0 L21 0" transform="translate(358.0 88.6) rotate(19.6)" fill="#1F3A2E"></path><path d="M375.7 79.3 l-5.6 -3.7"></path><path d="M0 0 Q12.0 -9 24 0 Q12.0 9 0 0 Z M2 0 L21 0" transform="translate(393.6 70.8) rotate(-71.6)" fill="#1F3A2E"></path><path d="M412.5 63.3 l-1.2 6.6"></path><path d="M0 0 Q12.0 -9 24 0 Q12.0 9 0 0 Z M2 0 L21 0" transform="translate(431.4 57.3) rotate(32.9)" fill="#1F3A2E"></path><path d="M450.6 52.9 l-4.4 -5.1"></path><path d="M0 0 Q12.0 -9 24 0 Q12.0 9 0 0 Z M2 0 L21 0" transform="translate(471.0 49.9) rotate(-54.2)" fill="#1F3A2E"></path><path d="M490.7 48.3 l-3.1 6.0"></path><path d="M0 0 Q12.0 -9 24 0 Q12.0 9 0 0 Z M2 0 L21 0" transform="translate(510.9 47.8) rotate(47.9)" fill="#1F3A2E"></path><path d="M530.6 48.1 l-3.2 -5.9"></path><path d="M0 0 Q12.0 -9 24 0 Q12.0 9 0 0 Z M2 0 L21 0" transform="translate(550.8 48.8) rotate(-45.7)" fill="#1F3A2E"></path><path d="M570.6 49.6 l-3.5 5.7"></path><path d="M0 0 Q12.0 -9 24 0 Q12.0 9 0 0 Z M2 0 L21 0" transform="translate(591.1 49.9) rotate(47.6)" fill="#1F3A2E"></path><path d="M610.3 49.2 l-3.7 -5.6"></path><path d="M0 0 Q12.0 -9 24 0 Q12.0 9 0 0 Z M2 0 L21 0" transform="translate(630.3 47.1) rotate(-56.8)" fill="#1F3A2E"></path><path d="M650.1 43.0 l-1.7 6.5"></path><circle cx="659.1" cy="33.3" r="5.2" fill="#FBF8F2"></circle><circle cx="665.8" cy="38.1" r="5.2" fill="#FBF8F2"></circle><circle cx="663.2" cy="46.0" r="5.2" fill="#FBF8F2"></circle><circle cx="655.0" cy="46.0" r="5.2" fill="#FBF8F2"></circle><circle cx="652.4" cy="38.1" r="5.2" fill="#FBF8F2"></circle><circle cx="659.09999875" cy="40.297158" r="2.2" fill="#D0A0A2" stroke="none"></circle></svg>
```

### F · Ronces de l'accroche (1440 × 900, derrière l'en-tête et l'accroche, hors du texte)
```html
<svg aria-hidden="true" class="deco-accroche" width="1440" height="900" viewBox="0 0 1440 900" fill="none" stroke="#8A9A7B" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"><path d="M-40 830 C80 828 200 862 330 884 C380 892 440 896 520 906" stroke-width="1.6"></path><g transform="translate(-5.2 830.4) rotate(-45.8)"><path d="M0 0 Q18.0 -13 36 0 Q18.0 13 0 0 Z" fill="#E6DECF"></path><path d="M3 0 L31 0 M12.6 0 l4.3 -5.9 M12.6 0 l4.3 5.9 M21.6 0 l3.6 -4.5 M21.6 0 l3.6 4.5"></path></g><path d="M28.5 832.4 l-5.7 8.2"></path><g transform="translate(61.0 835.7) rotate(54.8)"><path d="M0 0 Q18.0 -13 36 0 Q18.0 13 0 0 Z" fill="#E6DECF"></path><path d="M3 0 L31 0 M12.6 0 l4.3 -5.9 M12.6 0 l4.3 5.9 M21.6 0 l3.6 -4.5 M21.6 0 l3.6 4.5"></path></g><path d="M93.7 840.1 l-3.7 -9.3"></path><g transform="translate(126.6 845.4) rotate(-38.2)"><path d="M0 0 Q18.0 -13 36 0 Q18.0 13 0 0 Z" fill="#E6DECF"></path><path d="M3 0 L31 0 M12.6 0 l4.3 -5.9 M12.6 0 l4.3 5.9 M21.6 0 l3.6 -4.5 M21.6 0 l3.6 4.5"></path></g><path d="M158.4 851.2 l-6.5 7.6"></path><g transform="translate(191.8 857.6) rotate(59.1)"><path d="M0 0 Q18.0 -13 36 0 Q18.0 13 0 0 Z" fill="#E6DECF"></path><path d="M3 0 L31 0 M12.6 0 l4.3 -5.9 M12.6 0 l4.3 5.9 M21.6 0 l3.6 -4.5 M21.6 0 l3.6 4.5"></path></g><path d="M224.2 864.0 l-3.2 -9.5"></path><g transform="translate(255.6 870.2) rotate(-36.9)"><path d="M0 0 Q18.0 -13 36 0 Q18.0 13 0 0 Z" fill="#E6DECF"></path><path d="M3 0 L31 0 M12.6 0 l4.3 -5.9 M12.6 0 l4.3 5.9 M21.6 0 l3.6 -4.5 M21.6 0 l3.6 4.5"></path></g><path d="M288.7 876.6 l-6.5 7.6"></path><g transform="translate(320.9 882.4) rotate(57.9)"><path d="M0 0 Q18.0 -13 36 0 Q18.0 13 0 0 Z" fill="#E6DECF"></path><path d="M3 0 L31 0 M12.6 0 l4.3 -5.9 M12.6 0 l4.3 5.9 M21.6 0 l3.6 -4.5 M21.6 0 l3.6 4.5"></path></g><path d="M353.7 887.4 l-3.8 -9.2"></path><g transform="translate(386.6 891.4) rotate(-41.7)"><path d="M0 0 Q18.0 -13 36 0 Q18.0 13 0 0 Z" fill="#E6DECF"></path><path d="M3 0 L31 0 M12.6 0 l4.3 -5.9 M12.6 0 l4.3 5.9 M21.6 0 l3.6 -4.5 M21.6 0 l3.6 4.5"></path></g><path d="M419.4 894.8 l-5.9 8.1"></path><g transform="translate(452.4 898.3) rotate(54.0)"><path d="M0 0 Q18.0 -13 36 0 Q18.0 13 0 0 Z" fill="#E6DECF"></path><path d="M3 0 L31 0 M12.6 0 l4.3 -5.9 M12.6 0 l4.3 5.9 M21.6 0 l3.6 -4.5 M21.6 0 l3.6 4.5"></path></g><path d="M485.3 901.9 l-4.0 -9.2"></path><g fill="#D0A0A2" stroke="none"><circle cx="511.2" cy="895.9" r="7"></circle><circle cx="522.7" cy="895.9" r="7"></circle><circle cx="517.0" cy="886.0" r="7"></circle><circle cx="517.0" cy="905.8" r="7"></circle><circle cx="505.4" cy="905.8" r="7"></circle><circle cx="528.5" cy="905.8" r="7"></circle><circle cx="522.7" cy="915.7" r="7"></circle></g><path d="M34 880 C46 790 18 700 32 610 C42 540 20 470 28 390" stroke-width="1.6"></path><g transform="translate(37.0 820.6) rotate(-139.1)"><path d="M0 0 Q14.0 -10 28 0 Q14.0 10 0 0 Z" fill="#E6DECF"></path><path d="M3 0 L23 0 M9.8 0 l3.4 -4.5 M9.8 0 l3.4 4.5 M16.8 0 l2.8 -3.5 M16.8 0 l2.8 3.5"></path></g><path d="M35.7 790.0 l9.0 4.5"></path><g transform="translate(33.4 758.5) rotate(-46.7)"><path d="M0 0 Q14.0 -10 28 0 Q14.0 10 0 0 Z" fill="#E6DECF"></path><path d="M3 0 L23 0 M9.8 0 l3.4 -4.5 M9.8 0 l3.4 4.5 M16.8 0 l2.8 -3.5 M16.8 0 l2.8 3.5"></path></g><path d="M30.9 727.9 l-8.2 5.7"></path><g transform="translate(28.8 697.3) rotate(-140.9)"><path d="M0 0 Q14.0 -10 28 0 Q14.0 10 0 0 Z" fill="#E6DECF"></path><path d="M3 0 L23 0 M9.8 0 l3.4 -4.5 M9.8 0 l3.4 4.5 M16.8 0 l2.8 -3.5 M16.8 0 l2.8 3.5"></path></g><path d="M28.0 665.8 l8.6 5.0"></path><g transform="translate(29.1 635.2) rotate(-37.6)"><path d="M0 0 Q14.0 -10 28 0 Q14.0 10 0 0 Z" fill="#E6DECF"></path><path d="M3 0 L23 0 M9.8 0 l3.4 -4.5 M9.8 0 l3.4 4.5 M16.8 0 l2.8 -3.5 M16.8 0 l2.8 3.5"></path></g><path d="M32.8 603.7 l-9.2 4.0"></path><g transform="translate(34.6 572.8) rotate(-137.5)"><path d="M0 0 Q14.0 -10 28 0 Q14.0 10 0 0 Z" fill="#E6DECF"></path><path d="M3 0 L23 0 M9.8 0 l3.4 -4.5 M9.8 0 l3.4 4.5 M16.8 0 l2.8 -3.5 M16.8 0 l2.8 3.5"></path></g><path d="M33.8 542.5 l8.9 4.5"></path><g transform="translate(31.4 511.0) rotate(-47.0)"><path d="M0 0 Q14.0 -10 28 0 Q14.0 10 0 0 Z" fill="#E6DECF"></path><path d="M3 0 L23 0 M9.8 0 l3.4 -4.5 M9.8 0 l3.4 4.5 M16.8 0 l2.8 -3.5 M16.8 0 l2.8 3.5"></path></g><path d="M28.7 480.4 l-8.2 5.7"></path><g transform="translate(26.7 449.8) rotate(-140.5)"><path d="M0 0 Q14.0 -10 28 0 Q14.0 10 0 0 Z" fill="#E6DECF"></path><path d="M3 0 L23 0 M9.8 0 l3.4 -4.5 M9.8 0 l3.4 4.5 M16.8 0 l2.8 -3.5 M16.8 0 l2.8 3.5"></path></g><path d="M26.3 418.4 l8.5 5.2"></path><circle cx="27.9" cy="375.8" r="11" fill="#FBF8F2"></circle><circle cx="42.2" cy="386.2" r="11" fill="#FBF8F2"></circle><circle cx="36.7" cy="402.9" r="11" fill="#FBF8F2"></circle><circle cx="19.1" cy="402.9" r="11" fill="#FBF8F2"></circle><circle cx="13.7" cy="386.2" r="11" fill="#FBF8F2"></circle><circle cx="27.920997703703705" cy="390.79966703703707" r="5" fill="#D0A0A2" stroke="none"></circle><path d="M1470 150 C1440 190 1420 230 1414 300" stroke-width="1.6"></path><g transform="translate(1456.4 169.3) rotate(75.2)"><path d="M0 0 Q13.0 -10 26 0 Q13.0 10 0 0 Z" fill="#E6DECF"></path><path d="M3 0 L21 0 M9.1 0 l3.1 -4.5 M9.1 0 l3.1 4.5 M15.6 0 l2.6 -3.5 M15.6 0 l2.6 3.5"></path></g><path d="M1443.0 192.0 l-5.4 -8.4"></path><g transform="translate(1432.2 215.7) rotate(159.2)"><path d="M0 0 Q13.0 -10 26 0 Q13.0 10 0 0 Z" fill="#E6DECF"></path><path d="M3 0 L21 0 M9.1 0 l3.1 -4.5 M9.1 0 l3.1 4.5 M15.6 0 l2.6 -3.5 M15.6 0 l2.6 3.5"></path></g><path d="M1424.2 240.0 l9.7 -2.5"></path><g transform="translate(1418.5 265.5) rotate(52.1)"><path d="M0 0 Q13.0 -10 26 0 Q13.0 10 0 0 Z" fill="#E6DECF"></path><path d="M3 0 L21 0 M9.1 0 l3.1 -4.5 M9.1 0 l3.1 4.5 M15.6 0 l2.6 -3.5 M15.6 0 l2.6 3.5"></path></g><path d="M1414.9 291.1 l-8.1 -5.9"></path><g fill="#D0A0A2" stroke="none"><circle cx="1406.1" cy="289.3" r="7"></circle><circle cx="1417.6" cy="289.3" r="7"></circle><circle cx="1411.8" cy="279.4" r="7"></circle><circle cx="1411.8" cy="299.2" r="7"></circle><circle cx="1400.3" cy="299.2" r="7"></circle><circle cx="1423.4" cy="299.2" r="7"></circle><circle cx="1417.6" cy="309.1" r="7"></circle></g></svg>
```

### G · Repère du plan (40 × 52)
```html
<svg width="40" height="52" viewBox="0 0 40 52" aria-hidden="true"><path d="M20 50 C20 50 4 30 4 19 A16 16 0 0 1 36 19 C36 30 20 50 20 50 Z" fill="#A3404F"></path><circle cx="20" cy="19" r="6" fill="#F4EFE6"></circle></svg>
```

## Décisions prises (24/11)

- Erreurs de formulaire : rouge brique distinct de la pivoine.
- Plan : image statique, style sur mesure en niveaux de gris.
- Section « Notre façon de faire » : conservée.
- Surtitre « Fleuriste à Nantes » et légende de la photo d'accroche : ajoutés à `textes.md` (v1.2).
- Mot-symbole du logo : vectorisé (`contenu/logo/`).

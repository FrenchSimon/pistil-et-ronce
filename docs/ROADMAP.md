# Roadmap — Pistil & Ronce

Objectif : un site vitrine one page en ligne en **~1 semaine** (≈ 5 jours de travail), au niveau d'un vrai client.
Règle : chaque étape se termine par un livrable que je valide avant de passer à la suivante. Le temps est noté dans `docs/TEMPS-PASSE.md` (local, hors du dépôt).

| # | Étape | Livrable à valider | Estimation | Statut |
|---|---|---|---|---|
| 1 | Textes | `docs/textes.md` | 0,5 j | ✅ validé le 24/11 |
| 2 | Photos | Planche de sélection + `docs/photos.md` | 0,5 j | ✅ validé le 24/11 (définitif quand le site sera avancé) |
| 3 | Direction artistique | Planche de style + maquette de l'accroche | 1 j | ✅ validé le 24/11 |
| 4 | Stack | Proposition argumentée (`docs/stack.md`) | 0,25 j | ✅ validé le 24/11 : Astro 7 |
| 5 | Réalisation | Site complet en local | 2 j | ✅ terminé le 25/11 (socle et sections le 24/11 ; mentions légales, appels à l'action, page 404, animations, SEO et sécurité le 25/11) |
| 6 | Recette qualité | Rapport a11y, perf, SEO, sécurité, responsive | 0,5 j | 🟡 recette automatisée le 25/11 (`docs/recette.md`) ; tests manuels à faire |
| 7 | Mise en ligne | URL Vercel de production | 0,25 j | — |
| 8 | Étude de cas | Fiche portfolio à jour | — | — |

## 2. Photos — `docs/photos`

- [x] Lister les besoins : accroche (1, format large), prestations (4), galerie (6 à 8), image de partage Open Graph (1).
- [x] Chercher sur Unsplash / Pexels une série cohérente (lumière, tons, style) : 2 ou 3 candidates par emplacement.
- [x] Vérifier qu'aucune photo ne montre l'enseigne ou le logo d'un vrai fleuriste.
- [x] Noter auteur, source et URL dans `docs/photos.md`. Adapter les textes alternatifs de la galerie (accord requis, texte validé).
- [x] **Livrable :** planche contact des choix, puis originaux dans `contenu/photos/` après validation.

## 3. Direction artistique — `docs/direction-artistique`

- [x] Ambiance : 2 ou 3 pistes courtes (mots-clés, références de style, pas de copie d'un vrai fleuriste).
- [x] Palette avec contrastes AA vérifiés pour chaque paire texte/fond.
- [x] Typographies libres et auto-hébergeables (titre + texte), avec sous-ensembles latins.
- [x] Logo typographique « Pistil & Ronce » et favicon (vectorisés dans `contenu/logo/`).
- [x] Composants : boutons, liens, champs, cartes de prestation, bandeau démo, états de focus.
- [x] **Livrable :** planche de style + maquette de l'accroche en mobile et en bureau.

## 4. Stack — `docs/stack.md`

- [x] Proposition argumentée selon les critères d'`AGENTS.md` : statique, rapide, sans CMS, Vercel. Pistes à comparer : Astro, Eleventy, HTML + Vite.
- [x] Points à trancher en même temps : pipeline d'images (AVIF/WebP, `srcset`), outil de rendu du plan statique (données OpenStreetMap, style en niveaux de gris), format des mentions légales (page dédiée ou fenêtre).

## 5. Réalisation — `feat/<section>`, un commit par section

1. [x] **Socle :** projet, polices, variables de style, mise en page, lien d'évitement, bandeau démo, en-tête et navigation, pied de page.
2. [x] **Accroche** (image LCP prioritaire, non différée).
3. [x] **Prestations.**
4. [x] **Notre façon de faire.**
5. [x] **Réalisations :** galerie responsive, images différées.
6. [x] **Avis**, avec la mention « Avis fictifs (démo) ».
7. [x] **Horaires et plan :** horaires en texte, adresse en texte, carte sans piège clavier.
8. [x] **Contact :** formulaire accessible, validation, message de démo annoncé (`aria-live`), aucun envoi.
9. [x] **Mentions légales et confidentialité.**
10. [x] **Page 404 :** `src/pages/404.astro`, servie par Vercel pour toute adresse inconnue ; bandeau démo, en-tête, pied de page et `noindex` comme les autres pages ; illustration de fleur fanée, message court et bouton de retour à l'accueil (textes au § 12 de `textes.md`).
11. [x] **Animations :** apparitions discrètes au défilement et transitions au survol, en CSS ; désactivées avec `prefers-reduced-motion`, sans effet sur le LCP ni le CLS.
12. [x] **SEO :** `title`, `meta description`, Open Graph et image de partage, lien canonique, JSON-LD `Florist`, `noindex`, icône iOS, mots-clés dans le `h1` et deux `h2`.
13. [x] **Sécurité :** `vercel.json` avec les en-têtes HTTP (CSP stricte sans `unsafe-inline`, HSTS, `X-Robots-Tag: noindex`, cache des fichiers à empreinte), testés en local.

Une PR par lot cohérent (socle, sections, finitions), sans captures : elles restent en local.

## 6. Recette qualité

- [x] **Accessibilité :** navigation au clavier complète, axe sans erreur, contrastes (25/11, 2 corrections).
- [ ] **Lecteur d'écran :** VoiceOver sur le formulaire.
- [x] **Performance :** Lighthouse mobile ≥ 95, LCP < 2,5 s, INP < 200 ms, CLS < 0,1 (25/11 en local : 96 à 98, CLS corrigé ; à confirmer en production).
- [x] **Responsive :** 320, 375, 768, 1024, 1440 et 1920 px dans Chrome, sans débordement (25/11).
- [ ] **Navigateurs :** Firefox, Safari, iOS, Android, à la main.
- [ ] **Sécurité :** `npm audit` propre, note A sur securityheaders.com (après mise en ligne de prévisualisation).
- [x] **Fiction :** relire que rien ne renvoie à une vraie boutique (liens, données structurées, photos).
- [x] **Livrable :** tableau des résultats dans `docs/recette.md`, résumé dans la PR.

## 7. Mise en ligne

- [ ] Projet Vercel relié au dépôt, prévisualisation sur chaque PR, production sur `main`.
- [ ] Vérifier en production : en-têtes HTTP, `noindex`, image de partage (aperçu Open Graph), Lighthouse.
- [ ] Ajouter le lien du site et du code dans le portfolio.

## 8. Étude de cas

- [ ] Temps total par étape (`docs/TEMPS-PASSE.md`) comparé à la promesse d'~1 semaine.
- [ ] Captures avant/après, scores Lighthouse, bilan du design obtenu avec l'IA (ce qui a marché, ce qu'il a fallu reprendre).
- [ ] Mettre à jour `demo-fleuriste.md` et le journal de `ROADMAP.md` du portfolio.

## Décisions ouvertes

- [x] Adresse du site : sous-domaine Vercel, `pistil-et-ronce.vercel.app` (décidé le 25/11).
- [x] Carte : image statique, style sur mesure en niveaux de gris (décidé le 24/11).
- [x] Section « Notre façon de faire » : gardée (décidé le 24/11).

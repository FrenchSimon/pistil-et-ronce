# Recette qualité — Pistil & Ronce

> Étape 6 de la roadmap. Recette du 25/11/2026 sur le site construit (`npm run build`), servi en local avec les en-têtes de `vercel.json` et la compression Brotli, comme sur Vercel.
> Outils : axe-core 4, Lighthouse 12, Playwright avec Google Chrome 150. Captures de 320 à 1920 px en local (`.playwright-mcp/recette/`, hors du dépôt).

## Synthèse

| Domaine | Critère | Résultat | Statut |
|---|---|---|---|
| Accessibilité | axe (WCAG 2.0, 2.1, 2.2 AA et bonnes pratiques), 3 pages + formulaire en erreur et envoyé | 0 violation (2 corrigées) | ✅ |
| Accessibilité | Lighthouse | 100 sur les 3 pages | ✅ |
| Accessibilité | Clavier : ordre, focus visible, élément focalisé à l'écran | 30 arrêts sur l'accueil, focus visible partout, aucun piège | ✅ |
| Accessibilité | Contrastes du texte posé sur image (accroche, navigation) | Mesurés au pixel : 5,4:1 au minimum | ✅ |
| Accessibilité | Formulaire | Erreurs reliées aux champs (`aria-describedby`, `aria-invalid`), focus sur le premier champ en erreur, message de démo annoncé (`aria-live="polite"`) | ✅ |
| Accessibilité | `prefers-reduced-motion` | Aucune animation ni transition, aucun contenu laissé invisible | ✅ |
| Accessibilité | VoiceOver sur le formulaire | À faire à la main | ⏳ |
| Performance | Lighthouse mobile, accueil (3 passes) | 96 · 98 · 97 ; LCP 2,1 à 2,4 s ; CLS 0 ; TBT 0 ms | ✅ |
| Performance | Lighthouse bureau, accueil (3 passes) | 99 · 100 · 99 ; LCP 0,6 s ; CLS 0 (0,109 avant correction) | ✅ |
| Performance | Lighthouse mobile, mentions légales | 99 ; LCP 1,7 s | ✅ |
| Performance | Poids de l'accueil | 236 Ko transférés en mobile | ✅ |
| SEO | Lighthouse | 66 : seul l'audit « page indexable » échoue, à cause du `noindex` voulu | ✅ |
| SEO | Un `h1` par page, titres hiérarchisés, `title`, `meta description`, `lang="fr"`, `noindex` | Conformes sur les 3 pages | ✅ |
| Responsive | 320, 375, 768, 1024, 1440, 1920 px, 3 pages | Aucun débordement horizontal | ✅ |
| Navigateurs | Chrome | Testé | ✅ |
| Navigateurs | Firefox, Safari, iOS, Android | À faire à la main (Playwright ne prend plus en charge Firefox ni WebKit sous macOS 12) | ⏳ |
| Sécurité | `npm audit` | 0 faille | ✅ |
| Sécurité | CSP stricte | Aucune violation sur les 3 pages ni sur le formulaire ; un style injecté par test est bien bloqué | ✅ |
| Sécurité | Liens externes | Tous en `rel="noopener noreferrer"` | ✅ |
| Sécurité | Note securityheaders.com | Après la première mise en ligne de prévisualisation | ⏳ |
| Fiction | Données structurées, liens, coordonnées | Téléphone du bloc 02 61 91 réservé à la fiction, `pistil-et-ronce.fr` non enregistré, JSON-LD signalé comme fictif (`disambiguatingDescription`), aucun lien vers une vraie boutique | ✅ |

## Corrections faites pendant la recette

1. **Bouton « Revenir en haut » hors repère** (axe `region`) : déplacé dans le pied de page.
2. **Légendes de la galerie lues deux fois** (axe `image-redundant-alt`) : le texte alternatif reprend la légende, la légende est masquée aux lecteurs d'écran.
3. **Décalage au chargement des polices** (CLS 0,109 en bureau, au-dessus du seuil de 0,1) : polices de repli ajustées aux métriques de Cormorant Garamond et de Karla. CLS ramené à 0.

## Points relevés, sans correction

- **Feuilles de style bloquantes** (2 fichiers, ~170 ms estimés en mobile) : les intégrer dans la page imposerait `unsafe-inline` ou des empreintes dans la CSP. Le score mobile reste ≥ 95, on garde la CSP stricte.
- **Taille du DOM** (avertissement Lighthouse) : vient des illustrations SVG du champ fleuri. Sans effet mesurable (TBT 0 ms).
- **Liens de la page Mentions légales hauts de 20 px** : ce sont des liens dans le texte, exemptés par le critère 2.5.8 (taille des cibles), et axe ne relève rien.
- **Mesures locales** : elles sont plus favorables que le réseau réel. À confirmer sur l'URL de production (étape 7).

## Reste à faire

- [ ] VoiceOver (macOS ou iOS) : parcours du formulaire, erreurs, message de démo.
- [ ] Firefox et Safari sur macOS ; Safari sur iPhone ; Chrome sur Android.
- [ ] securityheaders.com et Lighthouse sur l'URL de prévisualisation Vercel.

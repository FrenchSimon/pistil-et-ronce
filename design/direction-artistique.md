# Direction artistique — Pistil & Ronce

> Version 0 — 2026-11-24 · Statut : **à valider**
> Piste choisie le 24/11 : **1. Herbier**. Les pistes 2 (Atelier) et 3 (Jardin) sont écartées. Elles restent visibles dans `design/pistes.html`.
> Planche de style et maquettes de l'accroche dans un artifact Claude, privé jusqu'à ce que Simon le partage : https://claude.ai/artifact/9ybepd4uuKPYbJowbBgDTx

## Ambiance

Planches botaniques, papier vergé, encre vert sapin. Une seule couleur d'accent, la rouille, utilisée avec parcimonie. La photo d'accroche est encadrée comme un tirage posé sur la page, avec une légende manuscrite en italique.

## Palette

Contrastes calculés selon WCAG 2.2 (luminance relative).

| Nom | Hex | Rôle | Contraste sur papier |
|---|---|---|---|
| Papier | `#F4EFE6` | Fond principal | — |
| Papier clair | `#FBF8F2` | Cartes, champs | — |
| Lin | `#E6DECF` | Filets, séparateurs | décor |
| Encre sapin | `#1F3A2E` | Texte, boutons, bandeau démo | 10,8:1 ✔ |
| Sapin doux | `#4A5F53` | Texte secondaire, bordures de champ | 6,0:1 ✔ (5,2:1 sur lin) |
| Rouille | `#A4502F` | Accent, focus, erreurs | 4,9:1 ✔ · **4,2:1 sur lin ✗** |
| Sauge | `#8A9A7B` | Décor seulement | 2,6:1, jamais en texte |

Règles :
- **Rouille :** jamais en petit texte sur le lin, et jamais sur le sapin (2,2:1). Sur fond sombre, l'esperluette du logo reste couleur papier.
- **Papier sur sapin :** 10,8:1, pour les boutons et le bandeau.

## Typographies (licence OFL, auto-hébergées en WOFF2, sous-ensemble latin)

| Rôle | Police | Graisses |
|---|---|---|
| Titres, surtitres, légendes | Cormorant Garamond | 500, 600, romain et italique |
| Texte et interface | Karla | 400, 500, 600 |

Échelle :

| Élément | Police et taille | Couleur |
|---|---|---|
| Titre 1 | 56/60, et 40 sur mobile (64 dans l'accroche bureau, 42 sur mobile) | |
| Titre 2 | 40/44, et 32 sur mobile | |
| Titre 3 | 26/32, en 600 | |
| Surtitre | Cormorant italique 20 | rouille |
| Texte | Karla 17/27 | |
| Étiquette | Karla 600 13, capitales, +0,12 em | |

## Logo et favicon

- **Logo :** « Pistil & Ronce » en Cormorant Garamond 600, esperluette italique rouille. En dessous, « Fleuriste · Nantes » en Karla 600, capitales espacées.
- **Favicon :** l'esperluette italique, couleur papier sur un carré vert sapin aux coins arrondis. Lisible jusqu'à 16 px.

## Composants

- **Boutons :** hauteur 48 à 52 px, angles droits. Le bouton principal est sapin, et passe en rouille au survol. Le bouton secondaire est un lien souligné, décalé de 6 px.
- **Focus clavier :** contour rouille de 2 px, décalé de 2 à 3 px, sur tous les éléments interactifs.
- **Champs :** 48 px de haut, fond papier clair, bordure sapin doux de 1 px. Au focus, bordure sapin de 2 px et contour rouille. En erreur, bordure rouille de 2 px et message relié au champ (`aria-describedby`).
- **Carte de prestation :** fond papier clair, filet lin, photo en haut. L'indication de prix est une étiquette en capitales, sous un filet.
- **Bandeau démo :** fond sapin, texte papier en 13 px. Sur mobile, il passe sur deux lignes.
- **Cibles tactiles :** 44 à 52 px.

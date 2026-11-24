# Pistil & Ronce

Toujours répondre en français (messages, synthèses, commentaires, docs, commits). Le site est en français uniquement.

## Contexte du projet

Site vitrine **one page** d'une fleuriste **fictive** à Nantes, démo du portfolio de Simon Dabin, développeur freelance.

- **But :** prouver l'offre « site vitrine one page » (550 € + 49 €/mois) auprès des PME, et mesurer le niveau de design obtenu avec l'IA, et en combien de temps.
- **Suivi :** fiche du projet dans `~/Local Sites/portfolio/docs/demo-fleuriste.md` (cocher ses cases à la fin de chaque étape) ; décisions importantes dans le journal de `~/Local Sites/portfolio/ROADMAP.md`.
- **Contenu validé :** `docs/textes.md`. Ne pas modifier un texte validé sans mon accord.

### Tout est fictif, et doit le rester

- Adresse « 2 rue des Glaneuses, 44000 Nantes » (rue inexistante, vérifié le 24/11/2026). Téléphone : bloc 02 61 91 xx xx, réservé par l'ARCEP à la fiction.
- E-mail, Instagram et avis fictifs : liens externes désactivés, avis marqués « Avis fictifs (démo) ».
- Bandeau « Boutique fictive — Site réalisé par Simon Dabin » sur toutes les pages, avec le lien « Voir le code ».
- Le formulaire n'envoie rien : il affiche un message de démo.
- Ne jamais reprendre le nom, le logo ou les photos d'un vrai fleuriste.

### Photos

- Uniquement Unsplash ou Pexels ; noter auteur, source et URL de chacune dans `docs/photos.md`.
- Optimiser comme pour un vrai client : AVIF/WebP, plusieurs tailles, dimensions explicites.

## Workflow de travail

- Avancer **étape par étape**, dans l'ordre de la fiche : textes → photos → direction artistique → réalisation → mise en ligne.
- **Ne jamais commencer une étape avant que j'aie validé la précédente.** Présenter chaque livrable, puis attendre ma validation.
- **Chronométrer :** noter le temps de chaque session dans `docs/TEMPS-PASSE.md`, fichier local ignoré par Git : le temps passé ne doit pas être public (pour confirmer le délai d'environ 1 semaine de l'offre).
- Me rappeler brièvement l'étape en cours, la prochaine action à valider et les blocages éventuels.

## Stack

- **À décider** à l'étape « Réalisation », par une proposition argumentée que je valide : site statique, rapide, sans CMS, hébergé sur Vercel.
- Ne pas se fier à sa mémoire pour les API des outils : consulter la documentation de la version installée.

## Git et GitHub

- Commits **atomiques** (un changement cohérent), au format **Conventional Commits** en français : `feat: ajoute la section Prestations`, `fix:`, `docs:`, `chore:`, `style:`.
- `main` reste toujours déployable ; chaque étape se fait sur une branche `feat/<nom>` ou `docs/<nom>`.
- Créer des branches et commiter **en local sans me demander**. **Ne jamais pousser sans que je le demande.**
- Fusion dans `main` uniquement par **pull request**, **après mon accord**. La PR dit ce qui change et comment le vérifier. Les captures servent à vérifier le rendu en local (`.playwright-mcp/`, ignoré par Git) : jamais sur le dépôt distant, ni dans les PR.
- **Ne jamais supprimer une branche** (locale ou distante) sans mon accord, même après une fusion : pas de `--delete-branch`. Proposer le nettoyage et attendre ma réponse.
- **Le dépôt est public et sert de vitrine pour des clients potentiels :** il doit rester propre et lisible.
  - Le `README` présente le projet : but, stack, captures, lien vers la démo.
  - Les messages de commit et les descriptions de PR sont soignés.
  - Aucun fichier temporaire, brouillon ou capture de test n'est versionné.
  - Pas de code commenté ni de `TODO` oublié.
  - Les branches fusionnées sont supprimées, après mon accord.

## Sécurité

- Jamais de secret dans le dépôt (`.env`, clés, jetons) ; `.env` et `.env*.local` sont ignorés par Git.
- Aucun script tiers (analytics, widgets, CDN) : tout est auto-hébergé. Sinon, version figée et `integrity` (SRI).
- En-têtes HTTP via `vercel.json` : CSP stricte (`default-src 'self'`, pas d'`unsafe-inline` si possible, `frame-ancestors 'none'`), HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` restrictive. Viser A sur securityheaders.com.
- Dépendances minimales et à jour : `npm audit` sans faille haute ou critique avant chaque PR.
- Formulaire : aucun envoi ni stockage, aucune donnée injectée dans le DOM via `innerHTML`.
- Liens externes éventuels en `rel="noopener noreferrer"` ; carte intégrée en `iframe` avec `sandbox` et `loading="lazy"`.

## Qualité (avant chaque PR qui touche au site)

### Accessibilité (WCAG 2.2 AA / RGAA)

- HTML sémantique : un seul `h1`, titres hiérarchisés, landmarks (`header`, `nav`, `main`, `footer`), lien d'évitement.
- Tout au clavier, focus toujours visible. Cibles tactiles ≥ 24 × 24 px.
- Contrastes AA : 4,5:1 pour le texte, 3:1 pour le grand texte et les éléments d'interface.
- Textes alternatifs pertinents, `alt=""` pour les images décoratives.
- Formulaire : `label` sur chaque champ, erreurs explicites reliées au champ, confirmation annoncée (`aria-live`).
- Animations discrètes, qui respectent `prefers-reduced-motion`.
- La carte ne piège pas le clavier, et l'adresse est aussi écrite en texte.

### Performance

- Lighthouse ≥ 95 sur mobile. LCP < 2,5 s, INP < 200 ms, CLS < 0,1.
- Polices auto-hébergées, `font-display: swap`, sous-ensembles.
- Images responsives (`srcset`, AVIF/WebP), chargement différé sous la ligne de flottaison.
- Carte chargée au clic ou à l'approche, ou remplacée par une image statique.

### SEO, responsive et légal

- `title` et `meta description` repris de `docs/textes.md` ; Open Graph avec image de partage ; données structurées `Florist` (schema.org) avec les infos fictives.
- `noindex` : la démo ne doit pas tromper un internaute qui cherche un vrai fleuriste.
- Mobile d'abord, testé de 320 à 1920 px, sur Chrome, Firefox, Safari (+ iOS et Android).
- Mentions légales et confidentialité adaptées à une démo : éditeur Simon Dabin, hébergeur, aucune donnée collectée.
- Aucun cookie ni traceur, donc pas de bandeau cookies.

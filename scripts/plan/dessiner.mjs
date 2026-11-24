/*
 * Plan de « Nous trouver », étape 2 : tracé SVG des données de `donnees.json`
 * aux couleurs de la direction artistique, puis conversion en image par Chrome
 * (Playwright), pour que les noms de rues soient bien en Karla.
 *
 * `npm run plan` écrit `src/assets/plan/plan-nantes.png` (traité ensuite par le
 * pipeline AVIF/WebP d'Astro) et `src/assets/plan/repere.css` (position du repère,
 * posé en HTML par-dessus l'image). Rien de ce script n'est servi aux visiteurs.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { geoMercator, geoPath } from 'd3-geo';
import { chromium } from 'playwright';

/* Taille en pixels CSS, rendue en densité 2 */
const LARGEUR = 960;
const HAUTEUR = 800;
const DENSITE = 2;

/* L'adresse est fictive : repère posé au cœur d'un îlot, sur aucune rue nommée, ~5 min à pied de Commerce */
const REPERE = [-1.5538, 47.2161];
const ARRET = { nom: 'Commerce', position: [-1.55577, 47.21412] };

/* Couleurs de la DA ; parcs en sauge fondue dans le papier, eau en bleu-gris pâle (couleur réservée au plan) */
const COULEURS = {
  fond: '#F4EFE6',
  ilot: '#E6DECF',
  rue: '#FBF8F2',
  eau: '#BFD3DA',
  parc: '#DADCCD',
  tram: '#8A9A7B',
  texte: '#4A5F53',
  arret: '#1F3A2E',
};

const LARGEUR_RUE = {
  primary: 9, secondary: 8, tertiary: 7, unclassified: 5.5, residential: 5.5,
  living_street: 5, pedestrian: 5, service: 3, footway: 2.2, trunk: 10, motorway: 10,
};

/* Rues étiquetées, par ordre de priorité */
const RUES_ETIQUETEES = ['primary', 'secondary', 'tertiary', 'pedestrian', 'residential', 'living_street', 'unclassified'];
const TAILLE_TEXTE = 21;

/* Cadre du plan (sud, ouest, nord, est), plus serré que l'emprise extraite */
const CADRE = [47.2117, -1.5612, 47.2183, -1.5498];

const { elements } = JSON.parse(await readFile(new URL('./donnees.json', import.meta.url), 'utf8'));
const [sud, ouest, nord, est] = CADRE;

/* Reconstitue les anneaux d'un multipolygone à partir de ses chemins (bout à bout) */
function assemblerAnneaux(chemins) {
  const restants = chemins.map((chemin) => [...chemin]);
  const anneaux = [];
  const memePoint = (a, b) => a[0] === b[0] && a[1] === b[1];
  while (restants.length) {
    const anneau = restants.shift();
    let prolonge = true;
    while (!memePoint(anneau[0], anneau.at(-1)) && prolonge) {
      prolonge = false;
      for (let i = 0; i < restants.length; i++) {
        const chemin = restants[i];
        if (memePoint(chemin[0], anneau.at(-1))) anneau.push(...chemin.slice(1));
        else if (memePoint(chemin.at(-1), anneau.at(-1))) anneau.push(...chemin.reverse().slice(1));
        else continue;
        restants.splice(i, 1);
        prolonge = true;
        break;
      }
    }
    if (anneau.length > 3) anneaux.push(anneau);
  }
  return anneaux;
}

/* GeoJSON attend des anneaux extérieurs dans le sens horaire pour d3 (sphérique) */
function orienter(anneau) {
  let aire = 0;
  for (let i = 0; i < anneau.length - 1; i++) aire += (anneau[i + 1][0] - anneau[i][0]) * (anneau[i + 1][1] + anneau[i][1]);
  return aire > 0 ? anneau : [...anneau].reverse();
}

const polygone = (anneaux) => ({ type: 'Polygon', coordinates: anneaux.map(orienter) });
const ligne = (coordonnees) => ({ type: 'LineString', coordinates: coordonnees });

const projection = geoMercator().fitExtent(
  [[0, 0], [LARGEUR, HAUTEUR]],
  { type: 'Feature', geometry: polygone([[[ouest, sud], [ouest, nord], [est, nord], [est, sud], [ouest, sud]]]) },
);
const tracer = geoPath(projection);

const couches = { eau: [], parc: [], ilot: [], tram: [], rues: [] };
const nommees = [];

for (const element of elements) {
  const { tags } = element;
  if (element.type === 'relation') {
    const exterieurs = assemblerAnneaux(element.membres.filter((m) => m.role === 'outer').map((m) => m.geometrie));
    const cible = tags.natural === 'water' ? couches.eau : couches.parc;
    for (const anneau of exterieurs) cible.push(tracer(polygone([anneau])));
    continue;
  }
  const geometrie = element.geometrie;
  if (tags.tunnel && tags.tunnel !== 'no') continue;
  if (tags.natural === 'water' || tags.waterway === 'riverbank') couches.eau.push(tracer(polygone([geometrie])));
  else if (tags.leisure || tags.landuse === 'grass') couches.parc.push(tracer(polygone([geometrie])));
  else if (tags.building) couches.ilot.push(tracer(polygone([geometrie])));
  else if (tags.railway === 'tram') couches.tram.push(tracer(ligne(geometrie)));
  else if (tags.highway) {
    if (tags.area === 'yes') {
      couches.rues.push({ d: tracer(polygone([geometrie])), surface: true });
      continue;
    }
    couches.rues.push({ d: tracer(ligne(geometrie)), largeur: (LARGEUR_RUE[tags.highway] ?? 4) * 1.5 });
    if (tags.name && RUES_ETIQUETEES.includes(tags.highway)) nommees.push({ nom: tags.name, classe: tags.highway, geometrie });
  }
}

/* Étiquettes : les tronçons d'une même rue sont aboutés, puis le texte est posé sur la portion
   la plus droite et la plus centrale de la rue, sans chevaucher une autre étiquette */
const longueur = (points) => points.slice(1).reduce((somme, p, i) => somme + Math.hypot(p[0] - points[i][0], p[1] - points[i][1]), 0);
const dansLeCadre = ([x, y]) => x > 24 && x < LARGEUR - 24 && y > 24 && y < HAUTEUR - 24;
const memePoint = (a, b) => a[0] === b[0] && a[1] === b[1];

function abouter(chemins) {
  const restants = chemins.map((c) => [...c]);
  const chaines = [];
  while (restants.length) {
    let chaine = restants.shift();
    for (let sens = 0; sens < 2; sens++) {
      let i;
      while ((i = restants.findIndex((c) => memePoint(c[0], chaine.at(-1)) || memePoint(c.at(-1), chaine.at(-1)))) !== -1) {
        const [suite] = restants.splice(i, 1);
        chaine.push(...(memePoint(suite[0], chaine.at(-1)) ? suite : suite.reverse()).slice(1));
      }
      chaine = chaine.reverse();
    }
    chaines.push(chaine);
  }
  return chaines;
}

/* Points régulièrement espacés le long d'un tracé */
function echantillonner(points, pas) {
  const echantillons = [];
  for (let i = 0; i < points.length - 1; i++) {
    const [a, b] = [points[i], points[i + 1]];
    const n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / pas));
    for (let k = 0; k < n; k++) echantillons.push([a[0] + ((b[0] - a[0]) * k) / n, a[1] + ((b[1] - a[1]) * k) / n]);
  }
  echantillons.push(points.at(-1));
  return echantillons;
}

/* Portions consécutives d'un tracé à l'intérieur du cadre */
function portionsDansLeCadre(points) {
  const portions = [[]];
  for (const point of points) {
    if (dansLeCadre(point)) portions.at(-1).push(point);
    else if (portions.at(-1).length) portions.push([]);
  }
  return portions.filter((portion) => portion.length > 1);
}

const PAS = 4;
const rues = new Map();
for (const { nom, classe, geometrie } of nommees) {
  const rue = rues.get(nom) ?? { nom, classe, chemins: [] };
  if (RUES_ETIQUETEES.indexOf(classe) < RUES_ETIQUETEES.indexOf(rue.classe)) rue.classe = classe;
  rue.chemins.push(geometrie);
  rues.set(nom, rue);
}

const REPERE_PROJETE = projection(REPERE);
const ARRET_PROJETE = projection(ARRET.position);
/* Zones réservées : le repère, puis l'arrêt et son nom (environ 180 px de long) */
const zonesOccupees = [
  [REPERE_PROJETE[0], REPERE_PROJETE[1] - 26, 34],
  ...Array.from({ length: 20 }, (_, i) => [ARRET_PROJETE[0] + i * 10, ARRET_PROJETE[1], 28]),
];
const libre = (points) => points.every(([x, y]) => zonesOccupees.every(([zx, zy, r]) => Math.hypot(x - zx, y - zy) > r));

function placer(rue) {
  const largeurTexte = rue.nom.length * TAILLE_TEXTE * 0.62 + 16;
  const fenetre = Math.ceil(largeurTexte / PAS);
  let meilleure = null;
  for (const chaine of abouter(rue.chemins)) {
    for (const portion of portionsDansLeCadre(chaine.map((p) => projection(p)))) {
      const echantillons = echantillonner(portion, PAS);
      for (let debut = 0; debut + fenetre < echantillons.length; debut += 2) {
        const morceau = echantillons.slice(debut, debut + fenetre + 1);
        const corde = Math.hypot(morceau.at(-1)[0] - morceau[0][0], morceau.at(-1)[1] - morceau[0][1]);
        if (corde / longueur(morceau) < 0.97 || !libre(morceau)) continue;
        /* Préférer le milieu de la rue visible */
        const ecart = Math.abs(debut + fenetre / 2 - echantillons.length / 2);
        if (!meilleure || ecart < meilleure.ecart) meilleure = { morceau, ecart };
      }
    }
  }
  if (!meilleure) return null;
  const { morceau } = meilleure;
  return morceau[0][0] > morceau.at(-1)[0] ? [...morceau].reverse() : morceau;
}

const etiquettes = [];
const triees = [...rues.values()].sort(
  (a, b) => RUES_ETIQUETEES.indexOf(a.classe) - RUES_ETIQUETEES.indexOf(b.classe)
    || longueur(b.chemins.flat().map((p) => projection(p))) - longueur(a.chemins.flat().map((p) => projection(p))),
);
for (const rue of triees) {
  const points = placer(rue);
  if (!points) continue;
  echantillonner(points, 8).forEach(([x, y]) => zonesOccupees.push([x, y, 26]));
  etiquettes.push({ nom: rue.nom, points });
  if (etiquettes.length >= 14) break;
}

const chemin = (points) => `M${points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L')}`;
const echapper = (texte) => texte.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${LARGEUR}" height="${HAUTEUR}" viewBox="0 0 ${LARGEUR} ${HAUTEUR}">
  <rect width="100%" height="100%" fill="${COULEURS.fond}"/>
  <g fill="${COULEURS.parc}">${couches.parc.map((d) => `<path d="${d}"/>`).join('')}</g>
  <g fill="${COULEURS.eau}">${couches.eau.map((d) => `<path d="${d}"/>`).join('')}</g>
  <g fill="${COULEURS.ilot}">${couches.ilot.map((d) => `<path d="${d}"/>`).join('')}</g>
  <g fill="${COULEURS.rue}">${couches.rues.filter((r) => r.surface).map(({ d }) => `<path d="${d}"/>`).join('')}</g>
  <g fill="none" stroke="${COULEURS.rue}" stroke-linecap="round" stroke-linejoin="round">${couches.rues
    .filter((r) => !r.surface)
    .sort((a, b) => a.largeur - b.largeur)
    .map(({ d, largeur }) => `<path d="${d}" stroke-width="${largeur}"/>`)
    .join('')}</g>
  <g fill="none" stroke="${COULEURS.tram}" stroke-width="1.4" stroke-dasharray="5 3">${couches.tram.map((d) => `<path d="${d}"/>`).join('')}</g>
  <defs>${etiquettes.map(({ points }, i) => `<path id="r${i}" d="${chemin(points)}"/>`).join('')}</defs>
  <g font-family="Karla" font-weight="600" font-size="${TAILLE_TEXTE}" fill="${COULEURS.texte}" letter-spacing="0.4" dominant-baseline="central"
     stroke="${COULEURS.fond}" stroke-width="4" stroke-linejoin="round" paint-order="stroke">${etiquettes
    .map(({ nom }, i) => `<text><textPath href="#r${i}" startOffset="50%" text-anchor="middle">${echapper(nom)}</textPath></text>`)
    .join('')}</g>
  <g>
    <circle cx="${ARRET_PROJETE[0]}" cy="${ARRET_PROJETE[1]}" r="6" fill="${COULEURS.fond}" stroke="${COULEURS.arret}" stroke-width="2.5"/>
    <text x="${ARRET_PROJETE[0] + 16}" y="${ARRET_PROJETE[1]}" dominant-baseline="central" font-family="Karla" font-weight="600" font-size="21"
      fill="${COULEURS.arret}" stroke="${COULEURS.fond}" stroke-width="3" paint-order="stroke">Tram ${ARRET.nom}</text>
  </g>
</svg>`;

/* Police embarquée : une page chargée par setContent ne peut pas lire de fichier local */
const police = (await readFile(new URL('../../src/assets/fonts/karla-latin-600-normal.woff2', import.meta.url))).toString('base64');
const page = `<!doctype html><html><head><style>
  @font-face { font-family: 'Karla'; font-weight: 600; src: url('data:font/woff2;base64,${police}') format('woff2'); }
  html, body { margin: 0; }
</style></head><body>${svg}</body></html>`;

const navigateur = await chromium.launch({ channel: 'chrome' });
const onglet = await navigateur.newPage({ viewport: { width: LARGEUR, height: HAUTEUR }, deviceScaleFactor: DENSITE });
await onglet.setContent(page);
await onglet.evaluate(() => document.fonts.ready);
const sortie = new URL('../../src/assets/plan/', import.meta.url);
await mkdir(sortie, { recursive: true });
await onglet.locator('svg').screenshot({ path: fileURLToPath(new URL('plan-nantes.png', sortie)) });
await navigateur.close();

/* Position du repère en pourcentage de l'image, en variables CSS (un attribut style serait bloqué par la CSP) */
const pourcent = (valeur, total) => `${((valeur / total) * 100).toFixed(2)}%`;
await writeFile(
  new URL('repere.css', sortie),
  `/* Écrit par scripts/plan/dessiner.mjs : position du repère sur le plan */\n.plan__cadre {\n  --repere-x: ${pourcent(REPERE_PROJETE[0], LARGEUR)};\n  --repere-y: ${pourcent(REPERE_PROJETE[1], HAUTEUR)};\n}\n`,
);
console.log(`Plan écrit : ${etiquettes.length} noms de rues (${etiquettes.map((e) => e.nom).join(', ')})`);

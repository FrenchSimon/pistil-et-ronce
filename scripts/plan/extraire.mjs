/*
 * Plan de « Nous trouver », étape 1 : extraction unique des données OpenStreetMap
 * (API Overpass) d'un quartier du centre de Nantes, autour de l'arrêt de tram Commerce.
 *
 * Lancé une fois à la main (`npm run plan:extraire`) ; le résultat, réduit aux seules
 * géométries et étiquettes utiles, est versionné dans `scripts/plan/donnees.json`.
 * Données © contributeurs OpenStreetMap, licence ODbL.
 */
import { writeFile } from 'node:fs/promises';

/* Sud, ouest, nord, est */
export const EMPRISE = [47.206, -1.566, 47.219, -1.545];

const requete = `
[out:json][timeout:90][bbox:${EMPRISE.join(',')}];
(
  way["highway"~"^(motorway|trunk|primary|secondary|tertiary|unclassified|residential|living_street|pedestrian|service|footway)$"];
  way["building"];
  way["railway"="tram"];
  way["natural"="water"];
  relation["natural"="water"];
  way["waterway"="riverbank"];
  way["leisure"~"^(park|garden)$"];
  relation["leisure"="park"];
  way["landuse"~"^(grass|forest|meadow|village_green)$"];
  relation["landuse"~"^(grass|forest)$"];
  way["natural"~"^(wood|scrub|grassland)$"];
  relation["natural"="wood"];
);
out geom;
`;

const ETIQUETTES_GARDEES = ['highway', 'building', 'railway', 'natural', 'waterway', 'leisure', 'landuse', 'name', 'area', 'tunnel', 'layer'];

const reponse = await fetch('https://overpass-api.de/api/interpreter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'plan-statique-demo/1.0' },
  body: new URLSearchParams({ data: requete }),
});
if (!reponse.ok) throw new Error(`Overpass : ${reponse.status} ${reponse.statusText}`);
const { elements } = await reponse.json();

const arrondir = ({ lat, lon }) => [Number(lon.toFixed(6)), Number(lat.toFixed(6))];

const elementsReduits = elements.map((element) => {
  const tags = Object.fromEntries(
    Object.entries(element.tags ?? {}).filter(([cle]) => ETIQUETTES_GARDEES.includes(cle)),
  );
  if (element.type === 'way') return { type: 'way', tags, geometrie: element.geometry.map(arrondir) };
  return {
    type: 'relation',
    tags,
    membres: element.members
      .filter((membre) => membre.type === 'way' && membre.geometry)
      .map((membre) => ({ role: membre.role, geometrie: membre.geometry.map(arrondir) })),
  };
});

await writeFile(
  new URL('./donnees.json', import.meta.url),
  JSON.stringify({ emprise: EMPRISE, source: '© contributeurs OpenStreetMap (ODbL)', elements: elementsReduits }),
);
console.log(`${elementsReduits.length} éléments enregistrés dans scripts/plan/donnees.json`);

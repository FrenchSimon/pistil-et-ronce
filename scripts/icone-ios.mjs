/**
 * Icône d'écran d'accueil iOS (apple-touch-icon), tirée du favicon SVG :
 * fond carré (iOS arrondit lui-même les coins, des coins transparents y deviendraient noirs)
 * et esperluette réduite à 80 % pour garder une marge sous l'arrondi.
 *
 * Usage : npm run icone
 */
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(racine, 'contenu/logo/favicon.svg');
const destination = path.join(racine, 'public/apple-touch-icon.png');

const TAILLE = 180;
const ECHELLE = 0.8;
const COTE = 64; // viewBox du favicon

const favicon = await readFile(source, 'utf8');
const marge = (COTE * (1 - ECHELLE)) / 2;
const icone = favicon
  .replace(/ rx="[^"]*"/, '')
  .replace(/<path /, `<g transform="translate(${marge} ${marge}) scale(${ECHELLE})"><path `)
  .replace(/<\/svg>\s*$/, '</g></svg>');

if (icone === favicon || !icone.includes('<g ')) {
  throw new Error('Structure du favicon inattendue : vérifier contenu/logo/favicon.svg.');
}

await mkdir(path.dirname(destination), { recursive: true });
await sharp(Buffer.from(icone), { density: (TAILLE / COTE) * 72 * 2 })
  .resize(TAILLE, TAILLE)
  .png({ compressionLevel: 9, palette: true })
  .toFile(destination);

console.log(`Icône écrite : ${path.relative(racine, destination)} (${TAILLE} × ${TAILLE})`);

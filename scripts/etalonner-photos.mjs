/**
 * Étalonnage commun des photos (direction artistique, décision du 24/11) :
 * saturation légèrement baissée, bleus atténués (teinte réchauffée vers le papier),
 * noirs un peu levés (rendu mat). Les originaux de contenu/photos/ restent intacts ;
 * les versions étalonnées sont écrites dans src/assets/photos/, d'où le site les importe.
 *
 * Usage : npm run photos
 */
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(racine, 'contenu/photos');
const destination = path.join(racine, 'src/assets/photos');

// Intensité « légère », validée sur la planche de comparaison
const ETALONNAGE = {
  saturation: 0.92,
  gain: [0.97, 0.96, 0.93],
  decalage: [8, 7, 6],
};

// Plus grande taille servie : 1 700 px (photo en paysage de la galerie)
const LARGEUR_MAX = 2000;

await mkdir(destination, { recursive: true });
const photos = (await readdir(source)).filter((nom) => nom.endsWith('.jpg')).sort();

for (const nom of photos) {
  await sharp(path.join(source, nom))
    .rotate()
    .resize({ width: LARGEUR_MAX, withoutEnlargement: true })
    .modulate({ saturation: ETALONNAGE.saturation })
    .linear(ETALONNAGE.gain, ETALONNAGE.decalage)
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(destination, nom));
  console.log(`étalonnée : ${nom}`);
}

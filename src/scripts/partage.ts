import { getImage } from 'astro:assets';
import photo from '../assets/photos/accroche-bouquet-kraft.jpg';

/** Image de partage (Open Graph et JSON-LD) : la photo d'accroche recadrée au format
    conseillé (1,91:1), en JPEG, le seul format lu par tous les réseaux et messageries. */
export const imagePartage = await getImage({
  src: photo,
  width: 1200,
  height: 630,
  fit: 'cover',
  position: 'center',
  format: 'jpg',
  quality: 80,
});

export const altPartage = 'Bouquet de roses anciennes et de bleuets sur papier kraft';

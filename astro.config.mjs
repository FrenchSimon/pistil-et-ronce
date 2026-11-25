// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Adresse de production : sert aux URL absolues d'Open Graph, du lien canonique et du JSON-LD.
  site: 'https://pistil-et-ronce.vercel.app',
  // HTML compressé sans supprimer les espaces entre éléments en ligne
  // (le mode 'jsx' de la v7 collerait des mots lus par les lecteurs d'écran).
  compressHTML: true,
  build: {
    // CSS toujours en fichiers externes : la CSP interdit les styles en ligne.
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      // Aucun fichier transformé en URI data: ni script mis en ligne (CSP).
      assetsInlineLimit: 0,
    },
  },
});

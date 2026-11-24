/* Dates du formulaire, au format français jj/mm/aaaa, toujours à minuit heure locale. */

export function aujourdhui(): Date {
  const maintenant = new Date();
  return new Date(maintenant.getFullYear(), maintenant.getMonth(), maintenant.getDate());
}

export function versTexte(date: Date): string {
  const jour = String(date.getDate()).padStart(2, '0');
  const mois = String(date.getMonth() + 1).padStart(2, '0');
  return `${jour}/${mois}/${date.getFullYear()}`;
}

/* Accepte 24/11/2026, 24-11-2026 ou 24.11.2026 ; refuse une date qui n'existe pas (31/02). */
export function lireDate(texte: string): Date | null {
  const morceaux = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/.exec(texte.trim());
  if (!morceaux) return null;
  const [jour, mois, annee] = morceaux.slice(1).map(Number);
  const date = new Date(annee, mois - 1, jour);
  return date.getDate() === jour && date.getMonth() === mois - 1 ? date : null;
}

export function memeJour(a: Date, b: Date): boolean {
  return a.getTime() === b.getTime();
}

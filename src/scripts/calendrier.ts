/*
 * Calendrier du champ « Date souhaitée » : remplace le calendrier du navigateur, qui ne se stylise pas.
 * Fenêtre en popover (Échap et clic à l'extérieur la ferment, le focus revient au bouton),
 * jours en boutons dans un tableau, navigation au clavier selon le motif « Date Picker Dialog » de l'APG.
 * Sans script, le champ reste un <input type="date"> natif.
 */
import { aujourdhui, lireDate, memeJour, versTexte } from './dates';

const MOIS = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' });
const JOUR_COMPLET = new Intl.DateTimeFormat('fr-FR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

/* Largeur de la fenêtre : la même valeur que dans le CSS (.calendrier) */
const LARGEUR_MAX = 356;
const MARGE = 16;

function decaler(date: Date, jours: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + jours);
}

/* Même jour du mois, ramené au dernier jour si le mois est plus court (31 janvier → 28 février) */
function decalerMois(date: Date, mois: number): Date {
  const dernier = new Date(date.getFullYear(), date.getMonth() + mois + 1, 0).getDate();
  return new Date(date.getFullYear(), date.getMonth() + mois, Math.min(date.getDate(), dernier));
}

export function initialiserCalendrier(
  champ: HTMLInputElement,
  bouton: HTMLButtonElement,
  fenetre: HTMLElement,
): void {
  const titre = fenetre.querySelector<HTMLElement>('[data-titre]');
  const jours = fenetre.querySelector<HTMLTableSectionElement>('[data-jours]');
  const precedent = fenetre.querySelector<HTMLButtonElement>('[data-mois="-1"]');
  const suivant = fenetre.querySelector<HTMLButtonElement>('[data-mois="1"]');
  if (!titre || !jours || !precedent || !suivant || !('showPopover' in fenetre)) return;

  // Saisie à la main en jj/mm/aaaa ; le bouton ouvre le calendrier.
  champ.type = 'text';
  champ.inputMode = 'numeric';
  champ.placeholder = 'jj/mm/aaaa';
  champ.autocomplete = 'off';
  champ.maxLength = 10;
  bouton.hidden = false;

  let actif = aujourdhui();

  function rendre(): void {
    const debut = aujourdhui();
    const choisie = lireDate(champ.value);
    const annee = actif.getFullYear();
    const mois = actif.getMonth();
    const nombreDeJours = new Date(annee, mois + 1, 0).getDate();
    // Semaine du lundi au dimanche ; toujours 6 rangées pour que la fenêtre ne change pas de hauteur
    const decalage = (new Date(annee, mois, 1).getDay() + 6) % 7;

    titre!.textContent = MOIS.format(actif);
    precedent!.setAttribute('aria-disabled', String(annee * 12 + mois <= debut.getFullYear() * 12 + debut.getMonth()));

    const rangees: HTMLTableRowElement[] = [];
    for (let rangee = 0; rangee < 6; rangee += 1) {
      const ligne = document.createElement('tr');
      for (let colonne = 0; colonne < 7; colonne += 1) {
        const cellule = document.createElement('td');
        const numero = rangee * 7 + colonne - decalage + 1;
        if (numero >= 1 && numero <= nombreDeJours) {
          const date = new Date(annee, mois, numero);
          const jour = document.createElement('button');
          jour.type = 'button';
          jour.className = 'calendrier__jour';
          jour.textContent = String(numero);
          jour.setAttribute('aria-label', JOUR_COMPLET.format(date));
          jour.dataset.date = String(date.getTime());
          jour.tabIndex = memeJour(date, actif) ? 0 : -1;
          if (date < debut) jour.setAttribute('aria-disabled', 'true');
          if (memeJour(date, debut)) jour.setAttribute('aria-current', 'date');
          if (choisie && memeJour(date, choisie)) jour.setAttribute('aria-pressed', 'true');
          cellule.append(jour);
        }
        ligne.append(cellule);
      }
      rangees.push(ligne);
    }
    jours!.replaceChildren(...rangees);
  }

  function focaliserActif(): void {
    jours!.querySelector<HTMLButtonElement>('[tabindex="0"]')?.focus();
  }

  function aller(date: Date): void {
    actif = date;
    rendre();
    focaliserActif();
  }

  // Fenêtre posée sous le champ, en coordonnées de la page : elle suit le défilement.
  function placer(): void {
    const cadre = champ.getBoundingClientRect();
    const largeurVue = document.documentElement.clientWidth;
    const largeur = Math.min(LARGEUR_MAX, largeurVue - 2 * MARGE);
    const gauche = Math.max(MARGE, Math.min(cadre.left, largeurVue - MARGE - largeur));
    fenetre.style.left = `${gauche + window.scrollX}px`;
    fenetre.style.top = `${cadre.bottom + window.scrollY + 6}px`;
  }

  fenetre.addEventListener('beforetoggle', (evenement) => {
    if ((evenement as ToggleEvent).newState !== 'open') return;
    const choisie = lireDate(champ.value);
    actif = choisie && choisie >= aujourdhui() ? choisie : aujourdhui();
    rendre();
    placer();
  });

  fenetre.addEventListener('toggle', (evenement) => {
    if ((evenement as ToggleEvent).newState === 'open') focaliserActif();
  });

  window.addEventListener('resize', () => {
    if (fenetre.matches(':popover-open')) placer();
  });

  for (const navigation of [precedent, suivant]) {
    navigation.addEventListener('click', () => {
      if (navigation.getAttribute('aria-disabled') === 'true') return;
      actif = decalerMois(actif, Number(navigation.dataset.mois));
      rendre();
    });
  }

  jours.addEventListener('click', (evenement) => {
    const jour = (evenement.target as Element).closest<HTMLButtonElement>('.calendrier__jour');
    if (!jour || jour.getAttribute('aria-disabled') === 'true') return;
    champ.value = versTexte(new Date(Number(jour.dataset.date)));
    // Met à jour un éventuel message d'erreur affiché
    champ.dispatchEvent(new Event('input', { bubbles: true }));
    fenetre.hidePopover();
  });

  jours.addEventListener('keydown', (evenement) => {
    const lundiAZero = (actif.getDay() + 6) % 7;
    const deplacements: Record<string, () => Date> = {
      ArrowLeft: () => decaler(actif, -1),
      ArrowRight: () => decaler(actif, 1),
      ArrowUp: () => decaler(actif, -7),
      ArrowDown: () => decaler(actif, 7),
      Home: () => decaler(actif, -lundiAZero),
      End: () => decaler(actif, 6 - lundiAZero),
      PageUp: () => decalerMois(actif, evenement.shiftKey ? -12 : -1),
      PageDown: () => decalerMois(actif, evenement.shiftKey ? 12 : 1),
    };
    const deplacement = deplacements[evenement.key];
    if (!deplacement) return;
    evenement.preventDefault();
    aller(deplacement());
  });
}

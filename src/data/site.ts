/* Informations de la salle — à adapter par les gérants */
export const site = {
  name: "BT Home",
  email: "contact@bthome.fr",
  phone: "+237 655 50 11 12",
  phoneHref: "tel:+237655501112",
  /** Numéro WhatsApp au format international, chiffres uniquement */
  whatsapp: "237655501112",
  address: "Makepe Saint-Tropez, Douala",
  city: "Douala",
  district: "Makepe Saint-Tropez",
  hours: "Visites sur rendez-vous, du lundi au samedi",
  capacity: 250,
  standing: 350,
  surface: "400 m²",
  parking: 80,
  socials: {
    instagram: "#",
    facebook: "#",
  },
  /** Nombre de mois consultables dans le calendrier */
  monthsAhead: 18,
};

export const EVENT_TYPES = [
  "Mariage",
  "Baptême",
  "Anniversaire",
  "Communion",
  "Séminaire",
  "Gala",
  "Soirée privée",
  "Autre",
] as const;

/** Lien qui ouvre une discussion WhatsApp avec la salle, message pré-rempli */
export const whatsappLink = (message = `Bonjour, je souhaite des informations sur la location de la salle ${site.name}.`) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

/** 350000 -> "350 000 FCFA" (espaces insécables) */
export const fcfa = (amount: number) => `${new Intl.NumberFormat("fr-FR").format(amount)} FCFA`;

/** Chemin d'une photo du dossier public/images */
export const photo = (file: string) => `/images/${file}`;

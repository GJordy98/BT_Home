/* =========================================================
   DATES DÉJÀ RÉSERVÉES
   ---------------------------------------------------------
   Une ligne par date, au format "AAAA-MM-JJ".
   statut : "reserve" -> date confirmée (non disponible)
            "option"  -> option posée, en attente de confirmation
   evenement : texte court affiché au survol (facultatif ; restez
               discrets : pas de noms de clients).
   ========================================================= */
export type Reservation = {
  date: string;
  statut: "reserve" | "option";
  evenement?: string;
};

export const reservations: Reservation[] = [
  { date: "2026-10-10", statut: "reserve", evenement: "Mariage" },
  { date: "2026-10-17", statut: "reserve", evenement: "Anniversaire" },
  { date: "2026-10-24", statut: "option", evenement: "Baptême" },
  { date: "2026-10-31", statut: "reserve", evenement: "Soirée privée" },
  { date: "2026-11-07", statut: "reserve", evenement: "Mariage" },
  { date: "2026-11-14", statut: "reserve", evenement: "Séminaire" },
  { date: "2026-11-21", statut: "option", evenement: "Mariage" },
  { date: "2026-12-05", statut: "reserve", evenement: "Gala" },
  { date: "2026-12-12", statut: "reserve", evenement: "Repas d'entreprise" },
  { date: "2026-12-19", statut: "reserve", evenement: "Repas d'entreprise" },
  { date: "2026-12-31", statut: "reserve", evenement: "Réveillon" },
  { date: "2027-01-16", statut: "option", evenement: "Anniversaire" },
  { date: "2027-02-13", statut: "reserve", evenement: "Soirée privée" },
  { date: "2027-05-15", statut: "reserve", evenement: "Mariage" },
  { date: "2027-05-29", statut: "reserve", evenement: "Mariage" },
  { date: "2027-06-12", statut: "reserve", evenement: "Mariage" },
  { date: "2027-06-19", statut: "option", evenement: "Mariage" },
  { date: "2027-06-26", statut: "reserve", evenement: "Baptême" },
  { date: "2027-07-03", statut: "reserve", evenement: "Mariage" },
];

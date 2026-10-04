import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { photo } from "@/data/site";

export const metadata: Metadata = {
  title: "Événements",
  description: "Mariages, baptêmes, anniversaires, séminaires et galas : configurations et capacités de la salle.",
};

const EVENTS = [
  {
    id: "mariages", type: "Mariage", img: "salle-table-honneur.jpg", alt: "Réception de mariage",
    title: "Mariages",
    text: "La salle vous est remise la veille à partir de 14 h pour l'installation et la décoration. Le jour J, l'espace se partage entre le cocktail près de l'entrée, le dîner au centre et la piste de danse au fond.",
    specs: [["Dîner assis", "250 pers."], ["Cocktail debout", "350 pers."], ["Piste de danse", "60 m²"], ["Accès la veille", "dès 14 h"]],
  },
  {
    id: "familles", type: "Baptême", img: "fete-famille-dejeuner.jpg", alt: "Table de fête",
    title: "Baptêmes, communions, anniversaires",
    text: "Pour les fêtes de famille, on peut réduire l'espace avec des paravents pour garder une ambiance chaleureuse, même à 50. Un coin est prévu pour les enfants, loin des enceintes.",
    specs: [["Repas assis", "40 à 250"], ["Coin enfants", "oui"], ["Location", "journée ou soirée"], ["Décoration", "libre"]],
  },
  {
    id: "seminaires", type: "Séminaire", img: "seminaire.jpg", alt: "Conférence",
    title: "Réunions & séminaires",
    text: "Disposition en théâtre, en U ou en îlots. L'écran, le vidéoprojecteur et les micros sont installés et testés avant votre arrivée. Le traiteur peut servir le déjeuner sur place.",
    specs: [["Théâtre", "300 pers."], ["Îlots", "160 pers."], ["Écran", "4 m de base"], ["Connexion", "Wi-Fi fibre"]],
  },
  {
    id: "galas", type: "Gala", img: "diner-tables-rondes.jpg", alt: "Dîner de gala",
    title: "Galas & soirées",
    text: "Remises de diplômes, dîners d'association, soirées privées. Une petite scène peut être montée pour les discours ou un groupe, avec la régie lumière.",
    specs: [["Banquet", "250 pers."], ["Scène", "24 m²"], ["Régie lumière", "incluse"], ["Fin de soirée", "4 h"]],
  },
];

export default function EvenementsPage() {
  return (
    <>
      <PageHero
        image={photo("panorama-salle.jpg")}
        alt="La salle préparée pour une soirée"
        kicker="Événements"
        title={<>Une salle, plusieurs <em>configurations</em></>}
      />
      <section className="section">
        <div className="container">
          {EVENTS.map((e) => (
            <article key={e.id} className="event-detail split" id={e.id} style={{ scrollMarginTop: 96 }}>
              <div className="ph split__media">
                <Image src={photo(e.img)} alt={e.alt} fill sizes="(max-width: 860px) 100vw, 760px" />
              </div>
              <div className="split__text">
                <h2>{e.title}</h2>
                <p>{e.text}</p>
                <div className="spec-list">
                  {e.specs.map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}
                </div>
                <Link href={`/contact?type=${encodeURIComponent(e.type)}#devis`} className="link-arrow">Demander un devis</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

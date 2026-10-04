import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { fcfa, photo } from "@/data/site";

export const metadata: Metadata = {
  title: "Tarifs",
  description: "Location de la salle à la journée, au week-end ou clé en main : tarifs et options.",
};

// Montants à ajuster par les gérants
const FORMULES = [
  {
    name: "À la journée", subtitle: "Vous gérez vos prestataires.", price: fcfa(350000), unit: "de 9 h à 4 h du matin",
    items: ["Tables et chaises", "Accès à la cuisine traiteur", "Parking privé", "Ménage après l'événement"],
  },
  {
    name: "Le week-end", subtitle: "Ce que choisissent la plupart des mariés.", price: fcfa(750000), unit: "du vendredi 14 h au dimanche 18 h",
    items: ["Tout ce qui est compris à la journée", "Sonorisation et lumière", "Nappage et vaisselle", "Un régisseur présent le jour J"],
  },
  {
    name: "Clé en main", subtitle: "On coordonne tout avec nos partenaires.", price: "Sur devis", unit: "selon le nombre d'invités",
    items: ["La formule week-end", "Traiteur partenaire", "Décoration florale", "DJ et animation"],
  },
];

const OPTIONS = [
  ["Vidéoprojecteur et écran", fcfa(50000)],
  ["Nappage et housses de chaises", `${fcfa(1500)} / pers.`],
  ["Vaisselle complète", `${fcfa(2000)} / pers.`],
  ["Heure supplémentaire", `${fcfa(50000)} / h`],
  ["Agent de sécurité", "sur devis"],
];

const FAQ = [
  ["Comment réserver une date ?", "Vérifiez d'abord la disponibilité dans le calendrier, puis envoyez-nous une demande. La date est bloquée à la signature du contrat et au versement d'un acompte de 30 %."],
  ["Que veut dire « option en cours » ?", "Quelqu'un a demandé à bloquer la date sans avoir encore confirmé. Si l'option n'est pas confirmée, la date se libère : laissez-nous vos coordonnées et on vous prévient."],
  ["Peut-on visiter avant de réserver ?", "Oui, et on le conseille. Les visites se font sur rendez-vous, du lundi au samedi."],
  ["Peut-on venir avec son propre traiteur ?", "Oui. La cuisine est équipée pour ça. Si vous n'avez personne, on peut vous recommander des traiteurs qui connaissent déjà la salle."],
  ["Une caution est-elle demandée ?", "Oui, à la remise des clés. Elle est rendue après l'état des lieux de sortie."],
];

export default function TarifsPage() {
  return (
    <>
      <PageHero
        image={photo("panorama-table.jpg")}
        alt="Table dressée"
        kicker="Tarifs"
        title={<>Trois façons de <em>louer</em> la salle</>}
        intro="Les prix sont donnés à titre indicatif pour un événement standard. Le devis final dépend de la date, du nombre d'invités et des options."
      />

      <section className="section">
        <div className="container">
          <div className="pricing">
            {FORMULES.map((f) => (
              <div key={f.name} className="price-col">
                <h3>{f.name}</h3>
                <p>{f.subtitle}</p>
                <div className="price">{f.price}<small>{f.unit}</small></div>
                <ul>{f.items.map((i) => <li key={i}>{i}</li>)}</ul>
                <Link href={`/contact?formule=${encodeURIComponent(f.name)}#devis`} className="link-arrow">Demander un devis</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section rule-top">
        <div className="container two-col">
          <div>
            <h2>Options</h2>
            <p>À ajouter à n&apos;importe quelle formule.</p>
          </div>
          <div>
            <table className="options-table">
              <thead><tr><th>Option</th><th>Tarif</th></tr></thead>
              <tbody>{OPTIONS.map(([o, p]) => <tr key={o}><td>{o}</td><td>{p}</td></tr>)}</tbody>
            </table>
            <p style={{ marginTop: 20 }}>
              Nouveau : un site pour votre événement, avec invitations, billets à QR code et plan de table.{" "}
              <Link href="/site-evenement" className="link-arrow">Voir l&apos;offre</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section rule-top" id="faq" style={{ scrollMarginTop: 72 }}>
        <div className="container two-col">
          <div>
            <h2>Questions fréquentes</h2>
          </div>
          <div className="faq">
            {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>
    </>
  );
}

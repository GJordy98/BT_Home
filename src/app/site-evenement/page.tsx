import type { Metadata } from "next";
import Link from "next/link";
import DemoForm from "@/components/DemoForm";
import PhoneMockup from "@/components/PhoneMockup";

export const metadata: Metadata = {
  title: "Le site de votre événement",
  description: "En option : un site à vos couleurs pour votre mariage, baptême ou séminaire. Confirmation de présence, billets avec QR code, plan de table et galerie photo.",
};

// Les 5 avantages : version courte (cartes) et version détaillée (« Dans le détail »)
const GAINS = [
  {
    id: "confirmations", big: "1 clic", title: "pour confirmer sa venue", text: "Vous savez exactement qui vient, sans relancer personne.",
    heading: "Vous savez exactement qui vient",
    lead: "Fini les relances par message et les réponses notées un peu partout.",
    points: [
      "Vos invités confirment depuis leur téléphone, sans créer de compte",
      "Vous voyez les réponses arriver en direct : adultes, enfants, régimes alimentaires",
      "Le nombre exact de repas part au traiteur, sans recompter",
    ],
    formules: "Toutes les formules",
  },
  {
    id: "billets", big: "1 seconde", title: "par invité à l'entrée", text: "Billet avec QR code scanné à la porte : pas d'intrus.",
    heading: "Seuls vos invités entrent",
    lead: "Plus de convives imprévus installés aux places prévues pour la famille.",
    points: [
      "Chaque invité confirmé reçoit un billet numéroté avec son propre QR code",
      "Il le garde sur son téléphone, ou l'imprime s'il préfère",
      "À l'entrée, un scan au téléphone montre tout de suite si la personne est sur la liste",
    ],
    formules: "Prestige et Entreprise",
  },
  {
    id: "infos", big: "0 appel", title: "le matin de la fête", text: "Horaires, tenue, itinéraire : tout est sur le site.",
    heading: "Vos invités trouvent les réponses seuls",
    lead: "Le jour J, vous avez mieux à faire que répondre au téléphone.",
    points: [
      "Le programme de la journée, avec un compte à rebours",
      "Le code vestimentaire et les infos de parking",
      "L'itinéraire GPS jusqu'à la salle, en un clic",
    ],
    formules: "Toutes les formules",
  },
  {
    id: "placement", big: "Table 7", title: "écrite sur chaque billet", text: "Plus de file devant le plan de table.",
    heading: "Chacun trouve sa place tout de suite",
    lead: "Pas de file devant un tableau où cent personnes cherchent leur nom en même temps.",
    points: [
      "Le numéro de table est écrit sur le billet de chaque invité",
      "Une recherche par nom sur le site, pour ceux qui ont perdu leur billet",
      "Le plan de la salle est consultable à l'avance",
    ],
    formules: "Prestige et Entreprise",
  },
  {
    id: "photos", big: "100 %", title: "des photos de vos invités", text: "Réunies dans votre galerie, en qualité d'origine.",
    heading: "Toutes les photos de la fête, au même endroit",
    lead: "Les photos de vos invités ne se perdent plus dans les groupes WhatsApp.",
    points: [
      "Un QR code posé sur les tables mène à votre galerie privée",
      "Vos invités y déposent photos et vidéos, en qualité d'origine",
      "Vous gardez tout après la fête",
    ],
    formules: "Prestige et Entreprise",
  },
];

const FORMULES = [
  {
    name: "Essentiel",
    subtitle: "Pour les anniversaires, baptêmes et fêtes de famille.",
    items: [
      "Site aux couleurs de votre événement",
      "Programme de la journée et compte à rebours",
      "Itinéraire GPS jusqu'à la salle",
      "Confirmation de présence en ligne",
      "Plan de la salle à télécharger",
    ],
  },
  {
    name: "Prestige & billetterie",
    subtitle: "Pour les mariages, galas et grandes réceptions.",
    items: [
      "Tout ce que contient l'Essentiel",
      "Billets d'invitation avec QR code unique",
      "Billets à enregistrer sur le téléphone",
      "Numéro de table sur le billet et recherche par nom",
      "Application de scan pour l'accueil à l'entrée",
      "Galerie photo partagée avec vos invités",
    ],
  },
  {
    name: "Entreprise",
    subtitle: "Pour les séminaires, conférences et lancements de produit.",
    items: [
      "Tout ce que contient Prestige & billetterie",
      "Badges d'accès nominatifs",
      "Programme des interventions et fiches des intervenants",
      "Présentations et documents à télécharger",
      "Billetterie payante ou réservation de tables VIP (Mobile Money, carte bancaire)",
    ],
  },
];

const STEPS = [
  { title: "Vous nous envoyez l'essentiel", text: "Vos photos, le programme et la liste des invités. Sur WhatsApp, c'est très bien." },
  { title: "On construit votre site", text: "À vos couleurs, avec vos textes. On le teste sur téléphone avant de vous le montrer." },
  { title: "Vous partagez le lien", text: "Votre site est en ligne sous 48 heures. Il ne reste qu'à l'envoyer à vos invités." },
];

export default function SiteEvenementPage() {
  return (
    <>
      <section className="connected-hero">
        <div className="container connected-hero__grid">
          <div className="connected-hero__text">
            <p className="kicker">En option avec la location · <strong>Site & billets de votre événement</strong></p>
            <h1 className="page-title">Le site de votre événement, <em>à partager</em> en un lien.</h1>
            <p className="connected-hero__intro">
              Invitation, confirmations, billets à QR code, plan de table et photos : tout passe par un seul lien,
              que vous envoyez à vos invités sur WhatsApp.
            </p>
            <ul className="checklist">
              {GAINS.map((g) => <li key={g.big}><strong>{g.big}</strong> {g.title}</li>)}
            </ul>
            <div className="hero__actions">
              <a href="#demo" className="btn">Voir une démonstration</a>
              <Link href={`/contact?formule=${encodeURIComponent("Site de l'événement")}#devis`} className="link-arrow">Ajouter à ma réservation</Link>
            </div>
          </div>
          <div className="connected-hero__media">
            <PhoneMockup />
            <p className="caption">Exemple de site de mariage, vu par un invité</p>
          </div>
        </div>
      </section>

      <section className="gains" id="avantages">
        <div className="container">
          <h2>Ce que vous y gagnez</h2>
          <div className="gains__grid">
            {GAINS.map((g) => (
              <a key={g.id} href={`#${g.id}`} className="gain gain--link">
                <p className="gain__big">{g.big}</p>
                <h3>{g.title}</h3>
                <p>{g.text}</p>
                <span className="gain__more">En savoir plus ↓</span>
              </a>
            ))}
            <div className="gain gain--cta">
              <p className="gain__big">48 h</p>
              <h3>pour mettre votre site en ligne</h3>
              <a href="#demo" className="btn btn--light">Voir une démonstration</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Dans le détail</h2>
            <p>Ce que fait concrètement le site, avantage par avantage.</p>
          </div>
          <div className="details">
            {GAINS.map((g) => (
              <article key={g.id} id={g.id} className="detail">
                <p className="detail__big">{g.big}</p>
                <div className="detail__head">
                  <h3>{g.heading}</h3>
                  <p>{g.lead}</p>
                </div>
                <div className="detail__body">
                  <ul>{g.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                  <p className="detail__tag">Inclus : {g.formules}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section rule-top" id="formules">
        <div className="container">
          <div className="section-title">
            <h2>Trois formules</h2>
            <p>Le prix dépend du nombre d&apos;invités et des options. On vous le donne avec le devis de la salle.</p>
          </div>
          <div className="pricing">
            {FORMULES.map((f) => (
              <div key={f.name} className="price-card">
                <h3>{f.name}</h3>
                <p className="price-card__sub">{f.subtitle}</p>
                <div className="price">Sur devis</div>
                <Link href={`/contact?formule=${encodeURIComponent(`Site de l'événement — ${f.name}`)}#devis`} className="btn btn--outline price-card__cta">Choisir cette formule</Link>
                <ul>{f.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section rule-top">
        <div className="container two-col">
          <div>
            <h2>Vous préparez la fête, on s&apos;occupe de la technique</h2>
            <p>Aucune connaissance en informatique n&apos;est nécessaire.</p>
          </div>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="steps__num">{i + 1}</span>
                <div><h3>{s.title}</h3><p>{s.text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="closing" id="demo" style={{ scrollMarginTop: 72 }}>
        <div className="container demo">
          <div className="demo__text">
            <h2>Envie de voir à quoi ça ressemble&nbsp;?</h2>
            <p>Laissez-nous votre numéro WhatsApp : on vous envoie un site de démonstration à ouvrir sur votre téléphone. C&apos;est gratuit et sans engagement.</p>
          </div>
          <DemoForm />
        </div>
      </section>
    </>
  );
}

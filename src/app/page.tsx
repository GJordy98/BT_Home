import Image from "next/image";
import Link from "next/link";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import Legend from "@/components/Legend";
import PhoneMockup from "@/components/PhoneMockup";
import PhotoStrip from "@/components/PhotoStrip";
import Testimonials from "@/components/Testimonials";
import { reservations } from "@/data/reservations";
import { photo, site } from "@/data/site";

const EVENTS = [
  { title: "Mariages", href: "/evenements#mariages", img: "mariage-ouverture-du-bal.jpg", alt: "Ouverture du bal d'un mariage", text: "Vin d'honneur, dîner, première danse : on vous laisse la salle dès la veille pour installer.", meta: `jusqu'à ${site.capacity} invités` },
  { title: "Baptêmes & communions", href: "/evenements#familles", img: "fete-famille-dejeuner.jpg", alt: "Long déjeuner de famille", text: "Un déjeuner qui se prolonge, un coin pour les enfants, et personne ne cherche où se garer.", meta: "40 à 250 invités" },
  { title: "Anniversaires", href: "/evenements#familles", img: "soiree-piste-de-danse.jpg", alt: "Piste de danse éclairée", text: "La sono est déjà là. Branchez votre playlist ou faites venir votre DJ.", meta: "soirée jusqu'à 4 h" },
  { title: "Réunions & séminaires", href: "/evenements#seminaires", img: "seminaire.jpg", alt: "Salle en configuration séminaire", text: "Écran, vidéoprojecteur, micros sans fil. En rangs ou en îlots, selon votre programme.", meta: "jusqu'à 300 personnes" },
];

const STRIP = [
  { src: "diner-tables-rondes.jpg", alt: "Tables rondes dressées pour un dîner", caption: "Dîner, tables rondes de 10" },
  { src: "mariage-ouverture-du-bal.jpg", alt: "Ouverture du bal", caption: "Ouverture du bal" },
  { src: "centre-de-table.jpg", alt: "Centre de table floral", caption: "Centre de table" },
  { src: "soiree-piste-de-danse.jpg", alt: "Piste de danse éclairée", caption: "La piste en soirée" },
  { src: "diner-maries.jpg", alt: "Couple à table pendant le dîner", caption: "Dîner assis" },
  { src: "bar.jpg", alt: "Le bar de la salle", caption: "Le bar" },
];

const INCLUDED = [
  { title: "Dans la salle", items: ["Tables rondes et rectangulaires", `${site.capacity} chaises`, "Piste de danse", "Climatisation"] },
  { title: "Pour le traiteur", items: ["Cuisine équipée", "Chambre froide", "Bar avec évier", "Accès livraison"] },
  { title: "Son & image", items: ["Sonorisation", "2 micros sans fil", "Vidéoprojecteur et écran", "Éclairage d'ambiance"] },
  { title: "Autour", items: [`Parking privé de ${site.parking} places`, "Accès de plain-pied", "Vestiaire", "Groupe électrogène"] },
];

const TESTIMONIALS = [
  { quote: "On a pu tout installer le vendredi, ce qui nous a enlevé un stress énorme. Le samedi, on n'avait plus qu'à arriver.", author: "Sarah et Paul", event: "mariage, 180 invités" },
  { quote: "Grande, lumineuse, et le parking a vraiment fait la différence avec les grands-parents.", author: "Awa", event: "baptême, 90 invités" },
  { quote: "Le matériel était prêt et testé à notre arrivée. On a juste branché l'ordinateur.", author: "Julien L.", event: "séminaire, 120 personnes" },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__bg">
          <Image src={photo("hero-salle.jpg")} alt="La salle dressée pour un dîner, sous les lustres" fill priority sizes="100vw" />
        </div>
        <div className="container hero__content">
          <p className="kicker">Salle de réception · <strong>{site.district}, {site.city}</strong></p>
          <h1>Une grande salle pour vos <em>mariages</em>, baptêmes et fêtes de famille.</h1>
          <div className="hero__row">
            <p className="hero__intro">
              {site.surface} de plain-pied, une cuisine pour votre traiteur et un parking juste devant.
              La salle se loue à la journée ou pour le week-end.
            </p>
            <div className="hero__actions">
              <a href="#disponibilites" className="btn">Vérifier une date</a>
              <Link href="/contact#devis" className="link-arrow">Venir visiter</Link>
            </div>
          </div>
          <dl className="facts">
            <div><dt>Assis</dt><dd>{site.capacity} pers.</dd></div>
            <div><dt>Debout</dt><dd>{site.standing} pers.</dd></div>
            <div><dt>Parking</dt><dd>{site.parking} places</dd></div>
          </dl>
        </div>
      </section>

      <section className="section" id="a-propos" style={{ paddingTop: 24 }}>
        <div className="container about__grid">
          <h2 className="about__title">La salle</h2>
          <div className="about__body">
            <p className="about__lead">
              Un grand volume, assez pour {site.capacity} invités à table et une vraie piste de danse,
              sans perdre l&apos;ambiance d&apos;une fête de famille.
            </p>
            <p>
              On peut la louer nue, avec simplement les tables et les chaises, ou avec le son,
              la lumière et la vaisselle. Vous gardez le traiteur, le décorateur et le DJ de votre choix.
            </p>
            <Link href="/evenements" className="link-arrow">Voir les configurations</Link>
          </div>
        </div>
        <div className="container about__photos">
          <figure>
            <div className="ph"><Image src={photo("salle-table-honneur.jpg")} alt="Vue d'ensemble de la salle avec la table d'honneur" fill sizes="(max-width: 800px) 100vw, 1040px" /></div>
            <figcaption>La salle avec la table d&apos;honneur</figcaption>
          </figure>
          <figure>
            <div className="ph"><Image src={photo("decor-table-verticale.jpg")} alt="Table dressée pour un mariage" fill sizes="(max-width: 800px) 100vw, 520px" /></div>
            <figcaption>Table dressée pour un mariage</figcaption>
          </figure>
        </div>
      </section>

      <section className="section rule-top">
        <div className="container">
          <div className="section-title">
            <h2>Ce qu&apos;on y organise</h2>
            <p>Chaque événement a sa configuration. Les capacités sont indicatives : on en parle lors de la visite.</p>
          </div>
          <ul className="event-grid">
            {EVENTS.map((e) => (
              <li key={e.title}>
                <Link href={e.href} className="event-card">
                  <span className="ph event-card__img"><Image src={photo(e.img)} alt={e.alt} fill sizes="(max-width: 600px) 100vw, (max-width: 1080px) 50vw, 25vw" /></span>
                  <span className="event-card__label" aria-hidden="true">{e.title}</span>
                  <span className="event-card__panel">
                    <h3>{e.title}</h3>
                    <p>{e.text}</p>
                    <span className="event-card__meta">{e.meta}</span>
                    <span className="event-card__cta">Voir les détails</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section rule-top">
        <PhotoStrip title="En images" photos={STRIP.map((s) => ({ ...s, src: photo(s.src) }))} />
      </section>

      <section className="section rule-top">
        <div className="container included">
          <div className="included__intro">
            <h2>Ce qui est compris</h2>
            <p>Tout ce qui suit est inclus dans la location, sans supplément. Le reste se choisit en option.</p>
            <Link href="/tarifs" className="link-arrow">Tarifs et options</Link>
            <div className="ph"><Image src={photo("bar.jpg")} alt="Le bar de la salle" fill sizes="(max-width: 900px) 100vw, 500px" /></div>
          </div>
          <div className="included__lists">
            {INCLUDED.map((g) => (
              <div key={g.title} className="included__group">
                <h3>{g.title}</h3>
                <ul>{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section rule-top">
        <div className="container teaser">
          <div className="teaser__text">
            <p className="kicker">En option avec la location</p>
            <h2>Un site pour votre <em>événement</em>, prêt à partager sur WhatsApp</h2>
            <p>On crée le site de votre mariage, baptême ou séminaire, à vos couleurs. Vos invités y trouvent tout, et vous gardez le contrôle de la liste.</p>
            <ul>
              <li>Confirmation de présence en ligne</li>
              <li>Billets avec QR code, scannés à l&apos;entrée</li>
              <li>Numéro de table sur chaque billet</li>
              <li>Galerie où vos invités déposent leurs photos</li>
            </ul>
            <Link href="/site-evenement" className="link-arrow">Découvrir l&apos;offre</Link>
          </div>
          <div className="teaser__media"><PhoneMockup /></div>
        </div>
      </section>

      <section className="section rule-top" id="disponibilites" style={{ scrollMarginTop: 72 }}>
        <div className="container availability">
          <div className="availability__text">
            <h2>Votre date est-elle libre&nbsp;?</h2>
            <p>Le calendrier est tenu à jour par l&apos;équipe. Cliquez sur une date pour voir si elle est disponible.</p>
            <Legend />
            <Link href="/contact#devis" className="link-arrow">Demander un devis</Link>
          </div>
          <div className="availability__cal">
            <AvailabilityCalendar reservations={reservations} linkTo="/contact" />
          </div>
        </div>
      </section>

      <section className="section rule-top">
        <div className="container">
          <div className="section-title">
            <h2>Ils y ont fait la fête, <em>ils en parlent</em></h2>
            <p>Mariage, baptême, séminaire : ce qu&apos;ils ont retenu de leur journée dans la salle.</p>
          </div>
          <Testimonials items={TESTIMONIALS} />
        </div>
      </section>
    </>
  );
}

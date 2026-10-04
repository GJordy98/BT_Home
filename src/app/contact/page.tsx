import type { Metadata } from "next";
import BookingSection from "@/components/BookingSection";
import PageHero from "@/components/PageHero";
import Socials from "@/components/Socials";
import { reservations } from "@/data/reservations";
import { site, whatsappLink } from "@/data/site";
import { isValidKey } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Contact & réservation",
  description: "Vérifiez les disponibilités de la salle et demandez votre devis, une réservation ou une visite.",
};

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ContactPage(props: PageProps<"/contact">) {
  // Pré-remplissage depuis l'URL : /contact?date=2027-06-12&type=Mariage&formule=Le%20week-end
  const params = await props.searchParams;
  const date = first(params.date);
  const formule = first(params.formule);

  return (
    <>
      <PageHero
        kicker="Contact"
        title={<>Parlons de votre <em>événement</em></>}
        intro="Choisissez une date, dites-nous en quelques lignes ce que vous préparez, et on revient vers vous avec un devis."
      />
      <BookingSection
        reservations={reservations}
        initialDate={isValidKey(date) ? date : ""}
        initialType={first(params.type)}
        initialMessage={formule ? `Je suis intéressé(e) par la formule « ${formule.slice(0, 60)} ».\n` : ""}
        contactInfo={
          <>
            <h2>Ensuite, votre demande</h2>
            <p>Devis gratuit, sans engagement. Si vous préférez, appelez-nous ou écrivez-nous sur WhatsApp.</p>
            <dl className="contact-details">
              <div><dt>Téléphone</dt><dd><a href={site.phoneHref}>{site.phone}</a></dd></div>
              <div><dt>WhatsApp</dt><dd><a href={whatsappLink()} target="_blank" rel="noopener noreferrer">Écrire sur WhatsApp</a></dd></div>
              <div><dt>Email</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div>
              <div><dt>Adresse</dt><dd>{site.address}</dd></div>
              <div><dt>Visites</dt><dd>{site.hours}</dd></div>
            </dl>
            <Socials />
          </>
        }
      />
    </>
  );
}

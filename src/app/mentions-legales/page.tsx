import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegalesPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 820 }}>
        <p className="kicker">Informations</p>
        <h1 style={{ fontSize: "clamp(2.4rem,5vw,3.6rem)" }}>Mentions légales</h1>
        <h3 style={{ marginTop: 32 }}>Éditeur du site</h3>
        <p>[Raison sociale] — [Forme juridique]<br />Siège : Makepe Saint-Tropez, Douala, Cameroun<br />RCCM : [numéro] — NIU : [numéro]<br />Responsable de publication : [nom]</p>
        <h3 style={{ marginTop: 32 }}>Hébergement</h3>
        <p>[Nom de l&apos;hébergeur], [adresse de l&apos;hébergeur]</p>
        <h3 style={{ marginTop: 32 }}>Données personnelles</h3>
        <p>Les informations transmises via le formulaire de contact servent uniquement à répondre à votre demande et ne sont jamais cédées à des tiers. Vous pouvez demander leur suppression à tout moment par email.</p>
        <h3 style={{ marginTop: 32 }}>Crédits photos</h3>
        <p>[À compléter]</p>
      </div>
    </section>
  );
}

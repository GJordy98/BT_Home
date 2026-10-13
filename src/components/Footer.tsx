import Link from "next/link";
import { site, whatsappLink } from "@/data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__visit">
        <div>
          <p className="footer__label">{site.hours}</p>
          <a href={site.phoneHref} className="footer__phone">{site.phone}</a>
        </div>
        <div className="footer__actions">
          <Link href="/contact#devis" className="btn btn--light">Prendre rendez-vous</Link>
          <a href={whatsappLink("Bonjour, je souhaite visiter la salle.")} className="link-arrow" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </div>
      <div className="container footer__grid">
        <div>
          <p className="footer__brand">{site.name}</p>
          <p>Salle de réception<br />{site.district}<br />{site.city}, Cameroun</p>
        </div>
        <div>
          <p className="footer__label">Nous joindre</p>
          <ul>
            <li><a href={site.phoneHref}>{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
          </ul>
        </div>
        <nav aria-label="Plan du site">
          <p className="footer__label">Le site</p>
          <ul>
            <li><Link href="/evenements">Événements</Link></li>
            <li><Link href="/galerie">Galerie</Link></li>
            <li><Link href="/tarifs">Tarifs</Link></li>
            <li><Link href="/site-evenement">Site de votre événement</Link></li>
            <li><Link href="/tarifs#faq">Questions fréquentes</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div>
          <p className="footer__label">Ailleurs</p>
          <ul>
            <li><a href={site.socials.instagram}>Instagram</a></li>
            <li><a href={site.socials.facebook}>Facebook</a></li>
            <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <Link href="/mentions-legales">Mentions légales</Link>
      </div>
    </footer>
  );
}

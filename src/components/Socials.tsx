import { site, whatsappLink } from "@/data/site";

export default function Socials() {
  return (
    <div className="text-links">
      <a href={site.socials.instagram}>Instagram</a>
      <a href={site.socials.facebook}>Facebook</a>
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
    </div>
  );
}

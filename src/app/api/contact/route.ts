import { reservations } from "@/data/reservations";
import { EVENT_TYPES, site } from "@/data/site";
import { formatLong, getStatus, isValidKey } from "@/lib/dates";

const DEMANDES = ["Devis", "Réservation", "Visite", "Démo site"];
const PHONE_RE = /^\+?[\d\s.-]{8,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * Reçoit une demande de devis / réservation / visite, ou de démo du site d'événement.
 * L'email est envoyé via Resend (https://resend.com) si RESEND_API_KEY est défini.
 * Sinon on répond 503 + fallback "mailto" : le formulaire ouvre alors la messagerie du visiteur.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  const data = {
    demande: str(body.demande),
    nom: str(body.nom, 120),
    email: str(body.email, 200),
    telephone: str(body.telephone, 40),
    type: str(body.type, 60),
    date: str(body.date, 10),
    invites: str(body.invites, 6),
    message: str(body.message, 5000),
  };

  // Demande de démo du site d'événement : seul le numéro WhatsApp est requis
  const isDemo = data.demande === "Démo site";
  if (isDemo ? !PHONE_RE.test(data.telephone) : !data.nom || !EMAIL_RE.test(data.email)) {
    return Response.json(
      { error: isDemo ? "Merci d'indiquer un numéro WhatsApp valide." : "Merci d'indiquer votre nom et un email valide." },
      { status: 400 },
    );
  }
  if (!DEMANDES.includes(data.demande) || !(EVENT_TYPES as readonly string[]).includes(data.type)) {
    return Response.json({ error: "Type de demande ou d'événement invalide." }, { status: 400 });
  }
  if (data.date) {
    if (!isValidKey(data.date) || getStatus(data.date, reservations) === "past") {
      return Response.json({ error: "La date indiquée n'est pas valide." }, { status: 400 });
    }
    if (getStatus(data.date, reservations) === "reserve") {
      return Response.json({ error: "Cette date est déjà réservée." }, { status: 409 });
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ fallback: "mailto" }, { status: 503 });
  }

  const dateTxt = data.date ? formatLong(data.date) : "à définir";
  const text = [
    `Demande : ${data.demande}`,
    `Nom : ${data.nom}`,
    `Email : ${data.email}`,
    `Téléphone : ${data.telephone || "-"}`,
    `Type d'événement : ${data.type}`,
    `Date souhaitée : ${dateTxt}${data.date && getStatus(data.date, reservations) === "option" ? " (option en cours)" : ""}`,
    `Nombre d'invités : ${data.invites || "-"}`,
    "",
    data.message || "(pas de message)",
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_EMAIL_FROM ?? `${site.name} <onboarding@resend.dev>`,
      to: [process.env.CONTACT_EMAIL_TO ?? site.email],
      ...(data.email ? { reply_to: data.email } : {}),
      subject: `[${data.demande}] ${data.type} — ${dateTxt}`,
      text,
    }),
  });

  if (!res.ok) {
    console.error("Échec d'envoi Resend", res.status, await res.text());
    return Response.json({ error: "L'envoi a échoué." }, { status: 502 });
  }
  return Response.json({ ok: true });
}

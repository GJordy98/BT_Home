"use client";

import { useState } from "react";
import type { Reservation } from "@/data/reservations";
import { EVENT_TYPES, site } from "@/data/site";
import { formatLong, getStatus, isValidKey, startOfToday, toKey } from "@/lib/dates";

type Props = {
  reservations: Reservation[];
  date: string;
  onDateChange: (date: string) => void;
  initialType?: string;
  initialMessage?: string;
};

type Status = { type: "ok" | "err"; message: React.ReactNode } | null;

function dateHint(date: string, reservations: Reservation[]) {
  if (!isValidKey(date)) return null;
  switch (getStatus(date, reservations)) {
    case "past": return { cls: "is-error", text: "Cette date est passée.", blocking: true };
    case "reserve": return { cls: "is-error", text: "Cette date est déjà réservée. Indiquez une autre date ou précisez vos alternatives dans le message.", blocking: true };
    case "option": return { cls: "is-warn", text: "Option en cours sur cette date : nous vous préviendrons si elle se libère.", blocking: false };
    default: return { cls: "is-ok", text: "Bonne nouvelle, cette date est disponible.", blocking: false };
  }
}

export default function ContactForm({ reservations, date, onDateChange, initialType = "", initialMessage = "" }: Props) {
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState(false);
  const hint = dateHint(date, reservations);
  const mailLink = <a href={`mailto:${site.email}`}><u>{site.email}</u></a>;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    if (hint?.blocking) {
      form.querySelector<HTMLInputElement>("#date")?.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        form.reset();
        onDateChange("");
        setStatus({ type: "ok", message: <><strong>Merci !</strong> Votre demande a bien été envoyée. Nous revenons vers vous sous 12h.</> });
      } else if (json.fallback === "mailto") {
        // Envoi d'email non configuré côté serveur : on ouvre la messagerie du visiteur
        const subject = `[${data.demande}] ${data.type} — ${data.date ? formatLong(data.date) : "date à définir"}`;
        const body = [
          `Demande : ${data.demande}`,
          `Nom : ${data.nom}`,
          `Email : ${data.email}`,
          `Téléphone : ${data.telephone || "-"}`,
          `Type d'événement : ${data.type}`,
          `Date souhaitée : ${data.date ? formatLong(data.date) : "-"}`,
          `Nombre d'invités : ${data.invites || "-"}`,
          "",
          data.message || "",
        ].join("\n");
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setStatus({ type: "ok", message: <>Votre messagerie va s&apos;ouvrir avec la demande pré-remplie. Si rien ne se passe, écrivez-nous à {mailLink}.</> });
      } else {
        setStatus({ type: "err", message: <>{json.error ?? "L'envoi a échoué."} Vous pouvez aussi nous écrire à {mailLink}.</> });
      }
    } catch {
      setStatus({ type: "err", message: <>L&apos;envoi a échoué. Vous pouvez nous écrire directement à {mailLink}.</> });
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="form" noValidate onSubmit={handleSubmit}>
      <div className="field full">
        <label>Votre demande</label>
        <div className="choice-group">
          <label><input type="radio" name="demande" value="Devis" defaultChecked /><span>Devis</span></label>
          <label><input type="radio" name="demande" value="Réservation" /><span>Réservation</span></label>
          <label><input type="radio" name="demande" value="Visite" /><span>Visite</span></label>
        </div>
      </div>
      <div className="field">
        <label htmlFor="nom">Nom complet *</label>
        <input id="nom" name="nom" type="text" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email *</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="telephone">Téléphone</label>
        <input id="telephone" name="telephone" type="tel" autoComplete="tel" />
      </div>
      <div className="field">
        <label htmlFor="type">Type d&apos;événement *</label>
        <select id="type" name="type" required defaultValue={EVENT_TYPES.includes(initialType as never) ? initialType : ""}>
          <option value="">Choisir…</option>
          {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="date">Date souhaitée</label>
        <input
          id="date"
          name="date"
          type="date"
          min={toKey(startOfToday())}
          value={date}
          aria-invalid={hint?.blocking || undefined}
          aria-describedby="date-hint"
          onChange={(e) => onDateChange(e.target.value)}
        />
        <div id="date-hint" className={`field__hint ${hint?.cls ?? ""}`} aria-live="polite">{hint?.text}</div>
      </div>
      <div className="field">
        <label htmlFor="invites">Nombre d&apos;invités</label>
        <input id="invites" name="invites" type="number" min={1} max={400} inputMode="numeric" />
      </div>
      <div className="field full">
        <label htmlFor="message">Votre message</label>
        <textarea id="message" name="message" defaultValue={initialMessage} placeholder="Parlez-nous de votre projet : horaires, traiteur, options souhaitées…" />
      </div>
      {status && <div className={`form__status is-visible form__status--${status.type}`} role="status">{status.message}</div>}
      <div className="full">
        <button type="submit" className="btn" disabled={sending}>{sending ? "Envoi…" : "Envoyer ma demande"}</button>
      </div>
    </form>
  );
}

"use client";

import { useState } from "react";
import { site, whatsappLink } from "@/data/site";
import { formatLong, startOfToday, toKey } from "@/lib/dates";

const TYPES = ["Mariage", "Baptême", "Anniversaire", "Séminaire", "Autre"];

type Status = { type: "ok" | "err"; message: React.ReactNode } | null;

/** Formulaire express : date, type d'événement, numéro WhatsApp → demande de démo. */
export default function DemoForm() {
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    setSending(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, demande: "Démo site", message: "Demande de démonstration du site d'événement." }),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        form.reset();
        setStatus({ type: "ok", message: <>C&apos;est noté. On vous envoie la démo sur WhatsApp au {data.telephone}.</> });
      } else if (json.fallback) {
        // Envoi d'email non configuré : on ouvre directement la discussion WhatsApp avec la salle
        const msg = [
          "Bonjour, je souhaite voir la démo du site d'événement.",
          `Événement : ${data.type}`,
          `Date prévue : ${data.date ? formatLong(data.date) : "à définir"}`,
          `Mon WhatsApp : ${data.telephone}`,
        ].join("\n");
        window.open(whatsappLink(msg), "_blank", "noopener");
        setStatus({ type: "ok", message: <>WhatsApp s&apos;ouvre avec votre demande pré-remplie : il ne reste qu&apos;à l&apos;envoyer.</> });
      } else {
        setStatus({ type: "err", message: <>{json.error ?? "L'envoi a échoué."} Vous pouvez aussi nous écrire au <a href={site.phoneHref}><u>{site.phone}</u></a>.</> });
      }
    } catch {
      setStatus({ type: "err", message: <>L&apos;envoi a échoué. Écrivez-nous directement au <a href={site.phoneHref}><u>{site.phone}</u></a>.</> });
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="demo-form" noValidate onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="demo-date">Date de l&apos;événement</label>
        <input id="demo-date" name="date" type="date" min={toKey(startOfToday())} />
      </div>
      <div className="field">
        <label htmlFor="demo-type">Type d&apos;événement *</label>
        <select id="demo-type" name="type" required defaultValue="">
          <option value="" disabled>Choisir…</option>
          {TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="demo-tel">Votre numéro WhatsApp *</label>
        <input id="demo-tel" name="telephone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+237 6XX XX XX XX" required pattern="\+?[\d\s.\-]{8,20}" />
      </div>
      <button type="submit" className="btn" disabled={sending}>{sending ? "Envoi…" : "Recevoir la démo"}</button>
      {status && <p className={`form__status form__status--${status.type}`} role="status">{status.message}</p>}
    </form>
  );
}

"use client";

import { useState } from "react";
import type { Reservation } from "@/data/reservations";
import AvailabilityCalendar from "./AvailabilityCalendar";
import ContactForm from "./ContactForm";
import Legend from "./Legend";

type Props = {
  reservations: Reservation[];
  initialDate?: string;
  initialType?: string;
  initialMessage?: string;
  /** Colonne de coordonnées affichée à gauche du formulaire */
  contactInfo: React.ReactNode;
};

/** Calendrier + formulaire synchronisés : la date choisie dans l'un se reflète dans l'autre. */
export default function BookingSection({ reservations, initialDate = "", initialType, initialMessage, contactInfo }: Props) {
  const [date, setDate] = useState(initialDate);

  return (
    <>
      <section className="section" id="disponibilites">
        <div className="container availability">
          <div className="availability__text">
            <h2>D&apos;abord, la date</h2>
            <p>Les jours en foncé sont déjà pris. Cliquez sur une date libre : elle se reporte dans le formulaire juste en dessous.</p>
            <Legend />
          </div>
          <div className="availability__cal">
            <AvailabilityCalendar reservations={reservations} selected={date || undefined} onSelect={setDate} />
          </div>
        </div>
      </section>

      <section className="section rule-top" id="devis" style={{ scrollMarginTop: 72 }}>
        <div className="container contact-grid">
          <div className="contact-grid__info">{contactInfo}</div>
          <div className="contact-grid__form">
            <ContactForm
              reservations={reservations}
              date={date}
              onDateChange={setDate}
              initialType={initialType}
              initialMessage={initialMessage}
            />
          </div>
        </div>
      </section>
    </>
  );
}

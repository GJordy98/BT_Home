"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import type { Reservation } from "@/data/reservations";
import { site } from "@/data/site";
import { formatLong, fromKey, getStatus, startOfToday, toKey } from "@/lib/dates";
import { ChevronLeft, ChevronRight } from "./Icons";

const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const DOW = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const LABELS = { reserve: "Réservé", option: "Option" } as const;

type Props = {
  reservations: Reservation[];
  /** Date sélectionnée (mode contrôlé, ex. page Contact) */
  selected?: string;
  onSelect?: (date: string) => void;
  /** Si défini, « Demander un devis » renvoie vers cette page avec la date en paramètre */
  linkTo?: string;
};

const noop = () => () => {};
/** false pendant le rendu serveur, true dans le navigateur */
const useIsClient = () => useSyncExternalStore(noop, () => true, () => false);

const firstOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);

export default function AvailabilityCalendar({ reservations, selected: controlled, onSelect, linkTo }: Props) {
  // Le calendrier dépend de la date du jour : on le calcule dans le navigateur
  // (la page peut avoir été pré-générée des jours plus tôt).
  const isClient = useIsClient();
  const min = firstOfMonth(startOfToday());
  const max = new Date(min.getFullYear(), min.getMonth() + site.monthsAhead - 1, 1);
  const clampMonth = (d: Date) => (d < min ? min : d > max ? max : firstOfMonth(d));

  const [internal, setInternal] = useState<string>();
  const selected = controlled ?? internal;
  const [view, setView] = useState(() => clampMonth(selected ? fromKey(selected) : min));

  // Si la date sélectionnée change depuis le formulaire, on affiche son mois
  const [lastSelected, setLastSelected] = useState(selected);
  if (selected !== lastSelected) {
    setLastSelected(selected);
    if (selected) setView(clampMonth(fromKey(selected)));
  }

  const select = (key: string) => {
    setInternal(key);
    onSelect?.(key);
  };

  if (!isClient) return <div className="calendar" style={{ minHeight: 480 }} aria-busy="true" />;

  const offset = (view.getDay() + 6) % 7; // lundi = 0
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const todayKey = toKey(startOfToday());
  const move = (n: number) => setView(new Date(view.getFullYear(), view.getMonth() + n, 1));

  const selectedStatus = selected ? getStatus(selected, reservations) : null;
  const target = linkTo && selected ? `${linkTo}?date=${selected}#devis` : "#devis";

  return (
    <div className="calendar">
      <div className="calendar__head">
        <p className="calendar__title" aria-live="polite">{MONTHS[view.getMonth()]} {view.getFullYear()}</p>
        <div className="calendar__nav">
          <button type="button" className="icon-btn" aria-label="Mois précédent" disabled={view <= min} onClick={() => move(-1)}><ChevronLeft /></button>
          <button type="button" className="icon-btn" aria-label="Mois suivant" disabled={view >= max} onClick={() => move(1)}><ChevronRight /></button>
        </div>
      </div>

      <div className="calendar__grid">
        {DOW.map((d) => <div key={d} className="calendar__dow">{d}</div>)}
        {Array.from({ length: offset }, (_, i) => <span key={`e${i}`} className="day day--empty" />)}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const key = toKey(new Date(view.getFullYear(), view.getMonth(), i + 1));
          const status = getStatus(key, reservations);
          const booking = reservations.find((r) => r.date === key);
          const label = status === "reserve" || status === "option" ? LABELS[status] : "";
          const cls = ["day"];
          if (status === "past") cls.push("day--past");
          if (status === "reserve") cls.push("day--booked");
          if (status === "option") cls.push("day--option");
          if (key === todayKey) cls.push("day--today");
          if (key === selected) cls.push("day--selected");
          const state = status === "past" ? "passée" : status === "libre" ? "disponible" : label.toLowerCase();
          return (
            <button
              key={key}
              type="button"
              className={cls.join(" ")}
              disabled={status === "past"}
              aria-label={`${formatLong(key)} : ${state}`}
              aria-pressed={key === selected}
              title={label && booking?.evenement ? `${label} — ${booking.evenement}` : undefined}
              onClick={() => select(key)}
            >
              {i + 1}
              {label && <small>{label}</small>}
            </button>
          );
        })}
      </div>

      <div className="calendar__info" aria-live="polite">
        {!selected || selectedStatus === "past" ? (
          <p>Sélectionnez une date pour vérifier sa disponibilité.</p>
        ) : selectedStatus === "reserve" ? (
          <p><strong>{formatLong(selected)}</strong> est déjà réservé. Choisissez une autre date ou contactez-nous pour une date proche.</p>
        ) : (
          <>
            {selectedStatus === "option" ? (
              <p><strong>{formatLong(selected)}</strong> fait l&apos;objet d&apos;une option. Elle peut se libérer : demandez à être prévenu.</p>
            ) : (
              <p><strong>{formatLong(selected)}</strong> est libre.</p>
            )}
            <Link href={target} className={`btn btn--sm${selectedStatus === "option" ? " btn--outline" : ""}`}>
              {selectedStatus === "option" ? "Me prévenir" : "Demander un devis"}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

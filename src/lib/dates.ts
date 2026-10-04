import type { Reservation } from "@/data/reservations";

export type DayStatus = "past" | "reserve" | "option" | "libre";

const pad = (n: number) => String(n).padStart(2, "0");

/** Date -> "AAAA-MM-JJ" (heure locale, sans décalage UTC) */
export const toKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const fromKey = (key: string) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const isValidKey = (key: unknown): key is string =>
  typeof key === "string" && /^\d{4}-\d{2}-\d{2}$/.test(key) && toKey(fromKey(key)) === key;

export const startOfToday = () => {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
};

export const formatLong = (key: string) =>
  fromKey(key).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

export function getStatus(key: string, reservations: Reservation[]): DayStatus {
  if (fromKey(key) < startOfToday()) return "past";
  return reservations.find((r) => r.date === key)?.statut ?? "libre";
}

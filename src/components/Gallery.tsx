"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Close } from "./Icons";

export type GalleryPhoto = { src: string; alt: string; cat: string; caption: string; ratio: string };

const FILTERS = [
  { key: "all", label: "Tout" },
  { key: "mariage", label: "Mariages" },
  { key: "soiree", label: "Soirées" },
  { key: "pro", label: "Professionnel" },
  { key: "deco", label: "Détails & décoration" },
];

export default function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="filters" role="group" aria-label="Filtrer les photos">
        {FILTERS.map((f) => (
          <button key={f.key} type="button" className={filter === f.key ? "is-active" : undefined} onClick={() => setFilter(f.key)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="masonry">
        {photos.map((p) => (
          <figure key={p.src} className={filter !== "all" && p.cat !== filter ? "is-hidden" : undefined} onClick={() => setOpen(p)}>
            <div className="ph" style={{ "--ratio": p.ratio } as React.CSSProperties}>
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 700px) 100vw, 400px" />
            </div>
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </div>

      {open && (
        <div className="lightbox" role="dialog" aria-label="Photo agrandie" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
          <button type="button" className="icon-btn" aria-label="Fermer" onClick={() => setOpen(null)}><Close /></button>
          <Image src={open.src} alt={open.alt} width={1600} height={1100} style={{ width: "auto", height: "auto", maxWidth: "100%" }} />
        </div>
      )}
    </>
  );
}

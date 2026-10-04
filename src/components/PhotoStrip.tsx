"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "./Icons";

type Photo = { src: string; alt: string; caption: string };

/** Carrousel de photos de même format, avec flèches. Défilement au doigt sur mobile. */
export default function PhotoStrip({ title, photos }: { title: string; photos: Photo[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const move = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <div className="container">
      <div className="strip__head">
        <h2>{title}</h2>
        <div className="strip__controls">
          <Link href="/galerie" className="link-arrow">Toute la galerie</Link>
          <button type="button" className="icon-btn" aria-label="Photo précédente" disabled={atStart} onClick={() => move(-1)}><ChevronLeft /></button>
          <button type="button" className="icon-btn" aria-label="Photo suivante" disabled={atEnd} onClick={() => move(1)}><ChevronRight /></button>
        </div>
      </div>
      <div className="strip__track" ref={track} onScroll={update}>
        {photos.map((p) => (
          <figure key={p.src} className="strip__item">
            <div className="ph"><Image src={p.src} alt={p.alt} fill sizes="(max-width: 600px) 70vw, (max-width: 900px) 45vw, 500px" /></div>
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

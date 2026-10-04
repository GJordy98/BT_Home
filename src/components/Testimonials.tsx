"use client";

import { useState } from "react";

type Testimonial = { quote: string; author: string; event: string };

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const go = (i: number) => setIndex((i + items.length) % items.length);
  const t = items[index];

  return (
    <figure className="quote" aria-live="polite">
      <blockquote>{t.quote}</blockquote>
      <figcaption className="quote__foot">
        <cite>{t.author} <span>— {t.event}</span></cite>
        <span className="quote__nav">
          <button type="button" aria-label="Avis précédent" onClick={() => go(index - 1)}>←</button>
          {index + 1} / {items.length}
          <button type="button" aria-label="Avis suivant" onClick={() => go(index + 1)}>→</button>
        </span>
      </figcaption>
    </figure>
  );
}

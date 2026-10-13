type Testimonial = { quote: string; author: string; event: string };

export default function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <ul className="quotes">
      {items.map((t) => (
        <li key={t.author}>
          <figure className="quote">
            <blockquote>{t.quote}</blockquote>
            <figcaption>
              <cite>{t.author}</cite>
              <span>{t.event}</span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

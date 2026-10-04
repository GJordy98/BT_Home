import Image from "next/image";

type Props = { image?: string; alt?: string; kicker: string; title: React.ReactNode; intro?: string };

export default function PageHero({ image, alt, kicker, title, intro }: Props) {
  return (
    <section className="page-head">
      <div className="container">
        <div className="page-head__text">
          <div>
            <p className="kicker">{kicker}</p>
            <h1>{title}</h1>
          </div>
          {intro && <p className="page-head__intro">{intro}</p>}
        </div>
        {image && (
          <div className="ph page-head__img">
            <Image src={image} alt={alt ?? ""} fill priority sizes="(max-width: 1688px) 100vw, 1560px" />
          </div>
        )}
      </div>
    </section>
  );
}

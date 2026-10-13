import type { Metadata } from "next";
import Gallery, { type GalleryPhoto } from "@/components/Gallery";
import PageHero from "@/components/PageHero";
import { photo } from "@/data/site";

export const metadata: Metadata = {
  title: "Galerie photos",
  description: "Découvrez la salle en photos : mariages, soirées, séminaires et décorations.",
};

// Photos du dossier public/images (versions compressées).
// ratio = proportions réelles de l'image ; les panoramiques sont recadrés en 16 / 9.
const PHOTOS: GalleryPhoto[] = [
  { src: photo("mariage-ouverture-du-bal.jpg"), alt: "Ouverture du bal d'un mariage", cat: "mariage", caption: "Ouverture du bal", ratio: "1600 / 1299" },
  { src: photo("centre-de-table.jpg"), alt: "Centre de table floral", cat: "deco", caption: "Centre de table", ratio: "3 / 4" },
  { src: photo("soiree-piste-de-danse.jpg"), alt: "Piste de danse éclairée", cat: "soiree", caption: "La piste en soirée", ratio: "1600 / 1073" },
  { src: photo("seminaire.jpg"), alt: "Salle en configuration séminaire", cat: "pro", caption: "Configuration séminaire", ratio: "1600 / 1073" },
  { src: photo("diner-maries.jpg"), alt: "Couple à table pendant le dîner", cat: "mariage", caption: "Dîner des mariés", ratio: "3 / 4" },
  { src: photo("hero-salle.jpg"), alt: "La salle dressée sous les lustres", cat: "deco", caption: "La salle dressée", ratio: "2560 / 1429" },
  { src: photo("fete-famille-dejeuner.jpg"), alt: "Long déjeuner de famille", cat: "soiree", caption: "Déjeuner de famille", ratio: "1600 / 1073" },
  { src: photo("decor-table-verticale.jpg"), alt: "Table dressée pour un mariage", cat: "mariage", caption: "Table de mariage", ratio: "3 / 4" },
  { src: photo("diner-tables-rondes.jpg"), alt: "Tables rondes dressées", cat: "soiree", caption: "Dîner, tables rondes", ratio: "1600 / 1073" },
  { src: photo("bar.jpg"), alt: "Le bar de la salle", cat: "deco", caption: "Le bar", ratio: "1289 / 1600" },
  { src: photo("salle-table-honneur.jpg"), alt: "La salle avec la table d'honneur", cat: "mariage", caption: "Table d'honneur", ratio: "1600 / 1073" },
  { src: photo("panorama-table.jpg"), alt: "Table dressée, vue large", cat: "deco", caption: "Dressage", ratio: "16 / 9" },
  { src: photo("panorama-salle.jpg"), alt: "Vue panoramique de la salle", cat: "deco", caption: "Vue d'ensemble", ratio: "16 / 9" },
];

export default function GaleriePage() {
  return (
    <>
      <PageHero
        kicker="Galerie"
        title={<>La salle, <em>en situation</em></>}
        intro="Des photos prises lors d'événements organisés chez nous. Cliquez sur une image pour l'agrandir."
      />
      <section className="section">
        <div className="container"><Gallery photos={PHOTOS} /></div>
      </section>
    </>
  );
}

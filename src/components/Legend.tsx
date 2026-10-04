export default function Legend() {
  return (
    <div className="legend">
      <span className="legend__item"><span className="legend__swatch" />Libre</span>
      <span className="legend__item"><span className="legend__swatch legend__swatch--option" />Option en cours</span>
      <span className="legend__item"><span className="legend__swatch legend__swatch--booked" />Réservé</span>
    </div>
  );
}

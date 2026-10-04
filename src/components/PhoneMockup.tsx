import { site } from "@/data/site";

const QR_SIZE = 21;

/** Motif du faux QR code, calculé une seule fois (pseudo-aléatoire déterministe, hors repères d'angle). */
const QR_CELLS: [number, number][] = (() => {
  const finder = (x: number, y: number) => x < 7 && y < 7;
  const isFinder = (x: number, y: number) => finder(x, y) || finder(QR_SIZE - 1 - x, y) || finder(x, QR_SIZE - 1 - y);
  const cells: [number, number][] = [];
  let seed = 7;
  for (let y = 0; y < QR_SIZE; y++) {
    for (let x = 0; x < QR_SIZE; x++) {
      seed = (seed * 9301 + 49297) % 233280;
      if (!isFinder(x, y) && seed / 233280 > 0.52) cells.push([x, y]);
    }
  }
  return cells;
})();

/** Faux QR code (illustration) avec les trois repères d'angle. */
function QrIllustration() {
  const size = QR_SIZE;
  const cells = QR_CELLS.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
  const corner = (x: number, y: number) => (
    <g key={`c${x}${y}`}>
      <rect x={x} y={y} width="7" height="7" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" />
    </g>
  );
  return (
    <svg viewBox={`-1 -1 ${size + 2} ${size + 2}`} className="phone__qr" aria-hidden="true" shapeRendering="crispEdges">
      <rect x="-1" y="-1" width={size + 2} height={size + 2} fill="#fff" />
      <g fill="currentColor">
        {cells}
        {corner(0, 0)}
        {corner(size - 7, 0)}
        {corner(0, size - 7)}
      </g>
    </svg>
  );
}

/** Téléphone montrant un exemple de site d'événement (données fictives de démonstration). */
export default function PhoneMockup() {
  return (
    <div className="phone" role="img" aria-label="Exemple de site d'événement sur téléphone : invitation, billet avec QR code et numéro de table">
      <div className="phone__screen">
        <p className="phone__kicker">Mariage</p>
        <p className="phone__names">Aïcha <em>&amp;</em> Serge</p>
        <p className="phone__date">Samedi 12 juin 2027 · 15 h</p>
        <p className="phone__place">{site.name}, {site.district}</p>
        <div className="phone__countdown">
          <span><strong>248</strong>jours</span>
          <span><strong>06</strong>heures</span>
          <span><strong>41</strong>min</span>
        </div>
        <div className="phone__ticket">
          <QrIllustration />
          <div>
            <small>Billet n° 0142</small>
            <strong>Table 7</strong>
            <small>2 personnes</small>
          </div>
        </div>
        <span className="phone__btn">Présence confirmée</span>
        <span className="phone__link">Itinéraire jusqu&apos;à la salle →</span>
        <div className="phone__program">
          <p className="phone__kicker">Programme</p>
          <ul>
            <li><span>15 h</span>Cérémonie</li>
            <li><span>18 h</span>Cocktail</li>
            <li><span>20 h</span>Dîner et soirée</li>
          </ul>
          <p className="phone__dress">Tenue : blanc et doré</p>
        </div>
      </div>
    </div>
  );
}

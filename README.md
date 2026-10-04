# BT Home — salle de réception à Makepe Saint-Tropez, Douala

Site vitrine de la salle : présentation, galerie, tarifs, calendrier des disponibilités,
demande de devis / réservation / visite, et offre « site de votre événement ».

Next.js 16 (App Router) + TypeScript. Styles dans `src/app/globals.css` (couleurs et marges en haut du fichier).

## Lancer le site
```bash
npm install
npm run dev                    # développement : http://localhost:3000
npm run build && npm start     # production
```
Déploiement le plus simple : Vercel (import du dépôt GitHub), ou tout hébergeur Node.js.

## Pages
| Route | Contenu |
|---|---|
| `/` | Accueil |
| `/evenements` | Configurations et capacités par type d'événement |
| `/galerie` | Photos filtrables |
| `/tarifs` | Formules, options, questions fréquentes |
| `/site-evenement` | Offre « site de votre événement » (invitations, billets QR code, plan de table, galerie) |
| `/contact` | Calendrier + formulaire de devis / réservation / visite |
| `/mentions-legales` | À compléter |

## Ce que les gérants modifient le plus souvent
| Fichier | Contenu |
|---|---|
| `src/data/site.ts` | Nom, téléphone, WhatsApp, email, adresse, capacités, réseaux sociaux |
| `src/data/reservations.ts` | Dates réservées (`reserve`) ou en option (`option`) du calendrier |
| `src/app/tarifs/page.tsx` | Prix des formules et des options (en FCFA) |
| `public/images/` | Photos du site |

Après une modification, il faut redéployer le site.

## Dates réservées
```ts
{ date: "2027-06-12", statut: "reserve", evenement: "Mariage" },
{ date: "2027-06-19", statut: "option",  evenement: "Baptême" },
```
Les dates passées sont grisées automatiquement. Le serveur refuse une demande sur une date déjà réservée.

## Recevoir les demandes par email
Créer un fichier `.env.local` (jamais envoyé sur GitHub) :
```
RESEND_API_KEY=re_xxxxxxxx                          # clé https://resend.com
CONTACT_EMAIL_TO=gerants@exemple.com                # facultatif, sinon l'email de site.ts
CONTACT_EMAIL_FROM=BT Home <devis@votre-domaine.com> # facultatif, domaine vérifié chez Resend
```
Sans clé : le formulaire de contact ouvre la messagerie du visiteur, et la demande de démo ouvre WhatsApp,
avec la demande déjà rédigée.

## Photos
Les photos actuelles sont des **illustrations provisoires**, à remplacer par de vraies photos de la salle.
Elles sont compressées (JPEG, 1 600 px de large maximum, 2 560 px pour l'image d'accueil).
Pour remplacer une photo sans toucher au code, garder le même nom de fichier.

## Liens utiles
- Formulaire pré-rempli : `/contact?date=2027-06-12&type=Mariage&formule=Le%20week-end`
- WhatsApp de la salle : bouton flottant sur toutes les pages (numéro dans `src/data/site.ts`)

# Les maths de Sanaa, Premiere specialite

Site statique publie sur https://mathematiques.benhelli.org (Worker Cloudflare `mathematiques`).
Adresse de secours : https://mathematiques.sofiane-benhelli.workers.dev

Etat de reference : version Cloudflare `baa781a0-a9a0-407b-ae18-428a16be2d95`, publiee le 26/10/2026.
Les 38 fichiers de `site/` sont identiques octet par octet a la production (verifie le 21/11/2026).

## Structure

| Chemin | Role |
|---|---|
| `site/index.html` | Portail (ateliers, bac blanc, revisions), routage par `#/...` |
| `site/assets/` | Code du portail (`app.js`, `bac.js`, `simulations.js`, etat du bac blanc), styles, polices |
| `site/content/` | Contenus pedagogiques : analyse, geometrie et probabilites, methodes, parcours, bacs blancs, revisions, variantes |
| `site/polynomes/` | Atelier historique second degre (parabole interactive) |
| `site/suites/` | Atelier historique suites |
| `wrangler.jsonc` | Configuration de deploiement Cloudflare |
| `manifest.json` | Empreintes SHA-256 de la version en ligne |
| `docs/historique-publication/` | Recus de publication Codex du 26/10/2026 |

Aucune etape de build : les fichiers de `site/` sont servis tels quels.
La progression de l'eleve est stockee dans le navigateur (localStorage), rien cote serveur.

## Utilisation

```sh
npm run dev       # sert site/ sur http://localhost:8765
npm run check     # liste les fichiers modifies depuis la version en ligne
npm run deploy    # publie sur Cloudflare (wrangler login requis au prealable)
npm run manifest  # apres un deploiement, met a jour manifest.json
```

Sans Node : `python3 -m http.server 8765 --directory site`

## Origine

Construit avec OpenAI Codex sur le Mac de l'utilisateur `sxz` :
- session du 13/09/2026 (`Codex/2026-09-13/alors-je-voudrais-que-tu-me/`) : creation des ateliers et du portail
- session du 26/10/2026 (`Codex/2026-10-26/j-ai/`) : derniere publication

Le depot GitHub `SofianeBENHELLI/PolynomesSanaa` ne contient qu'une ancienne version (Parabole + Suites) et ne sert pas ce domaine.
Site associe : https://science.benhelli.org

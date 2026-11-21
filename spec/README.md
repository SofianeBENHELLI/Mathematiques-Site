# Spécification de compétences : mathématiques Première et Terminale (spécialité)

Objectif : une source de vérité versionnée de ce que Sanaa doit savoir et savoir faire en
mathématiques de Première et de Terminale générale, reliée aux contenus du site. Le but de
travail est la note maximale : chaque ligne est une compétence vérifiable, avec son piège
classique et sa couverture par le site.

## Contenu

| Fichier | Rôle |
|---|---|
| `sources.md` | Textes officiels utilisés, état de lecture, écarts connus |
| `epreuves.md` | Format des épreuves (anticipée de Première, terminale) et conséquences |
| `transversal.yaml` | Six compétences mathématiques, conventions de rédaction, automatismes |
| `competences/premiere.yaml` | Programme de spécialité de Première (en vigueur 2026-2027) |
| `competences/terminale.yaml` | Programme de spécialité de Terminale (statut provisoire, voir plus bas) |
| `couverture.yaml` | Pour chaque compétence : où le site la travaille (module, niveau de couverture) |
| `methode-20-sur-20.md` | Méthode de travail et de rédaction pour viser la note maximale |

## Format d'une compétence

```yaml
- {id: P-ANA-DER-13, type: capacite, txt: "Déterminer l'équation d'une tangente en un point",
   piege: "Oublier f(a) : y = f'(a)(x - a) est faux", demo: false}
```

- `id` : `<niveau>-<domaine>-<chapitre>-<numéro>`. P = Première, T = Terminale. Un identifiant ne change jamais.
- `type` : `connaissance`, `capacite`, `demonstration` (démonstration exigible), `algorithme`, `automatisme`.
- `txt` : formulation courte, fidèle au programme.
- `piege` (facultatif) : erreur fréquente à ne pas commettre.
- `note` (facultatif) : précision de périmètre ou de statut.

## Statuts et fiabilité

- **Première** : texte du programme applicable à la rentrée 2026-2027 (BO n° 14 du 2 avril 2026,
  NOR MENE2602917A), lu dans la version diffusée par l'académie de Bordeaux. Les listes de
  « nouveautés » et de « suppressions » de ce document n'étaient pas lisibles ; les écarts avec
  2019 sont tirés de la présentation de l'académie de Normandie (voir `sources.md`).
- **Terminale** : Sanaa passera en Terminale en 2027-2028, donc sous le **nouveau programme**
  (NOR MENE2602919A). Ce texte n'a pas pu être lu. `competences/terminale.yaml` reprend le
  programme de 2019, encore en vigueur jusqu'en 2026-2027, et porte le statut `provisoire`.
  À réconcilier ligne à ligne dès que le texte 2026 est disponible. Aucun contenu de ce fichier
  ne doit être considéré comme confirmé pour 2027-2028 avant cette réconciliation.

## Vérification

```sh
python3 scripts/validate_spec.py        # identifiants uniques, types valides, couverture cohérente
python3 scripts/validate_spec.py --report   # tableau de couverture par chapitre
```

#!/usr/bin/env python3
"""Valide la spécification de compétences et affiche la couverture par chapitre."""
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
SPEC = ROOT / "spec"
TYPES = {"connaissance", "capacite", "demonstration", "algorithme", "automatisme"}
NIVEAU = {"complet", "partiel", "aucun"}
MODULES_EXISTANTS = {"polynomes", "suites", "fonctions", "derivation", "exponentielle", "trigonometrie", "produit-scalaire", "droites-cercles", "probabilites", "variables-aleatoires", "statistiques", "python"}


def load(path):
    with open(path, encoding="utf-8") as f:
        return yaml.safe_load(f)


def collect():
    comps = {}
    erreurs = []
    for nom in ("premiere", "terminale"):
        data = load(SPEC / "competences" / f"{nom}.yaml")
        for dom in data["domaines"]:
            for chap in dom["chapitres"]:
                for c in chap["competences"]:
                    cid = c["id"]
                    if cid in comps:
                        erreurs.append(f"identifiant en double : {cid}")
                    if c.get("type") not in TYPES:
                        erreurs.append(f"{cid} : type invalide {c.get('type')!r}")
                    if not c.get("txt"):
                        erreurs.append(f"{cid} : txt vide")
                    attendu = f"{nom[0].upper()}-{dom['id']}-{chap['id']}-"
                    if not cid.startswith(attendu):
                        erreurs.append(f"{cid} : préfixe attendu {attendu}")
                    comps[cid] = {**c, "niveau_prog": nom,
                                  "chapitre": f"{nom[0].upper()}-{dom['id']}-{chap['id']}",
                                  "chap_nom": chap["nom"]}
    return comps, erreurs


def main():
    comps, erreurs = collect()
    couv = load(SPEC / "couverture.yaml")["couverture"]
    absents = set()
    for cid, v in couv.items():
        if cid not in comps:
            erreurs.append(f"couverture : identifiant inconnu {cid}")
        if v.get("niveau") not in NIVEAU:
            erreurs.append(f"couverture {cid} : niveau invalide")
        if v.get("module") not in MODULES_EXISTANTS:
            erreurs.append(f"couverture {cid} : module inconnu {v.get('module')!r}")
        mod = v.get("module")
        if mod and not (ROOT / "site" / mod).exists():
            absents.add(mod)
    for mod in sorted(absents):
        print(f"avertissement : dossier site/{mod} absent (module planifié)", file=sys.stderr)
    interdit = [str(p) for p in SPEC.rglob("*") if p.is_file() and chr(0x2014) in p.read_text(encoding="utf-8")]
    for p in interdit:
        erreurs.append(f"tiret cadratin interdit dans {p}")

    if "--report" in sys.argv:
        chap = {}
        for cid, c in comps.items():
            d = chap.setdefault(c["chapitre"], {"nom": c["chap_nom"], "n": 0, "c": 0})
            d["n"] += 1
            if couv.get(cid, {}).get("niveau") in ("complet", "partiel"):
                d["c"] += 1
        print(f"{'chapitre':<14}{'nom':<44}{'couvert':>8}")
        for k, d in sorted(chap.items()):
            print(f"{k:<14}{d['nom']:<44}{d['c']:>4}/{d['n']:<3}")
        total = len(comps)
        cov = sum(1 for c in comps if couv.get(c, {}).get("niveau") in ("complet", "partiel"))
        demos = sum(1 for c in comps.values() if c["type"] == "demonstration")
        print(f"\ncompétences : {total}, couvertes : {cov}, démonstrations exigibles : {demos}")

    if erreurs:
        print("\n".join(f"ERREUR {e}" for e in erreurs))
        sys.exit(1)
    print(f"OK : {len(comps)} compétences, {len(couv)} lignes de couverture")


if __name__ == "__main__":
    main()

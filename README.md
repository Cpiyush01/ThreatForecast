# PREVENT-X Production Package

A complete defensive production prototype for the frozen PREVENT-X architecture:

Network packets -> genuine 10-second state -> 45 features -> 5-state (50s) history -> one Transformer -> six direct risk forecasts (+10..+60s) -> threshold 0.05 -> dashboard / SHAP / MITRE ATT&CK context.

## Put the four downloaded artifacts here

`artifacts/`
- `prevent_x_transformer_best.pt`
- `prevent_x_training_scaler.joblib`
- `prevent_x_transformer_architecture.json`
- `prevent_x_operational_threshold.json`

Do not copy the Kaggle datasets or training arrays.

## Run backend

```bash
python -m venv .venv
# activate it
pip install -r backend/requirements.txt
uvicorn backend.app.main:app --host 0.0.0.0 --port 8000
```

API: `http://127.0.0.1:8000/docs`

## Run frontend

```bash
cd frontend
npm install
npm run dev
```

The dashboard supports:
- A: live interface capture
- B: controlled lab traffic
- C: PCAP/PCAPNG upload and replay directly from the browser

For browser replay, choose a `.pcap`, `.pcapng`, or `.cap` file in the dashboard. The backend stores a temporary copy under `backend/runtime/uploads/` and starts replay automatically.

## MITRE ATT&CK

A built-in contextual catalog is included. For the full/current Enterprise STIX 2.1 bundle, run:

```bash
python scripts/download_mitre.py
```

The file is stored as `data/mitre/enterprise-attack.json` and is parsed by the MITRE service.

## SHAP

The `/api/explain` endpoint uses SHAP permutation-style explanations over the 225 sequence positions (5 states x 45 features), then aggregates them back to the frozen 45-feature contract. Explanations are on-demand because they are intentionally more expensive than inference.

## Production startup behavior

No forecast is produced until five genuine occupied 10-second states exist. The engine never invents empty states just to fill a missing interval.

## Notes

The frozen production model is the original direct multi-horizon Transformer. The residual Transformer was an evaluation experiment and is not substituted into production.

Forecasts are called risk scores, not calibrated probabilities.

Run in authorized environments only. For SIH, use an isolated lab or replayed PCAP for deterministic demonstrations.

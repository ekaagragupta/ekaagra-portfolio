# /public/media Assets Directory

This directory stores all photographic, screenshot, diagram, and preview assets used across Ekaagra Gupta's portfolio.

## Active & Available Files

| Filename | Dimensions / Type | Section / Component | Purpose |
| :--- | :--- | :--- | :--- |
| `profile-hero.jpg` | Square / Portrait (1:1 or 4:5) | Hero Section | Dedicated profile photo slot with subtle parallax and frame |
| `profile-about.jpg` | Portrait / Square (3:4 or 1:1) | About Section | Research / lab / portrait photo |
| `exp-iit-dhanbad-1.jpg` | 16:9 / 4:3 | Experience: IIT Dhanbad | Proof of work / architecture diagram / IRIS patent screenshot |
| `exp-csir-nidsa-1.jpg` | 16:9 / 4:3 | Experience: CSIR-NIDSA | Spatio-temporal / Evidential Deep Learning visual / certificate |
| `exp-mnit-1.jpg` | 16:9 / 4:3 | Experience: MNIT Jaipur | RAG evaluation charts / certificate |
| `exp-ethify-1.jpg` | 16:9 / 4:3 | Experience: EthifyAI | Memory-aware retrieval benchmarks / certificate |
| `exp-coregen-1.jpg` | 16:9 / 4:3 | Experience: CoreGen | Satellite imagery super-resolution (3+1) visual / certificate |
| `proj-conformal.gif` | 16:10 / 16:9 GIF/MP4 | Projects: Evidential Conformal Anticipation | Video anticipation Swin3D-T / EDL demonstration |
| `proj-care-rag.gif` | 16:10 / 16:9 GIF/MP4 | Projects: CARE RAG Evaluator | SQuAD 2.0 Platt scaling & abstention workflow |
| `proj-iris-agent.gif` | 16:10 / 16:9 GIF/MP4 | Projects: IRIS Runtime Safety Governor | Tool undo / conformal risk control pipeline |
| `resume.pdf` | PDF Document | Global / Nav / Hero / Contact | Current curriculum vitae / resume download |

## How the MediaSlot Component Behaves
If a file is missing or has not yet been placed here:
- The `<MediaSlot />` will automatically show a stylized obsidian placeholder with a dashed hairline border, subtle icon, and the exact path required (`Drop image here: /public/media/<filename>`).
- When provided, it renders with smooth lazy loading, backdrop glow, subtle rounded frame, hover zoom, and optional ScrollTrigger parallax.

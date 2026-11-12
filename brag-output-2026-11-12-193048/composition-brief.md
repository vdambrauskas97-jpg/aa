# Hyperframes Composition Brief: EasyBid (vertical, Lamborghini Urus)

## Objective
Create a short launch-style brag video for EasyBid (easybid.lt).

## Output
- Composition directory: `brag-output-2026-11-12-193048/composition/`
- Rendered video: `brag-output-2026-11-12-193048/brag.mp4`
- Format: vertical — 1080x1920, 30 fps
- Duration: 22 seconds

## Source Material
- Source: the live site `https://easybid.lt/lt` (Lithuanian), captured in a headless browser; not this repository's code
- Pages read: the lot page the user chose (`/lt/lots/iaai/45509419-2019-lamborghini-urus`, captured 2026-11-12; the lot is sold), plus home, `Kaip tai veikia`, the lot list and the stylesheet (captured 2026-11-11)
- Product name: EasyBid
- Tagline / strongest claim: `…matykite galutinę kainą dar prieš statydami.`
- Key UI or visual moment to recreate: the lot page's `Klaipėdoje / Preliminaru` price panel landing on `Preliminari galutinė kaina 110 815 €`
- Copy that must appear verbatim:
  - `Parduota` / `Galutinė kaina` / `84 000 USD`; `Visas kėbulas`; `2019 LAMBORGHINI URUS`; `IAAI`; `Lotas 45509419`
  - `Klaipėdoje` / `Preliminaru`; `Loto kaina 84 000 USD`; `Aukciono mokesčiai 5 305 USD`; `Pervežimas iki JAV uosto 380 USD`; `Transportavimas į Klaipėdos uostą 920 USD`; `EasyBid tarpininkavimas 450 USD`; `Importo muitas 9 106 USD`; `PVM 21 034 USD`; `Krovos darbai Klaipėdoje 350 €`; `Preliminari galutinė kaina 110 815 €`
  - `Šios aikštelės vežėjas dar neįkainavo, todėl transportavimo kainos – 15 artimiausių aikštelių vidurkis (2026-10-18).`
  - `Skaičiuota pagal esamus tarifus. Galutinės sumos patvirtinamos sąskaitoje.`
  - `Matykite galutinę kainą dar prieš statydami.`
  - `683 337 lotų`; `Copart ir IAAI viename sąraše`
  - `2013 / 2019 / 2021 BMW M5` with `Statymas` and `Su pristatymu` prices as on the site's demo
  - `2019 BMW M5 · Lotas 0-44873101`; `Jūsų maksimali suma $22,000`; `Statymas`; `$21,300`, `$21,600`, `$21,900`; `Lotas laimėtas už $21,900`
  - `Niekada nė centu daugiau, nei nurodėte`
  - `Pristatymas į Lietuvą`; `≈ 6–9 savaitės nuo durų iki durų`; `Muitinė sutvarkyta`; `Newark, US`; `Klaipėda, LT`
  - `JAV aukcionų automobiliai iki Klaipėdos`; `Pradėti statyti`; `easybid.lt`
- Invented connective copy (asserts nothing about the product): `O kiek Klaipėdoje?`

## Creative Direction
- Tone preset: default
- Creative direction: the honest price reveal — a calm, exact product film where one number tells the truth
- Interpretation: confident and precise; pace from the interface working; titles land and stay still; sound restrained
- Angle: the auction's final price is not your final price. A Urus sold at IAAI for 84 000 USD comes to 110 815 € in Klaipėda, shown fee by fee; then the site's own find → bid → receive flow. The lot is sold and the video says so.
- Hook: the Urus photo, `Parduota · Galutinė kaina`, `84 000 USD`, then `O kiek Klaipėdoje?`
- Outro / punchline: logo, `JAV aukcionų automobiliai iki Klaipėdos`, `Pradėti statyti`, `easybid.lt`
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Unrelated visual redesign
  - The lot's VIN, any phone number or email address

## Visual Identity
- Background: `#fbfcfe` (page), `#ffffff` cards with `#e2e9f0` hairlines; map sky `#f1f7fc`
- Dark grounds: the site's hero, `#14202e` with its `#0d1828` washes; navy `#0e2f4e` for the total bar
- Text: `#14283c`; muted `#5a6e82`
- Accent: `#0e74c5`; logo cyan `#00aeef`; success `#1f6b3f` on `#e9f6ee`; pin red `#d61f25`; IAAI `#c1272d`
- Display font: Geist 900 (the site's face; files in `assets/fonts/`, SIL OFL 1.1)
- Body font: Geist 400 / 500 / 700
- Visual references from the project: lot page price panel and bid card; the animated demos on `Kaip tai veikia` (search, bid, delivery map with its SVG truck, ship and pin); the home hero photo and its wash; the logo
- LOOK: light `#fbfcfe` product stage between two dark photographic bookends; Geist 900 titles at 62–96 px (146 px for the hook number, full width), UI text 28–50 px; 2 px `#e2e9f0` hairlines and 14–24 px radii scaled from the site's 1 px / 6–10 px; key content inside x 108–972, y 192–1728, nothing that must be read in the lower fifth

## Storyboard
Use the storyboard in `brag-output-2026-11-12-193048/brag-plan.md` as the creative contract.

Scene summary:
1. Hook — 2.74s — lot photo, `Parduota · Galutinė kaina 84 000 USD`, `O kiek Klaipėdoje?`
2. Reveal — 7.07s — the price panel fills row by row and lands on `110 815 €`; logo and claim
3. Find — 2.78s — `bmw m5` typed, three rows with delivered prices, `683 337 lotų`
4. Bid — 3.23s — maximum `$22,000`, bid ticks to `$21,900`, `Lotas laimėtas už $21,900`
5. Receive — 2.72s — `Pristatymas į Lietuvą`, the delivery map card, `Newark, US → Klaipėda, LT`, `≈ 6–9 savaitės nuo durų iki durų`
6. Outro — 3.46s — hero photo band, logo, headline, `Pradėti statyti`, `easybid.lt`

Implemented as four scene files: `price` (scenes 1–2, so the number can carry across), `flow` (3–4, so the picked row can become the bid card), `route` (5) and `outro` (6).

## Audio
- Audio role: warm bed with sparse professional accents
- Audio arc: quiet under the hook and the fee rows; the track lifts exactly as the total lands; light tactile sounds through search, bid and delivery; a warm resolve on the logo; 1.5 s fade
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3` (Sascha Ende, ende.app, CC BY 4.0 — credit required)
- Music treatment: `data-media-start="1.65"`, volume 0.5, fade-in 0.3 s, fade-out 1.5 s; the delivered file gets +5.3 dB and a -1 dB limiter in the final encode (measured -16.1 LUFS, peak -1.0 dBFS)
- Music cue guidance: preset at `<skill-dir>/assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.json`; film time = track time − 1.65. Locks: total at 7.07 s (the bass entry, measured per frame), claim words from 7.43 s, delivery scene at 15.82 s, pin at 16.90 s. Bid ticks at 13.50 and 13.95 s, win banner on the kick at 14.17 s, logo on the kick at 18.80 s.
- Audio-reactive treatment: subtle; the glow behind the total bar (7.03–9.7 s) and behind the outro logo (18.6–22 s) follows the bed's bass envelope, extracted with the `media-use` helper and applied as build-time tweens
- Audio-coupled moments:
  - hook — soft low hit as `575 USD` lands
  - reveal — one quiet tick per fee row; a soft impact on the total
  - find — key ticks while typing; a soft drop per result row; a select tick on the highlight
  - bid — a click per bid tick; a short warm bell on the win banner
  - receive — a soft landing as the pin drops
  - outro — one low tone on the logo
- SFX selection guidance: low high-frequency-risk files for anything repeated; rotate takes; whooshes only on the three large moves (photo into card, map cut, iris)
- SFX analysis guidance: `<skill-dir>/assets/sfx/sfx-analysis.md`
- Exact SFX choice: made after the animation existed; see `composition/index.html`
- Audio files: copied into `brag-output-2026-11-12-193048/composition/assets/music/` and `assets/sfx/`

## Hyperframes Instructions
Built with the `hyperframes`, `hyperframes-cli`, `hyperframes-registry` and `media-use` skills (contract and `data-*` timing from `references/format.md`, motion from `references/motion.md`, look from `references/look.md`). /brag is its own workflow: no storyline step, no `SPEC.md`, no usage, history, feedback or REVIEW.md steps; `check` is the gate.

Requirements:
- Show at least one real UI, copy, or visual element from the source project.
- Keep all text readable in the final render.
- Keep the video within 15-25 seconds.
- Include the planned music/SFX layer.
- Treat cue metadata as optional timing hints; readability, pacing and the product story come first.
- Use local assets for audio, fonts and images.
- Run `hyperframes check` before render — it is brag's single gate.
- Keep creation and rendering local. Remote or publishing workflows require a separate explicit user request.

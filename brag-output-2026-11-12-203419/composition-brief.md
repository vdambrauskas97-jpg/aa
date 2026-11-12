# Hyperframes Composition Brief: EasyBid (vertical, Porsche Panamera)

## Objective
Create a short launch-style brag video for EasyBid (easybid.lt).

## Output
- Composition directory: `brag-output-2026-11-12-203419/composition/`
- Rendered video: `brag-output-2026-11-12-203419/brag.mp4`
- Format: vertical — 1080x1920, 30 fps
- Duration: 22 seconds

## Source Material
- Source: the live site `https://easybid.lt/lt` (Lithuanian), captured in a headless browser; not this repository's code
- Pages read: the lot page the user chose (`/lt/lots/copart/68424276-2017-porsche-panamera`, captured 2026-11-12; its auction has ended), plus home, `Kaip tai veikia`, the lot list and the stylesheet (captured 2026-11-11)
- Product name: EasyBid
- Tagline / strongest claim: `…matykite galutinę kainą dar prieš statydami.`
- Key UI or visual moment to recreate: the lot page's `Klaipėdoje / Preliminaru` price panel landing on `Preliminari galutinė kaina 22 769 €`
- Copy that must appear verbatim:
  - `Aukcionas baigėsi`; `Loto kaina` / `15 400 USD`; `Priekis`; `2017 PORSCHE PANAMERA`; `Copart`; `Lotas 68424276`
  - `Klaipėdoje` / `Preliminaru`; `Loto kaina 15 400 USD`; `Aukciono mokesčiai 1 405 USD`; `Pervežimas iki JAV uosto 525 USD`; `Transportavimas į Klaipėdos uostą 700 USD`; `EasyBid tarpininkavimas 450 USD`; `Importo muitas 1 848 USD`; `PVM 4 269 USD`; `Krovos darbai Klaipėdoje 350 €`; `Preliminari galutinė kaina 22 769 €`
  - `Skaičiuota pagal esamus tarifus. Galutinės sumos patvirtinamos sąskaitoje.`
  - `Matykite galutinę kainą dar prieš statydami.`
  - `683 337 lotų`; `Copart ir IAAI viename sąraše`
  - `2013 / 2019 / 2021 BMW M5` with `Statymas` and `Su pristatymu` prices as on the site's demo
  - `2019 BMW M5 · Lotas 0-44873101`; `Jūsų maksimali suma $22,000`; `Statymas`; `$21,300`, `$21,600`, `$21,900`; `Lotas laimėtas už $21,900`
  - `Niekada nė centu daugiau, nei nurodėte`
  - `Pristatymas į Lietuvą`; `≈ 6–9 savaitės nuo durų iki durų`; `Muitinė sutvarkyta`; `Newark, US`; `Klaipėda, LT`
  - `JAV aukcionų automobiliai iki Klaipėdos`; `Pradėti statyti`; `easybid.lt`
- Invented connective copy (asserts nothing about the product): `O kiek Klaipėdoje?`. The hook label joins two of the site's phrases with a dot: `Aukcionas baigėsi · Loto kaina`.

## Creative Direction
- Tone preset: default
- Creative direction: the honest price reveal — a calm, exact product film where one number tells the truth
- Interpretation: confident and precise; pace from the interface working; titles land and stay still; sound restrained
- Angle: the auction price is not your final price. A Panamera with a lot price of 15 400 USD comes to 22 769 € in Klaipėda, shown fee by fee; then the site's own find → bid → receive flow. The lot's auction has ended and the video says so.
- Hook: lot identity on top, the Panamera centred in the middle of the frame, `Aukcionas baigėsi · Loto kaina`, `15 400 USD`, then `O kiek Klaipėdoje?`
- Outro / punchline: logo, `JAV aukcionų automobiliai iki Klaipėdos`, `Pradėti statyti`, `easybid.lt`
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Unrelated visual redesign
  - The lot's VIN, any phone number or email address
  - Calling `15 400 USD` a sale price: the page does not

## Visual Identity
- Background: `#fbfcfe` (page), `#ffffff` cards with `#e2e9f0` hairlines; map sky `#f1f7fc`
- Dark grounds: the site's hero, `#14202e` with its `#0d1828` washes; navy `#0e2f4e` for the total bar
- Text: `#14283c`; muted `#5a6e82`
- Accent: `#0e74c5`; logo cyan `#00aeef`; success `#1f6b3f` on `#e9f6ee`; pin red `#d61f25`; Copart `#1b62b5`
- Display font: Geist 900 (the site's face; files in `assets/fonts/`, SIL OFL 1.1)
- Body font: Geist 400 / 500 / 700
- Visual references from the project: lot page price panel and bid card; the animated demos on `Kaip tai veikia` (search, bid, delivery map with its SVG truck, ship and pin); the home hero photo and its wash; the logo
- LOOK: light `#fbfcfe` product stage between two dark photographic bookends; Geist 900 titles at 62–96 px (146 px for the hook number, full width), UI text 28–50 px; 2 px `#e2e9f0` hairlines and 14–24 px radii scaled from the site's 1 px / 6–10 px; key content inside x 108–972, y 192–1728, nothing that must be read in the lower fifth

## Vehicle centring (the change in this run)
- Lot photo 1280×960; car bounding box x 28–1211, y 186–716; centre 48.4 % / 47.0 %.
- `#p-photo` is 1116×837 at left 0, top 457, so the car's centre is on x = 540. Hook clip `inset(73px 0 124px 0)`: a 640 px band at y 530–1170 with the car's centre at y 850.
- Card state: `x 107.4, y -278, scale 0.80108`, clip `inset(106.1px 36.7px 156.7px 0.8px round 30px)`: an 864×460 window at (108, 264) whose centre (540, 494) is the car's centre.
- `#p-photo-in` zooms 1.02 → 1 around `48.4% 47%`, the car's centre.
- The lot title is one element: white above the car in the hook, then it rides up and turns to ink as the heading above the card. Nothing but the `PRIEKIS` flag sits on the photo.
- Outro: `hero.jpg` (car at x 26.3–74.8 %, y 42–83 %) is placed at 1680×945, left -310, top -155, so its car's centre is on x = 540; `#o-photo` scales around `540px 438px`.

## Storyboard
Use the storyboard in `brag-output-2026-11-12-203419/brag-plan.md` as the creative contract.

Scene summary:
1. Hook — 2.74s — lot identity, the centred car, `Aukcionas baigėsi · Loto kaina 15 400 USD`, `O kiek Klaipėdoje?`
2. Reveal — 7.07s — the price panel fills row by row and lands on `22 769 €`; logo and claim
3. Find — 2.78s — `bmw m5` typed, three rows with delivered prices, `683 337 lotų`
4. Bid — 3.23s — maximum `$22,000`, bid ticks to `$21,900`, `Lotas laimėtas už $21,900`
5. Receive — 2.72s — `Pristatymas į Lietuvą`, the delivery map card, `Newark, US → Klaipėda, LT`, `≈ 6–9 savaitės nuo durų iki durų`
6. Outro — 3.46s — hero photo band, logo, headline, `Pradėti statyti`, `easybid.lt`

Implemented as four scene files: `price` (scenes 1–2, so the photo, the title and the number can carry across), `flow` (3–4, so the picked row can become the bid card), `route` (5) and `outro` (6). `flow` and `route` are unchanged from the previous run.

## Audio
- Audio role: warm bed with sparse professional accents
- Audio arc: quiet under the hook and the fee rows; the track lifts exactly as the total lands; light tactile sounds through search, bid and delivery; a warm resolve on the logo; 1.5 s fade
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3` (Sascha Ende, ende.app, CC BY 4.0 — credit required)
- Music treatment: `data-media-start="1.65"`, volume 0.5, fade-in 0.3 s, fade-out 1.5 s; the delivered file gets +5.3 dB and a -1 dB limiter in the final encode (about -16 LUFS, peak -1.0 dBFS)
- Music cue guidance: preset at `<skill-dir>/assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.json`; film time = track time − 1.65. Locks: total at 7.07 s (the bass entry, measured per frame), claim words from 7.43 s, delivery scene at 15.82 s, pin at 16.90 s. Bid ticks at 13.50 and 13.95 s, win banner on the kick at 14.17 s, logo on the kick at 18.80 s.
- Audio-reactive treatment: subtle; the glow behind the total bar (7.03–9.7 s) and behind the outro logo (18.6–22 s) follows the bed's bass envelope, extracted with the `media-use` helper and applied as build-time tweens
- Audio-coupled moments:
  - hook — soft low hit as `15 400 USD` lands
  - reveal — one quiet tick per fee row; a soft impact on the total
  - find — key ticks while typing; a soft drop per result row; a select tick on the highlight
  - bid — a click per bid tick; a short warm bell on the win banner
  - receive — a soft landing as the pin drops
  - outro — one low tone on the logo
- SFX selection guidance: low high-frequency-risk files for anything repeated; rotate takes; whooshes only on the three large moves (photo into card, map cut, iris)
- SFX analysis guidance: `<skill-dir>/assets/sfx/sfx-analysis.md`
- Exact SFX choice: unchanged from the previous run; see `composition/index.html`
- Audio files: copied into `brag-output-2026-11-12-203419/composition/assets/music/` and `assets/sfx/`

## Check result
`hyperframes check`: 0 errors. One advisory `line_unread` warning for `O kiek Klaipėdoje?`: the checker dropped one measurement sample inside the line's hold (at 2.0 s in one run, at 1.875 s in the next) and counted the hold as ending there. The line is on screen from 1.07 s to 2.54 s, about 1.47 s, above the 1.40 s the checker asks for.

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

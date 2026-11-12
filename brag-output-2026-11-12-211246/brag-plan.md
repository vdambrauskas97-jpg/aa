# Brag Plan: EasyBid (vertical, Porsche Panamera)

Fourth run. Same picture as `brag-output-2026-11-12-203419/` (the 2017 Porsche Panamera lot, vehicle centred). What changed is the music: the corporate bed is replaced with an 80s-style synth-pop track, and the bed is held back with a low-pass filter until the total lands.

Source: the live site `easybid.lt` (Lithuanian version). The lot page `/lt/lots/copart/68424276-2017-porsche-panamera` was captured on 2026-11-12; the rest of the site on 2026-11-11.
On-screen language: Lithuanian. Every product claim and number below is copied from the site.

## What is this app?
EasyBid lets Lithuanian buyers search Copart and IAAI US auction lots, bid through EasyBid's broker account, and see the full price delivered to Klaipėda before they bid; EasyBid then handles pickup, sea freight and customs.

## The angle
The auction price is not your final price. A 2017 Porsche Panamera with a lot price of **15 400 USD** comes to **22 769 €** in Klaipėda on EasyBid's own panel, fee by fee. The lot's auction has ended, and the video says so with the site's own `Aukcionas baigėsi`.

## Hook (first 2-3 seconds)
`PRIEKIS`, `2017 PORSCHE PANAMERA`, `Copart` and `Lotas 68424276` on top. The black Panamera in a full-width band in the middle of the frame. Under it: `Aukcionas baigėsi · Loto kaina`, then `15 400 USD` across the full width, then `O kiek Klaipėdoje?`

## Key moments (the middle)
- The `Klaipėdoje / Preliminaru` panel fills in row by row and lands on the navy bar: `Preliminari galutinė kaina 22 769 €`.
- Search: `bmw m5` typed, three rows with `Statymas` and `Su pristatymu`; `683 337 lotų`, Copart and IAAI in one list.
- Bid: `Jūsų maksimali suma $22,000`, the bid ticks `$21,300 → $21,600 → $21,900`, then `Lotas laimėtas už $21,900`.
- Delivery: the site's map card, `Newark, US → Klaipėda, LT`, `≈ 6–9 savaitės nuo durų iki durų`, `Muitinė sutvarkyta`.

## Outro / punchline
The site's hero photo as a band across the top, its car centred, then the logo, `JAV aukcionų automobiliai iki Klaipėdos`, the button `Pradėti statyti` and `easybid.lt`.

## User flow worth showing
1. Find: one search over Copart and IAAI, with the delivered price in every row.
2. Bid: you name a maximum; EasyBid enters the bid by hand and never exceeds it.
3. Receive: paid, shipped across the Atlantic, cleared through customs in Klaipėda.

## Tone
- Preset: default
- Creative direction: the honest price reveal — a calm, exact product film where one number tells the truth
- Interpretation: confident and precise; pace from the interface working; titles land and stay still; sound restrained

## Format: vertical — 1080x1920
## Duration: 22 seconds

## Visual identity (from the project)
- Background: `#fbfcfe` page, `#ffffff` cards with `#e2e9f0` hairlines; dark grounds: the site's hero `#14202e` with its `#0d1828` washes, and navy `#0e2f4e` for the total bar
- Accent: `#0e74c5` (interface blue); logo cyan `#00aeef`; success `#1f6b3f`; alert `#d61f25`; Copart blue `#1b62b5`
- Text: `#14283c`, muted `#5a6e82`
- Display font: Geist 900
- Body font: Geist 400 / 500 / 700
- Strongest visual element: the `Klaipėdoje` price panel with its navy total bar
- Portrait layout: key content inside x 108–972 and y 192–1728, with the lower fifth kept clear of anything that must be read, because social apps cover it

## Vehicle centring
The listing photo is 1280×960 and the car fills it almost edge to edge: its bounding box is x 28–1211, y 186–716, so its centre is at 48.4 % / 47.0 % of the photo.
- Hook: the photo is sized to 1116 px wide so that centre lands on the frame's vertical axis, x = 540. The car spans x 24–1056, with the same 24 px either side. The photo is clipped to a 640 px band, y 530–1170, around the car, which puts the car's centre at y 850: the middle of the area that stays visible between an app's top bar and its bottom caption zone. The geometric centre, y 960, would push the question into that caption zone.
- Lot card: the 864×460 window is centred on the same point, so the car's centre is the card's centre (540, 494). The lot title moved off the photo to a heading above the card, so nothing covers the car.
- The slow zoom in the hook turns around the car's centre, so it stays on the axis while it moves.
- Outro: the hero photo is placed so its car's centre is on x = 540 as well, and the push-in turns around it.
- Measured in rendered frames: the car is within 1 px of the axis in the hook and in the card.

## Data handling
The lot's VIN is left out, and no phone number or email address from the site appears anywhere. Lot photo, lot number and prices are the public listing as shown on the site. The lot number on the windscreen sticker in the photo is the same public lot number.

## Two things to know before posting
- The lot page shows no hammer price. Its bid card says `Aukcionas baigėsi` / `Šis lotas nebepriima statymų.` The `15 400 USD` is the lot price that the page's own `Klaipėdoje` panel starts from, and the video labels it `Loto kaina`, the panel's word, not "sold for".
- The same lot, 68424276, is also listed under `Mūsų parduodami automobiliai` at a fixed `20 000 €` with VAT. The lot page's panel gives `22 769 €`. The video uses the lot page, as asked.

## Share copy (draft)
2017 Porsche Panamera, Copart aukcionas: loto kaina – 15 400 USD. Klaipėdoje – apie 22 769 €. EasyBid parodo galutinę kainą dar prieš statant. easybid.lt

## Audio direction
- Role: a driving retro synth-pop bed with sparse professional accents
- Music: `newer-wave-by-kevin-macleod.mp3` — "Newer Wave" by Kevin MacLeod: synths and drums built on the galloping bass of 80s new wave. Chosen because it has a clear genre of its own instead of stock corporate cheer, because a retro synth drive suits a film about cars, and because it runs at 110 BPM, the grid the picture was already cut to, so no picture timing changed.
- Music treatment: start 47.5 s into the track, so its breakdown sits under the hook and the fee rows and the downbeat of its full return lands on the total at 7.07 s. A low-pass filter holds the bed at 1.5 kHz under the hook, opens through the fee rows and the count-up, and clears to full range on the total. Bed at 0.32, the same loudness as the previous bed; 0.3 s fade-in, 1.5 s fade-out; the finished file is mastered to -16 LUFS
- Music cue guidance: the skill has no preset for this track; the cues were measured from the file and checked in the render. See the section below
- Audio-reactive treatment: subtle; the glow behind the navy total bar and behind the outro logo follows the new bed's bass. No waveform or equalizer visuals.
- SFX posture: sparse to moderate, motion-matched, quiet; low high-frequency-risk files for anything repeated. Unchanged from the previous run.
- Audio-coupled moments: fee rows landing, the total landing, typed search query, result rows, bid ticks, the win banner, the pin in Klaipėda, the outro logo
- Restraint rule: no sound louder than the total landing; repeated ticks stay in the background

## Music cue guidance
Film time = track time − 47.5.
- Tempo 110.00 BPM against a picture grid of 109.96: under 10 ms of drift across the film. One beat ≈ 0.545 s; kick on every beat, snare on 2 and 4.
- Locks (film time, measured in the rendered audio): 0.53 s kick under the number; **7.07 s** downbeat of the full return under the total; 14.17 s snare under the win banner; **15.81 s** the next four-bar phrase starts with the delivery scene; 16.90 s kick under the pin; 18.53 s snare under the iris, with the logo half a beat later.
- The track's own stutter fill, two short gaps at about 5.6 s and 6.2 s, falls under the count-up.
- Beat-grid windows: fee rows 3.55–5.19 s on half beats, then the full set holds; search rows 10.47–10.91 s.
- Restraint: readability wins over the grid.

## Storyboard

### Scene 1 — Hook: the auction price — 2.74s (0.00–2.74)
Dark ground. On top: tag `PRIEKIS`, title `2017 PORSCHE PANAMERA`, chips `Copart` and `Lotas 68424276`. In the middle: the lot photo (black Panamera, front three-quarter, front damage) as a full-width band with the car centred, its top and bottom edges melting into the ground. Below: the label `Aukcionas baigėsi · Loto kaina` and the number `15 400 USD` across the full width. Then `O kiek Klaipėdoje?`
Sequential/interaction: none; one number, one question
Audio intent: quiet, a held breath
Audio-coupled idea: a soft low hit as the number lands
Music: the track's breakdown, held back by the low-pass
Transition mood: clean → Scene 2 (the band shrinks into the lot card, the title rides up to head it, the ground floods to the light page, the number carries into the panel's first row)

### Scene 2 — Reveal: the price in Klaipėda — 7.07s (2.74–9.81)
The title as a heading, the lot card under it (the car centred in the card, the `PRIEKIS` flag on its corner), the `Klaipėdoje / Preliminaru` panel below at full width. Rows land one by one: `Loto kaina 15 400 USD`, `Aukciono mokesčiai 1 405 USD`, `Pervežimas iki JAV uosto 525 USD`, `Transportavimas į Klaipėdos uostą 700 USD`, `EasyBid tarpininkavimas 450 USD`, `Importo muitas 1 848 USD`, `PVM 4 269 USD`, `Krovos darbai Klaipėdoje 350 €`. The navy bar counts up and lands on `22 769 €`. The lot card then gives way to the logo and `Matykite galutinę kainą dar prieš statydami.` Footnote as on the site.
Sequential/interaction: yes — eight fee rows one by one, then a 1.45 s count-up
Audio intent: small precise ticks building to one landing
Audio-coupled idea: a quiet tick per row; a soft impact when the total lands on the downbeat of the music's full return, as the filter opens
Transition mood: clean → Scene 3 (leaves upward; the next scene rises from below)

### Scene 3 — Find: one search — 2.78s (9.81–12.59)
Caption on top: chip `683 337 lotų`, `Copart ir IAAI viename sąraše`. Below: `bmw m5` typed into the search bar, three result rows (`2013 BMW M5`, `2019 BMW M5`, `2021 BMW M5`, each with `Statymas` and `Su pristatymu`), the middle one highlighted.
Sequential/interaction: yes — simulated typing, three rows one by one, the row highlight
Audio intent: light, tactile
Audio-coupled idea: key ticks, a soft drop per row
Transition mood: soft → Scene 4 (the highlighted row becomes the bid card)

### Scene 4 — Bid: never above your maximum — 3.23s (12.59–15.82)
Caption `Niekada nė centu daugiau, nei nurodėte`. The bid card: `2019 BMW M5 · Lotas 0-44873101`, `Jūsų maksimali suma $22,000`, `Statymas`, the price ticking to `$21,900`, then the green banner `Lotas laimėtas už $21,900`.
Sequential/interaction: yes — two bid ticks, then the win banner on the snare
Audio intent: tension, then a small win
Audio-coupled idea: a click per tick, a short warm bell on the banner
Transition mood: clean → Scene 5

### Scene 5 — Receive: across the Atlantic — 2.72s (15.82–18.54)
Caption `Pristatymas į Lietuvą`, chip `≈ 6–9 savaitės nuo durų iki durų`, and the site's delivery scene as a 4:3 card: the truck reaches the US dock, the container ship crosses, the pin drops in Klaipėda with `Muitinė sutvarkyta`. Labels `Newark, US` and `Klaipėda, LT`.
Sequential/interaction: yes — truck, then ship, then pin and chip
Audio intent: forward motion resolving
Audio-coupled idea: a soft landing as the pin drops on the kick
Transition mood: dramatic → Scene 6 (an iris opens from the pin)

### Scene 6 — Outro — 3.46s (18.54–22.00)
The site's hero photo as a band across the top, its car centred, fading into the dark ground. Logo, `JAV aukcionų automobiliai iki Klaipėdos`, the white button `Pradėti statyti` and `easybid.lt`, all above the lower fifth. Everything holds still for the last two seconds.
Sequential/interaction: none
Audio intent: resolved, warm
Audio-coupled idea: one soft low tone as the logo lands
Music: bed fades over the final 1.5 s
Transition mood: end

**Music mood for this video:** retro synth-pop with a galloping bass — held back under the reveal, full from the total onward
**Audio summary:** A filtered synth-pop gallop and tiny ticks under the fee rows, one clean landing on 22 769 € as the track opens up, light tactile sounds through search, bid and delivery, and a warm resolve on the logo.

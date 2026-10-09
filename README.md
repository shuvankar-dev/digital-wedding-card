# শুভ বিবাহ · Prity & Shubhankar

A premium, mobile-first digital wedding invitation in Kolkata style. It is a static
site (HTML, CSS and JavaScript only, with no build step), so it runs anywhere that
serves files, including GitHub Pages.

## What's inside

| Section | What it shows |
| --- | --- |
| Envelope | Maroon envelope with a gold wax seal (প ❦ শ). Tapping it cracks the seal, opens the flap, plays a temple-bell chime and showers petals. |
| শুভ বিবাহ (hero) | Marigold and mango-leaf toran, twinkling fairy lights, a slowly turning alpana, flying golden butterflies (প্রজাপতি) and a live countdown to 12 Dec 2026. |
| দেগঙ্গা থেকে কলকাতা | A live Kolkata scene: Howrah Bridge with moving taxis, a bus and a tram, boats on the Ganga, flying birds, a kite and the bride's palki carried along the ghat. |
| শুভদৃষ্টি | Illustrated bride (shola mukut, chandan, nath, Banarasi) and groom (topor, panjabi, uttariya) under a jharokha arch, with the gathchora knot. |
| পরিচিতি | Bride's family first (featured card), then the groom's family. |
| নিমন্ত্রণ | The full invitation letter. |
| স্মরণলিপি | Wedding and Bou-Bhat/reception cards with "add to calendar" links, the venue, a Google Map and the step-by-step bus route. |
| বধূবরণ | Alta footprints walking from the দুধে-আলতা plate to a "স্বাগতম" doorway. |
| যোগাযোগ | WhatsApp, call and share buttons for 8101300532. |

A floating bar at the bottom switches between বাংলা and English, toggles music and
jumps to the map, call or WhatsApp.

## Making changes

All the editable details are at the top of `js/main.js` in `CONFIG`:

- **Exact map location:** set `mapQuery` to the venue's address or its
  `"latitude,longitude"` (for example `"22.6012,88.4321"`). The embedded map and
  the "Get directions" button both use it.
- **Phone / WhatsApp:** `phone` (country code + number, no `+`).
- **Family details:** the `FAMILY` object just below `CONFIG`.

### Optional media

- **Music:** put an mp3 at `assets/audio/music.mp3` (for example a shehnai track). It plays
  when the envelope is opened. Without it, a soft tanpura drone, generated in
  the browser, plays instead.
- **Hero video:** put a short looping clip at `assets/video/hero.mp4`. It plays muted
  behind the শুভ বিবাহ title under a maroon tint, so any footage (diyas, flowers,
  a pre-wedding clip) keeps the card's palette.

## Sharing links

- `…/index.html?to=Rina%20Mashi` shows a personalised "শ্রদ্ধেয় / প্রিয় Rina Mashi"
  line inside the envelope.
- `…/index.html?lang=en` opens the card in English.

## Publishing on GitHub Pages

Go to **Settings → Pages**, choose **Deploy from a branch**, then pick the branch
and `/ (root)`. The card will be live at
`https://<user>.github.io/digital-wedding-card/`.

To preview it locally, run any static server from this folder, for example
`npx http-server .`, and open `http://localhost:8080`.

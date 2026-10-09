# শুভ বিবাহ · Prity & Shubhankar

A premium, mobile-first digital wedding invitation from the **bride's family**
(শ্রী তিলক কুমার পাল ও শ্রীমতী কাকলী পাল). The wedding is at the bride's home
in Odhanpur, Deganga. The design uses a teal, mint and dusty-blue palette with
mandala line art, a Ganesh medallion and butterflies (প্রজাপতি).

It is a static site (HTML, CSS and JavaScript only, with no build step), so it
runs anywhere that serves files, including GitHub Pages.

## What's inside

| Section | What it shows |
| --- | --- |
| Fold-open card | A closed two-panel card (dusty-blue florals on the left, a mint mandala on the right) with "শুভ \| বিবাহ" and "প্রীতি \| শুভঙ্কর" split across the seam. Tapping the Ganesh medallion spins it away, swings both panels open, plays a bell chime and showers petals. |
| শুভ বিবাহ (hero) | Ganesh medallion, jasmine-and-rose garlands with bells, fairy lights, slowly turning mandalas, golden-teal butterflies, the date block, names joined by a heart, and a live countdown. |
| শুভদৃষ্টি | Full-length bride (shola mukut, chandan, nath, rose Banarasi, shankha-pola) and groom (topor, brocade panjabi, dhoti, teal uttariya) holding hands, on a watercolour floral panel. |
| কলকাতা থেকে দেগঙ্গা | A live scene of the groom's palki travelling from Howrah Bridge (with taxis, a bus, a tram, boats and birds) to the village in Deganga, with huts, palms, the wedding pandal and a "দেগঙ্গা" milestone. |
| নিমন্ত্রণ | The invitation letter from the bride's parents, under a Ganesh line drawing. |
| পরিচিতি | The bride's family ("আমাদের কন্যা") first, then the groom's family. |
| শুভ লগ্ন | The wedding date card with "add to calendar", the venue address, a Google Map and a directions button. |
| যোগাযোগ | WhatsApp, call and share buttons for 8101300532, and the sign-off. |

A floating bar at the bottom switches between বাংলা and English, toggles music and
jumps to the map, call or WhatsApp.

## Making changes

All the editable details are at the top of `js/main.js` in `CONFIG`:

- **Exact map location:** set `mapQuery` to the venue's address or its
  `"latitude,longitude"` (for example `"22.70,88.58"`). The embedded map, the
  "Get directions" button and the calendar entry all use it.
- **Phone / WhatsApp:** `phone` (country code + number, no `+`).
- **Family details:** the `FAMILY` object just below `CONFIG`.

### Optional media

- **Painted couple image:** save a portrait image with a transparent background as
  `assets/images/couple.png` (for example one made in Canva or with an AI image
  tool). It replaces the drawn couple automatically.
- **Music:** put an mp3 at `assets/audio/music.mp3` (for example a shehnai track). It plays
  when the card is opened. Without it, a soft tanpura drone, generated in the
  browser, plays instead.
- **Hero video:** put a short looping clip at `assets/video/hero.mp4`. It plays muted and
  faded behind the শুভ বিবাহ title.

## Sharing links

- `…/index.html?to=Rina%20Mashi` shows a personalised "শ্রদ্ধেয় / প্রিয় Rina Mashi"
  line on the closed card.
- `…/index.html?lang=en` opens the card in English.

## Publishing on GitHub Pages

Go to **Settings → Pages**, choose **Deploy from a branch**, then pick the branch
and `/ (root)`. The card will be live at
`https://<user>.github.io/digital-wedding-card/`.

To preview it locally, run any static server from this folder, for example
`npx http-server .`, and open `http://localhost:8080`.

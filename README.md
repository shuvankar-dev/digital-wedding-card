# শুভ বিবাহ · Prity & Shubhankar

A premium, mobile-first digital wedding invitation from the **bride's family**
(শ্রী তিলক কুমার পাল ও শ্রীমতী কাকলী পাল). The wedding is at the bride's home
in Odhanpur, Deganga. The design pairs a bright teal, mint and gold palette with
painted portraits of the couple, marigold garlands and showers of flowers.

It is a static site (HTML, CSS and JavaScript only, with no build step), so it
runs anywhere that serves files, including GitHub Pages.

## What's inside

| Section | What it shows |
| --- | --- |
| Fold-open card | A closed two-panel card with "শুভ \| বিবাহ" and "প্রীতি \| শুভঙ্কর" split across the seam. Tapping the Ganesh medallion swings both panels open while a shower of rose petals, marigolds and jasmine bursts out of it. A tap anywhere else starts the music and nudges the medallion; there is also a music button in the corner. |
| শুভ বিবাহ (opening scene) | The couple's painted portrait on a soft teal floral backdrop under "শুভ বিবাহ", with swaying marigold garlands, bells and fairy lights, gold sparkles, butterflies, a slow camera drift and a sweep of light. |
| সাদর আমন্ত্রণ | Ganesh medallion, the names joined by a heart, the date, the Bengali date, the place and a live countdown. |
| শুভদৃষ্টি | The couple's second portrait (dhoti-panjabi and red Banarasi, flower garlands) in an arched gold frame, with butterflies and sparkles. |
| নিমন্ত্রণ | The invitation letter from the bride's parents, under a Ganesh line drawing. |
| পরিচিতি | The bride and the groom, each with their father and mother. |
| শুভ লগ্ন | The wedding date card with "add to calendar", then the venue address, a Google Map and a directions button. |
| যোগাযোগ | WhatsApp, call and share buttons for +91 81013 00532, and the sign-off. |

Rose petals, marigolds, jasmine and gold sparkles keep falling gently over the
whole card once it is open. A floating bar at the bottom switches between বাংলা
and English, toggles music and jumps to the map, call or WhatsApp.

## Music

Two parts of "Rote Gachey Khobor" (Rupak Tiary & Qpid) play as two moods:

- `assets/audio/khobor-envelope.mp3`: 0:10–0:20, on the closed card.
- `assets/audio/khobor-main.mp3`: 0:53–1:15, from the moment the card is opened.

Each part loops, blending its end into its start, so there is no gap or jump.
Phones only allow sound after the guest's first touch, so the first part starts
on the first tap on the closed card (or the music button). Tapping Ganesha cross-fades
into the second part. Where a browser allows sound straight away, the first part
starts by itself.

To use different parts of the song, cut new files. Each file is its part plus
1.2 seconds, which is the blend at the loop point (`blend` in `CONFIG.music`):

```sh
ffmpeg -ss 10 -t 11.2 -i song.mp3 -c:a libmp3lame -b:a 128k assets/audio/khobor-envelope.mp3
ffmpeg -ss 53 -t 23.2 -i song.mp3 -c:a libmp3lame -b:a 128k assets/audio/khobor-main.mp3
```

## Making changes

All the editable details are at the top of `js/main.js` in `CONFIG`:

- **Exact map location:** set `mapQuery` to the venue's address or its
  `"latitude,longitude"` (for example `"22.70,88.58"`). The embedded map, the
  "Get directions" button and the calendar entry all use it.
- **Phone / WhatsApp:** `phone` (country code + number, no `+`).
- **Music:** `music` (the two files, the loop blend and the volume).
- **Family details:** the `FAMILY` object just below `CONFIG`.

### Images

| File | Used for |
| --- | --- |
| `assets/images/hero.webp` | The opening scene (1200×2100). Built from the "Elegant" portrait, set low on a soft teal backdrop painted from its own background, so the title has room above the couple. |
| `assets/images/couple.webp` | The শুভদৃষ্টি portrait (2:3), from the "Vibrant" portrait. |
| `assets/images/og.jpg` | The preview image WhatsApp and Facebook show when the link is shared (1200×630). |

To use a different picture, replace the file and keep its name. For the opening
scene, keep empty space in the top third for the title. The `og:image` tag in
`index.html` points to
`https://shuvankar-dev.github.io/digital-wedding-card/assets/images/og.jpg`;
change it if the card is published somewhere else, because link previews need
the full address.

**Optional animated opening:** an animated clip of the opening portrait (for
example made from `hero.webp` with an image-to-video tool) can play over it.
Save it as `assets/video/hero.mp4` and set `heroVideo` in `CONFIG` to that path.

## Sharing links

- `…/index.html?to=Rina%20Mashi` shows a personalised "শ্রদ্ধেয় / প্রিয় Rina Mashi"
  line on the closed card.
- `…/index.html?lang=en` opens the card in English.

## Publishing on GitHub Pages

Go to **Settings → Pages**, choose **Deploy from a branch**, then pick the branch
and `/ (root)`. The card will be live at
`https://shuvankar-dev.github.io/digital-wedding-card/`.

To preview it locally, run any static server from this folder, for example
`npx http-server .`, and open `http://localhost:8080`. Opening `index.html`
directly from the disk works too, but some browsers then play the music without
the soft loop blend.

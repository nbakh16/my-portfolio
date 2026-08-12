# Project screenshots

Drop your project captures here. They are picked up automatically at build time — no code or JSON
changes needed.

## How it works

1. **One folder per project**, named exactly like the project's `slug` in
   [`src/data/projects.json`](../../data/projects.json).

   ```
   src/assets/projects/
   ├── plantitapp/
   └── my-mind/
   ```

2. **Drop the image files in.** Accepted: `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`.
   No need to resize or compress anything first — every image goes through Astro's `<Image>`
   pipeline (Sharp), which generates optimized, correctly sized versions at build time.

3. **The filename sets the order.** Files are sorted naturally by name, so prefix them with a
   number:

   ```
   plantitapp/
   ├── 01-home.png
   ├── 02-plant-scan.png
   ├── 03-health-history.png
   └── 04-community.png
   ```

4. **The first image is also the card cover** on the home page. To use a different one, set
   `"cover"` in `projects.json` to that filename (for example `"cover": "03-health-history.png"`).

5. **Captions are optional.** By default the alt text is `"<Project title> screenshot N"`. To give
   an image a real caption (shown in the lightbox and used as its alt text), add its filename under
   `captions` in `projects.json`:

   ```json
   "captions": {
     "02-plant-scan.png": "AI species recognition from the phone camera",
     "04-community.png": "Themed communities where users trade cuttings"
   }
   ```

   Only the files you want captioned need an entry.

## Notes

- A project with an empty folder simply shows no gallery, and its card falls back to
  `public/placeholder.jpeg`. Nothing breaks.
- The `.gitkeep` files exist only so git tracks the empty folders. Once a folder has real
  screenshots in it, its `.gitkeep` can be deleted.
- Add captures for a **new** project by creating a folder with that project's `slug`.
- Screenshots become part of the public site — make sure they contain no real personal data
  (patient names, emails, tokens). Use demo/seed data.

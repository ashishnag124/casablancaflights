# Flights Overhead (casablancaflights)

Live map of planes flying near a chosen location, refreshed every 15s. It defaults to SFO airport, and visitors change the location with the address search box. Never put a personal home address back in the code; the site is public.

- Live site: https://casablancaflights.ashishnag.com
- Repo: https://github.com/ashishnag124/casablancaflights (branch `main`, public)
- Hosting: Railway. The custom domain is a CNAME to `zyadhlnb.up.railway.app`. A push to `main` auto-deploys in about a minute.

## Files

- `index.html`: the whole frontend (Leaflet 1.9.4 from unpkg, inline CSS and JS). Key constants are `CENTER` (default SFO; the search box reassigns it) and `REFRESH_MS`, near the top of the script. Address autocomplete calls Photon (`photon.komoot.io`, free, no key) straight from the browser, debounced 300ms. A chosen location is written to the URL (`?lat=&lon=&place=`) with `history.replaceState`, so reloads keep it and links are shareable. The `place` text is shown with `textContent` because it comes from the URL.
- `server.js`: Express server. It serves the static files and proxies two APIs:
  - `GET /api/flights?lat&lon&nm` → adsb.lol (free, no key). Gives the planes on the map.
  - `GET /api/flight?ident` → FlightAware AeroAPI. Gives route details in the popup. Needs the `FA_KEY` env var, which is set in Railway, not in the repo.
- `package.json`: `npm start` runs `node server.js` (port from `PORT`, default 3000).

## Run locally

```bash
npm install
npm start
```

Without `FA_KEY` set locally, the map and planes still work; only the FlightAware popup details fail.

## Map tiles

The basemap is Esri World Light Gray (base layer plus label reference layer), keyless, `maxNativeZoom: 16`. Until 2026-11-01 it was CARTO `light_all`, but CARTO started requiring an API key and served "API KEY REQUIRED" placeholder tiles, so it was swapped. If the map breaks again, first `curl` a tile URL to see what the provider returns.

## Notes

- The project used to run on Netlify (functions in `netlify/functions/`). It moved to Railway and Express on 2026-03-10. A comment in `index.html` above the FlightAware fetch still mentions the old Netlify function.
- There is no `.gitignore`, so commit only the files you mean to (not `node_modules/`, `package-lock.json` or `.claude/`).
- `.claude/launch.json` (local only) runs the server for the Claude desktop preview.

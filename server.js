const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/api/flights', async (req, res) => {
  const { lat, lon, nm } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: 'Missing lat/lon' });
  const dist = nm || 25;
  try {
    const r = await fetch(`https://api.adsb.lol/v2/lat/${lat}/lon/${lon}/dist/${dist}`);
    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

app.get('/api/flight', async (req, res) => {
  const { ident } = req.query;
  if (!ident) return res.status(400).json({ error: 'Missing ident' });
  try {
    const r = await fetch(
      `https://aeroapi.flightaware.com/aeroapi/flights/${encodeURIComponent(ident)}`,
      { headers: { 'x-apikey': process.env.FA_KEY } }
    );
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

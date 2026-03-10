exports.handler = async () => {
  const lat = 37.6213;
  const lon = -122.3790;
  const nm  = 25;
  try {
    const res = await fetch(`https://api.adsb.lol/v2/lat/${lat}/lon/${lon}/dist/${nm}`);
    const data = await res.json();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: err.message }) };
  }
};

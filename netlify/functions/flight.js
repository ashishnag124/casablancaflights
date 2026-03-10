exports.handler = async (event) => {
  const ident = event.queryStringParameters?.ident;
  if (!ident) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing ident' }) };
  }

  try {
    const res = await fetch(
      `https://aeroapi.flightaware.com/aeroapi/flights/${encodeURIComponent(ident)}`,
      { headers: { 'x-apikey': process.env.FA_KEY } }
    );
    const data = await res.json();
    return {
      statusCode: res.status,
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

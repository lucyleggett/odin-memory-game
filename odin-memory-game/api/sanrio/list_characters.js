export default async function handler(req, res) {
  const apiKey = process.env.PARSE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
  }

  try {
    const parseResponse = await fetch('https://parse.bot', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!parseResponse.ok) {
      return res.status(parseResponse.status).json({ error: 'Failed to fetch from Parse marketplace' });
    }

    const data = await parseResponse.json();
    
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

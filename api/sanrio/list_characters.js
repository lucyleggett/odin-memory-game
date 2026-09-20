const SCRAPER_URL =
    "https://api.parse.bot/scraper/671b3e36-0d6a-4074-8c11-d9bcd991c3fd/list_characters";

export default async function handler(req, res) {
    const apiKey = process.env.PARSE_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: "Missing API Key on Vercel" });
    }

    try {
        const parseResponse = await fetch(SCRAPER_URL, {
            method: "GET",
            headers: {
                "X-API-Key": apiKey,
                "Content-Type": "application/json",
            },
        });

        const textData = await parseResponse.text();

        if (!parseResponse.ok) {
            return res.status(parseResponse.status).json({ 
                error: `Scraper API returned status ${parseResponse.status}`,
                details: textData.substring(0, 200)
            });
        }

        const data = JSON.parse(textData);
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

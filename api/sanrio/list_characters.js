export default async function handler(req, res) {
    const apiKey = process.env.PARSE_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: "Missing API Key on Vercel" });
    }

    try {
        const parseResponse = await fetch(
            `https://parse.bot`,
            {
                method: "GET",
                headers: {
                    "X-API-Key": apiKey,
                    "Content-Type": "application/json",
                },
            },
        );

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

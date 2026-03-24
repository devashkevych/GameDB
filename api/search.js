export default async function handler(req, res) {
  try {
    const rawQ = req.query.q;
    const cleanQ = rawQ.trim().replace(/"/g, "").replace(/;/g, "");

    const raw = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`,
      {
        method: "POST",
      },
    );

    const data = await raw.json();

    const gamesRaw = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": `${process.env.CLIENT_ID}`,
        Authorization: `Bearer ${data.access_token}`,
        "Content-Type": "application/json",
      },
      body: `search "${cleanQ}"; fields name, rating, cover.url; limit 10;`,
    });

    const games = await gamesRaw.json();

    return res.status(200).json({ games });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

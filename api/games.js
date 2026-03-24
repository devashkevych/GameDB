export default async function handler(req, res) {
  try {
    const tenYearAgo = Math.floor(Date.now() / 1000) - 10 * 365 * 24 * 60 * 60;

    const raw = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`,
      {
        method: "POST",
      },
    );

    if (!raw.ok) throw new Error("Token fetch problem");

    const data = await raw.json();

    const gamesRaw = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": `${process.env.CLIENT_ID}`,
        Authorization: `Bearer ${data.access_token}`,
        "Content-Type": "text/plain",
      },
      body: `fields name, rating, rating_count, cover.url, game_type, first_release_date; where rating != null &
    rating_count > 100 &
    cover != null & game_type = 0 & first_release_date > ${tenYearAgo}; limit 16;  sort rating desc;`,
    });

    if (!gamesRaw.ok) throw new Error("Games fetch problem");

    const games = await gamesRaw.json();
    return res.status(200).json({ games });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

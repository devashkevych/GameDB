export default async function handler(req, res) {
  const tenYearAgo = Math.floor(Date.now() / 1000) - 10 * 365 * 24 * 60 * 60;

  const raw = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`,
    {
      method: "POST",
    },
  );

  const data = await raw.json();
  console.log(data);

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

  const games = await gamesRaw.json();
  console.log(games);

  return res.status(200).json({ games });
}

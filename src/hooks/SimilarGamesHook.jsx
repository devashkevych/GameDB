import { useState, useEffect } from "react";

export const useSimilarGames = (ids) => {
  const [similarLoading, setSimilarLoading] = useState(true);
  const [similarGames, setSimilarGames] = useState([]);
  const [similarError, setSimilarError] = useState(null);

  useEffect(() => {
    if (!ids?.length) {
      setSimilarGames([]);
      setSimilarLoading(false);
      setSimilarError(null);
      return;
    }
    setSimilarError(null);
    setSimilarLoading(true);

    const fetchSimilarGames = async (ids) => {
      try {
        const load = await Promise.all(
          ids.map(async (id) => {
            const response = await fetch(`/api/gamedetails?q=${id}`);
            if (!response.ok) throw new Error("Error occured during fetching");
            const data = await response.json();
            return data[0];
          }),
        );
        setSimilarGames(load);
      } catch (e) {
        setSimilarError(e.message);
      } finally {
        setSimilarLoading(false);
      }
    };
    fetchSimilarGames(ids);
  }, [ids]);

  return { similarGames, similarError, similarLoading };
};

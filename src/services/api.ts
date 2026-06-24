import axios from "axios";

const api = axios.create({
  baseURL: "https://v3.football.api-sports.io",
  headers: {
    "x-rapidapi-key": "TU_API_KEY",
    "x-rapidapi-host": "v3.football.api-sports.io",
  },
});

/**
 * 🔴 PARTIDOS EN VIVO
 */
export const getLiveMatches = async () => {
  try {
    const res = await api.get("/fixtures", {
      params: { live: "all" },
    });

    return res.data.response;
  } catch (error) {
    console.log("Error live:", error);
    return [];
  }
};

/**
 * 🏆 TABLA DE GRUPOS REAL (STANDINGS)
 */
export const getStandings = async (
  leagueId: number,
  season: number
) => {
  try {
    const res = await api.get("/standings", {
      params: {
        league: leagueId,
        season: season,
      },
    });

    return res.data.response;
  } catch (error) {
    console.log("Error standings:", error);
    return [];
  }
};
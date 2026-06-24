import axios from "axios";

const api = axios.create({
  baseURL: "https://v3.football.api-sports.io",
  headers: {
    "x-rapidapi-key": "TU_API_KEY",
    "x-rapidapi-host": "v3.football.api-sports.io",
  },
});

/**
 * 🔴 PARTIDOS EN VIVO (TIEMPO REAL)
 */
export const getLiveMatches = async () => {
  try {
    const res = await api.get("/fixtures", {
      params: {
        live: "all",
      },
    });

    return res.data.response;
  } catch (error) {
    console.log("Error live:", error);
    return [];
  }
};
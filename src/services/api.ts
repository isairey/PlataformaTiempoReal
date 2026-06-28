import axios from "axios";

const api = axios.create({
  baseURL: "https://v3.football.api-sports.io",
  headers: {
    "x-rapidapi-key": "11161a3b4e577021db00da9e9fa55f59",
    "x-rapidapi-host": "v3.football.api-sports.io",
  },
});

const WORLD_CUP_LEAGUE = 1;
const WORLD_CUP_SEASON = 2026;

/* ===========================
   PARTIDOS EN VIVO
=========================== */

export const getLiveMatches = async () => {
  try {
    const { data } = await api.get("/fixtures", {
      params: {
        live: "all",
      },
    });

    return data.response;
  } catch (e) {
    console.log(e);
    return [];
  }
};

/* ===========================
   TODOS LOS PARTIDOS
=========================== */

export const getAllMatches = async () => {
  try {
    const { data } = await api.get("/fixtures", {
      params: {
        league: WORLD_CUP_LEAGUE,
        season: WORLD_CUP_SEASON,
      },
    });

    return data.response;
  } catch (e) {
    console.log(e);
    return [];
  }
};

/* ===========================
   TABLA DE GRUPOS
=========================== */

export const getStandings = async () => {
  try {
    const { data } = await api.get("/standings", {
      params: {
        league: WORLD_CUP_LEAGUE,
        season: WORLD_CUP_SEASON,
      },
    });

    if (!data.response.length) return [];

    return data.response[0].league.standings;
  } catch (e) {
    console.log(e);
    return [];
  }
};

/* ===========================
   DIECISEISAVOS
=========================== */

export const getRound32 = async () => {
  const matches = await getAllMatches();

  return matches.filter((m: any) =>
    m.league.round
      ?.toLowerCase()
      .includes("round of 32")
  );
};

/* ===========================
   OCTAVOS
=========================== */

export const getRound16 = async () => {
  const matches = await getAllMatches();

  return matches.filter((m: any) =>
    m.league.round
      ?.toLowerCase()
      .includes("round of 16")
  );
};

/* ===========================
   CUARTOS
=========================== */

export const getQuarterFinals = async () => {
  const matches = await getAllMatches();

  return matches.filter((m: any) =>
    m.league.round
      ?.toLowerCase()
      .includes("quarter")
  );
};

/* ===========================
   SEMIFINALES
=========================== */

export const getSemiFinals = async () => {
  const matches = await getAllMatches();

  return matches.filter((m: any) =>
    m.league.round
      ?.toLowerCase()
      .includes("semi")
  );
};

/* ===========================
   TERCER LUGAR
=========================== */

export const getThirdPlace = async () => {
  const matches = await getAllMatches();

  return matches.filter((m: any) =>
    m.league.round
      ?.toLowerCase()
      .includes("third")
  );
};

/* ===========================
   FINAL
=========================== */

export const getFinal = async () => {
  const matches = await getAllMatches();

  return matches.filter((m: any) =>
    m.league.round
      ?.toLowerCase() === "final"
  );
};
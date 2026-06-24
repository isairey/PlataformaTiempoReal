import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { getWorldCupMatches } from "../services/api";

export default function MatchesScreen() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();

    const interval = setInterval(load, 30000);

    return () => clearInterval(interval);
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getWorldCupMatches();
      setMatches(data);
    } catch (err) {
      console.log("Error loading matches:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderMatch = ({ item }: any) => {
    const home = item.teams.home.name;
    const away = item.teams.away.name;

    const homeGoals = item.goals.home ?? 0;
    const awayGoals = item.goals.away ?? 0;

    const status = item.fixture.status.long;

    return (
      <View style={styles.card}>
        <Text style={styles.league}>
          🏆 {item.league.name}
        </Text>

        <View style={styles.row}>
          <Text style={styles.team}>{home}</Text>

          <View style={styles.scoreBox}>
            <Text style={styles.score}>
              {homeGoals} - {awayGoals}
            </Text>
          </View>

          <Text style={styles.team}>{away}</Text>
        </View>

        <Text style={styles.status}>
          {status}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚽ Mundial 2026</Text>

      {loading && matches.length === 0 ? (
        <ActivityIndicator size="large" color="#22c55e" />
      ) : matches.length === 0 ? (
        <Text style={styles.empty}>
          No hay partidos disponibles
        </Text>
      ) : (
        <FlatList
          data={matches}
          keyExtractor={(item) =>
            item.fixture.id.toString()
          }
          renderItem={renderMatch}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1220",
    padding: 15,
  },

  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#111827",
    padding: 15,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
  },

  league: {
    color: "#94a3b8",
    fontSize: 12,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  team: {
    color: "#fff",
    fontSize: 14,
    flex: 1,
    textAlign: "center",
  },

  scoreBox: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#0f172a",
    borderRadius: 10,
  },

  score: {
    color: "#22c55e",
    fontSize: 20,
    fontWeight: "bold",
  },

  status: {
    marginTop: 10,
    color: "#60a5fa",
    fontSize: 12,
    textAlign: "center",
  },

  empty: {
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 20,
  },
});
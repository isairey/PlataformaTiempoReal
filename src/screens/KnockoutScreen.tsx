import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import {
  getRound32,
  getRound16,
  getQuarterFinals,
  getSemiFinals,
  getThirdPlace,
  getFinal,
} from "../services/api";

export default function KnockoutScreen() {
  const [loading, setLoading] = useState(true);

  const [round32, setRound32] = useState<any[]>([]);
  const [round16, setRound16] = useState<any[]>([]);
  const [quarters, setQuarters] = useState<any[]>([]);
  const [semis, setSemis] = useState<any[]>([]);
  const [third, setThird] = useState<any[]>([]);
  const [finals, setFinals] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const [
        r32,
        r16,
        qf,
        sf,
        tp,
        fn,
      ] = await Promise.all([
        getRound32(),
        getRound16(),
        getQuarterFinals(),
        getSemiFinals(),
        getThirdPlace(),
        getFinal(),
      ]);

      setRound32(r32);
      setRound16(r16);
      setQuarters(qf);
      setSemis(sf);
      setThird(tp);
      setFinals(fn);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const statusES = (fixture: any) => {
    const short = fixture.status.short;
    const elapsed = fixture.status.elapsed;

    switch (short) {
      case "NS":
        return "Programado";

      case "1H":
      case "2H":
      case "ET":
        return `🔴 En vivo ${elapsed}'`;

      case "HT":
        return "Descanso";

      case "FT":
      case "AET":
      case "PEN":
        return "Finalizado";

      default:
        return fixture.status.long;
    }
  };

  const renderMatch = (match: any) => (
    <View
      key={match.fixture.id}
      style={styles.matchCard}
    >
      <View style={styles.teamsRow}>
        <Text style={styles.team}>
          {match.teams.home.name}
        </Text>

        <Text style={styles.score}>
          {match.goals.home ?? "-"} - {match.goals.away ?? "-"}
        </Text>

        <Text style={styles.team}>
          {match.teams.away.name}
        </Text>
      </View>

      <Text style={styles.date}>
        {new Date(
          match.fixture.date
        ).toLocaleString()}
      </Text>

      <Text style={styles.status}>
        {statusES(match.fixture)}
      </Text>
    </View>
  );

  const renderSection = (
    title: string,
    matches: any[]
  ) => {
    if (!matches.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {title}
        </Text>

        {matches.map(renderMatch)}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color="#0A84FF"
        />

        <Text style={styles.loadingText}>
          Cargando eliminatorias...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        🏆 Eliminatorias
      </Text>

      {renderSection(
        "🥇 Dieciseisavos",
        round32
      )}

      {renderSection(
        "🥈 Octavos de Final",
        round16
      )}

      {renderSection(
        "🥉 Cuartos de Final",
        quarters
      )}

      {renderSection(
        "⭐ Semifinales",
        semis
      )}

      {renderSection(
        "🏅 Tercer Lugar",
        third
      )}

      {renderSection(
        "🏆 Final",
        finals
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F7",
  },

  loadingText: {
    marginTop: 15,
    fontSize: 15,
    color: "#666",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111",
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 18,
  },

  section: {
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginHorizontal: 18,
    marginBottom: 12,
  },

  matchCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    marginBottom: 12,
    borderRadius: 20,
    padding: 16,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  teamsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  team: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
    textAlign: "center",
  },

  score: {
    width: 80,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "800",
    color: "#0A84FF",
  },

  status: {
    marginTop: 10,
    textAlign: "center",
    color: "#666",
    fontSize: 13,
  },

  date: {
    marginTop: 8,
    textAlign: "center",
    color: "#999",
    fontSize: 12,
  },

  divider: {
    height: 1,
    backgroundColor: "#EFEFEF",
    marginVertical: 10,
  },

  badgeLive: {
    alignSelf: "center",
    marginTop: 8,
    backgroundColor: "#FF3B30",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  badgeLiveText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 11,
  },

  badgeFinished: {
    alignSelf: "center",
    marginTop: 8,
    backgroundColor: "#34C759",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  badgeFinishedText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 11,
  },

  badgePending: {
    alignSelf: "center",
    marginTop: 8,
    backgroundColor: "#FF9500",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  badgePendingText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 11,
  },

  empty: {
    textAlign: "center",
    color: "#888",
    marginTop: 30,
    fontSize: 15,
  },
});
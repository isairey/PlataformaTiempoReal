import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { getStandings } from "../services/api";

export default function StandingsScreen() {
  // 🔥 FIX: tipado correcto para evitar errores de "language"
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStandings();
  }, []);

  const loadStandings = async () => {
    try {
      const data = await getStandings(1, 2022);

      // ⚠️ API-Football normalmente devuelve response dentro de response
      setGroups(data || []);
    } catch (error) {
      console.log("Error loading standings:", error);
      setGroups([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white", textAlign: "center", marginTop: 50 }}>
          Cargando tabla...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Tabla de grupos</Text>

      <ScrollView>
        {groups?.map((group, index) => (
          <View key={index}>
            
            {/* 🏆 Nombre de liga (SAFE) */}
            <Text style={styles.groupTitle}>
              {group?.league?.name}
            </Text>

            {/* ⚽ Standings */}
          {group?.league?.standings?.[0]?.map((team: any) => (
              <View key={team?.team?.id} style={styles.row}>
                
                {/* Equipo */}
                <Text style={styles.team}>
                  {team?.team?.name}
                </Text>

                {/* Stats */}
                <Text style={styles.cell}>{team?.all?.played}</Text>
                <Text style={styles.cell}>{team?.all?.win}</Text>
                <Text style={styles.cell}>{team?.all?.draw}</Text>
                <Text style={styles.cell}>{team?.all?.lose}</Text>

                {/* Goles */}
                <Text style={styles.goals}>
                  {team?.all?.goals?.for} - {team?.all?.goals?.against}
                </Text>

                {/* Puntos */}
                <Text style={styles.points}>
                  {team?.points}
                </Text>

              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 15,
  },

  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  groupTitle: {
    color: "#38bdf8",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
    alignItems: "center",
  },

  team: {
    flex: 2,
    color: "white",
    fontWeight: "bold",
  },

  cell: {
    flex: 1,
    color: "#cbd5e1",
    textAlign: "center",
    fontSize: 12,
  },

  goals: {
    flex: 2,
    color: "#38bdf8",
    textAlign: "center",
    fontWeight: "bold",
  },

  points: {
    flex: 1,
    color: "#22c55e",
    textAlign: "center",
    fontWeight: "bold",
  },
});
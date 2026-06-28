import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { getStandings } from "../services/api";

export default function StandingsScreen() {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStandings();
  }, []);

  const loadStandings = async () => {
    try {
      const data = await getStandings();
      setGroups(data);
    } catch (error) {
      console.log(error);
      setGroups([]);
    } finally {
      setLoading(false);
    }
  };

  const getGroupName = (index: number) => {
    return String.fromCharCode(65 + index);
  };

  const getRowColor = (rank: number) => {
    if (rank <= 2) return "#E8F5E9";
    if (rank === 3) return "#FFF8E1";
    return "#FFEBEE";
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0A84FF" />
        <Text style={styles.loadingText}>
          Cargando tabla...
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
        🏆 Tabla de Grupos
      </Text>

      {groups.length === 0 ? (
        <Text style={styles.empty}>
          No hay información disponible.
        </Text>
      ) : (
        groups.map((group: any[], index: number) => (
          <View
            key={index}
            style={styles.groupCard}
          >
            <Text style={styles.groupTitle}>
              Grupo {getGroupName(index)}
            </Text>

            {/* Encabezados */}

            <View style={styles.headerRow}>
              <Text style={[styles.headerCell, { flex: 2.5 }]}>
                Equipo
              </Text>

              <Text style={styles.headerCell}>
                PJ
              </Text>

              <Text style={styles.headerCell}>
                G
              </Text>

              <Text style={styles.headerCell}>
                E
              </Text>

              <Text style={styles.headerCell}>
                P
              </Text>

              <Text style={styles.headerCell}>
                DG
              </Text>

              <Text style={styles.headerCell}>
                Pts
              </Text>
            </View>

            {group.map((team: any) => (
              <View
                key={team.team.id}
                style={[
                  styles.teamRow,
                  {
                    backgroundColor: getRowColor(
                      team.rank
                    ),
                  },
                ]}
              >
                {/* Equipo */}

                <View
                  style={{
                    flex: 2.5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.rank}>
                    {team.rank}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={styles.team}
                  >
                    {team.team.name}
                  </Text>
                </View>

                {/* PJ */}

                <Text style={styles.cell}>
                  {team.all.played}
                </Text>

                {/* G */}

                <Text style={styles.cell}>
                  {team.all.win}
                </Text>

                {/* E */}

                <Text style={styles.cell}>
                  {team.all.draw}
                </Text>

                {/* P */}

                <Text style={styles.cell}>
                  {team.all.lose}
                </Text>

                {/* DG */}

                <Text style={styles.cell}>
                  {team.goalsDiff > 0
                    ? `+${team.goalsDiff}`
                    : team.goalsDiff}
                </Text>

                {/* PUNTOS */}

                <Text style={styles.points}>
                  {team.points}
                </Text>
              </View>
            ))}
          </View>
        ))
      )}

      {/* Leyenda */}

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendColor,
              {
                backgroundColor: "#E8F5E9",
              },
            ]}
          />

          <Text style={styles.legendText}>
            Clasificados
          </Text>
        </View>

        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendColor,
              {
                backgroundColor: "#FFF8E1",
              },
            ]}
          />

          <Text style={styles.legendText}>
            Repechaje
          </Text>
        </View>

        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendColor,
              {
                backgroundColor: "#FFEBEE",
              },
            ]}
          />

          <Text style={styles.legendText}>
            Eliminado
          </Text>
        </View>
      </View>
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

  empty: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 40,
  },

  groupCard: {
    marginHorizontal: 16,
    marginBottom: 22,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 15,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 3,
  },

  groupTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    marginBottom: 14,
  },

  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
    paddingBottom: 8,
    marginBottom: 6,
    alignItems: "center",
  },

  headerCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    color: "#777",
    fontWeight: "700",
  },

  teamRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 6,
  },

  rank: {
    width: 20,
    fontWeight: "700",
    color: "#111",
    fontSize: 14,
  },

  team: {
    marginLeft: 8,
    fontWeight: "600",
    color: "#111",
    fontSize: 14,
    flex: 1,
  },

  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 13,
    color: "#444",
  },

  points: {
    flex: 1,
    textAlign: "center",
    fontWeight: "700",
    color: "#0A84FF",
    fontSize: 14,
  },

  legend: {
    marginHorizontal: 20,
    marginBottom: 40,
    marginTop: 5,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  legendColor: {
    width: 18,
    height: 18,
    borderRadius: 5,
    marginRight: 10,
  },

  legendText: {
    fontSize: 13,
    color: "#555",
  },
});
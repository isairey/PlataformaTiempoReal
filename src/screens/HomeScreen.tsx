import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚽ Mundial 2026</Text>

      <Text style={styles.subtitle}>
        Marcadores en tiempo real
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          🔴 Live Scores
        </Text>

        <Text style={styles.cardText}>
          Partidos actualizándose cada 10 segundos
        </Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#8e8e93",
    marginTop: 10,
    textAlign: "center",
  },

  card: {
    marginTop: 30,
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    width: "100%",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginBottom: 6,
  },

  cardText: {
    fontSize: 13,
    color: "#666",
  },
});
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚽ Mundial 2026</Text>
      <Text style={styles.subtitle}>
        Live Scores en tiempo real
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#94a3b8",
    marginTop: 10,
  },
});
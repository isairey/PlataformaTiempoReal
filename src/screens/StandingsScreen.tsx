import { View, Text } from "react-native";

export default function StandingsScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 20 }}>
        🏆 Tabla de grupos (API en siguiente paso)
      </Text>
    </View>
  );
}
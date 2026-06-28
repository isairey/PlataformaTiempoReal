import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}

      <View style={styles.header}>
        <Text style={styles.title}>
          🏆 FIFA World Cup 2026
        </Text>

        <Text style={styles.subtitle}>
          Estados Unidos • México • Canadá
        </Text>
      </View>

      {/* HERO */}

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>
          ⚽ Bienvenido
        </Text>

        <Text style={styles.heroText}>
          Sigue todos los partidos del Mundial 2026 en tiempo real.
        </Text>
      </View>

      {/* TARJETAS */}

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.icon}>🔴</Text>

          <Text style={styles.cardTitle}>
            En Vivo
          </Text>

          <Text style={styles.cardValue}>
            Actualización cada 10 s
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.icon}>🏆</Text>

          <Text style={styles.cardTitle}>
            Equipos
          </Text>

          <Text style={styles.cardValue}>
            48 Selecciones
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.icon}>🏟</Text>

          <Text style={styles.cardTitle}>
            Sedes
          </Text>

          <Text style={styles.cardValue}>
            16 Estadios
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.icon}>🌎</Text>

          <Text style={styles.cardTitle}>
            Países
          </Text>

          <Text style={styles.cardValue}>
            3 Anfitriones
          </Text>
        </View>
      </View>

      {/* INFORMACIÓN */}

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          📅 Próximos partidos
        </Text>

        <Text style={styles.infoText}>
          Consulta el calendario completo del Mundial, resultados en vivo,
          tabla de grupos y eliminatorias desde las pestañas inferiores.
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          📊 Funciones
        </Text>

        <Text style={styles.infoText}>
          • Marcadores en vivo{"\n"}
          • Tabla de grupos{"\n"}
          • Eliminatorias{"\n"}
          • Estadísticas{"\n"}
          • Goleadores{"\n"}
          • Posesión y corners
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },

  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111",
  },

  subtitle: {
    marginTop: 5,
    color: "#666",
    fontSize: 15,
  },

  hero: {
    backgroundColor: "#0A84FF",
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 24,
  },

  heroTitle: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "700",
  },

  heroText: {
    marginTop: 10,
    color: "#FFF",
    fontSize: 15,
    lineHeight: 22,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 25,
  },

  card: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  icon: {
    fontSize: 30,
  },

  cardTitle: {
    marginTop: 12,
    fontWeight: "700",
    fontSize: 16,
    color: "#111",
  },

  cardValue: {
    marginTop: 8,
    color: "#666",
    fontSize: 13,
  },

  infoCard: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "#FFF",
    borderRadius: 22,
    padding: 20,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 10,
  },

  infoText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
  },
});
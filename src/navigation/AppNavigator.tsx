import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import MatchesScreen from "../screens/MatchesScreen";
import StandingsScreen from "../screens/StandingsScreen";
import KnockoutScreen from "../screens/KnockoutScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarActiveTintColor: "#0A84FF",
          tabBarInactiveTintColor: "#8E8E93",

          tabBarStyle: {
            height: 65,
            paddingBottom: 8,
            paddingTop: 6,
            backgroundColor: "#FFFFFF",
            borderTopWidth: 0,
            elevation: 10,
          },

          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap =
              "home-outline";

            if (route.name === "Inicio")
              iconName = "home-outline";

            if (route.name === "Partidos")
              iconName = "football-outline";

            if (route.name === "Grupos")
              iconName = "grid-outline";

            if (route.name === "Eliminatorias")
              iconName = "trophy-outline";

            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="Inicio"
          component={HomeScreen}
        />

        <Tab.Screen
          name="Partidos"
          component={MatchesScreen}
        />

        <Tab.Screen
          name="Grupos"
          component={StandingsScreen}
        />

        <Tab.Screen
          name="Eliminatorias"
          component={KnockoutScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import MatchesScreen from "../screens/MatchesScreen";
import StandingsScreen from "../screens/StandingsScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
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
          name="Tabla"
          component={StandingsScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
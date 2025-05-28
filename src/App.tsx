import React, { useState } from "react";
import Login from "./pages/auth/login";
import { NavigationContainer } from "@react-navigation/native";
import Register from "./pages/auth/register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import History from "./pages/stock/history";
import RegisterProducts from "./pages/stock/registerProducts";
import Sellers from "./pages/stock/sellers";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function AuthScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Histórico") {
            iconName = "stats-chart-outline";
          } else if (route.name === "Registrar") {
            iconName = "create-outline";
          } else if (route.name === "Vendas") {
            iconName = "cart-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Registrar" component={RegisterProducts} />
      <Tab.Screen name="Vendas" component={Sellers} />
      <Tab.Screen name="Histórico" component={History} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppTabs /> : <AuthScreen />}
    </NavigationContainer>
  );
}

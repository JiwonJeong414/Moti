import React, { useState, useEffect, createContext, useContext } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoadingScreen from "./screens/LoadingScreen";
import OnBoardingScreen from "./screens/OnBoardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomTabNavigator, {
  HomeTabNavigator,
} from "./navigation/LoginNavigator";
import { RootContext } from "./config/RootContext";
import { Provider as PaperProvider } from "react-native-paper";

const Stack = createNativeStackNavigator();

export const ModeContext = createContext(null);

export default function App() {
  const [onboarded, setOnboard] = React.useState(false);
  const [colorTheme, setColorTheme] = React.useState({});
  const [loading, setLoading] = useState();

  useEffect(() => {
    let colorTheme = {
      primary: "white",
      neutral: "white",
      accents: "#939597",
    };
    setColorTheme(colorTheme);
    const checkIfLoggedIn = async () => {
      let userName = await AsyncStorage.getItem("Name");
      userName = JSON.parse(userName);
      if (userName == null) setOnboard(false);
      else setOnboard(true);
    };
    setLoading(true);
    checkIfLoggedIn();
    setLoading(false);
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        {loading === true ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Loading"
              component={LoadingScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : (
          <></>
        )}
        <RootContext.Provider
          value={{
            onboarded: onboarded,
            setOnboard: setOnboard,
            colorTheme: colorTheme,
            setColorTheme: setColorTheme,
          }}
        >
          {onboarded === false ? (
            <Stack.Navigator>
              <Stack.Screen
                name="Login"
                component={OnBoardingScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: "horizontal",
              }}
            >
              <Stack.Screen name="Root" component={BottomTabNavigator} />
              <Stack.Screen name="Home" component={HomeTabNavigator} />
            </Stack.Navigator>
          )}
        </RootContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
}

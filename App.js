import React, { useState, useEffect, createContext, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import HotlineScreen from "./screens/HotlineScreen";
import LoadingScreen from "./screens/LoadingScreen";
import OnBoardingScreen from "./screens/OnBoardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colorsContext from "./config/colorsContext";
import colors from "./config/colors";
import neutralContext from "./config/neutralContext";
import neutral from "./config/neutral";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EventRegister } from "react-native-event-listeners";
import { BlurView } from "expo-blur";
import BottomTabNavigator, {
  HomeTabNavigator,
} from "./navigation/LoginNavigator";
import { RootContext } from "./config/RootContext";

const Stack = createNativeStackNavigator();
const BottomStack = createBottomTabNavigator();

export const ModeContext = createContext(null);

export default function App() {
  const neutralColor = useContext(neutralContext);

  const [onboarded, setOnboard] = React.useState(false);
  const [loading, setLoading] = useState();
  const [primary, setPrimary] = useState("white");
  const [neutral, setNeutral] = useState("white");
  const [accents, setAccents] = useState("white");

  useEffect(() => {
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
    <ModeContext.Provider
      value={{ primary, setPrimary, neutral, setNeutral, accents, setAccents }}
    >
      <colorsContext.Provider
        value={
          primary === "white"
            ? colors.white
            : primary === "red"
            ? colors.red
            : colors.blue
        }
      >
        <neutralContext.Provider
          value={
            neutral === "white"
              ? colors.white
              : neutral === "red"
              ? colors.red
              : colors.blue
          }
        >
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
              value={{ onboarded: onboarded, setOnboard: setOnboard }}
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
                    gestureDirection: "vertical",
                  }}
                >
                  <Stack.Screen name="Root" component={BottomTabNavigator} />
                  <Stack.Screen name="Home" component={HomeTabNavigator} />
                </Stack.Navigator>
              )}
            </RootContext.Provider>
          </NavigationContainer>
        </neutralContext.Provider>
      </colorsContext.Provider>
    </ModeContext.Provider>
  );
}

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

const Stack = createNativeStackNavigator();
const BottomStack = createBottomTabNavigator();

export const ModeContext = createContext(null);

export default function App() {
  const neutralColor = useContext(neutralContext);

  const [onboarded, setOnboard] = useState(false);
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
            ) : onboarded === false ? (
              <Stack.Navigator>
                <Stack.Screen
                  name="Login"
                  component={OnBoardingScreen}
                  options={{ headerShown: false }}
                  initialParams={{
                    onboarded: onboarded,
                    setOnboard: setOnboard,
                  }}
                />
              </Stack.Navigator>
            ) : (
              <BottomStack.Navigator
                screenOptions={{
                  tabBarStyle: { position: "absolute" },
                  tabBarBackground: () => (
                    <View
                      style={[
                        StyleSheet.absoluteFill,
                        { backgroundColor: neutralColor.color },
                      ]}
                    />
                  ),
                }}
              >
                <BottomStack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{
                    title: "Home",
                    headerShown: false,
                    tabBarActiveTintColor: "red",
                    tabBarIcon: ({ size, color }) => (
                      <MaterialCommunityIcons
                        name="home"
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                  initialParams={{
                    onboarded: onboarded,
                    setOnboard: setOnboard,
                  }}
                />
                <BottomStack.Screen
                  name="Hotline"
                  component={HotlineScreen}
                  options={{
                    title: "Hotline",
                    headerShown: false,
                    tabBarActiveTintColor: "red",
                  }}
                />
              </BottomStack.Navigator>
            )}
          </NavigationContainer>
        </neutralContext.Provider>
      </colorsContext.Provider>
    </ModeContext.Provider>
  );
}

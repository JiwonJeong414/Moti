import React, { useState, useEffect, createContext } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoardingScreen from "./screens/OnBoardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTabNavigator, {
  HomeTabNavigator,
} from "./navigation/LoginNavigator";
import { RootContext } from "./config/RootContext";
import {
  Provider as PaperProvider,
  ActivityIndicator,
} from "react-native-paper";
import moment from "moment";

const Stack = createNativeStackNavigator();

export const ModeContext = createContext(null);

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

function RootNavigator() {
  const [onboarded, setOnboard] = useState(false);
  const [colorTheme, setColorTheme] = useState({});
  const [textTheme, setTextTheme] = useState({});
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState([]);
  const [testData, setTestData] = useState([]);
  const [continuousDate, setContinuousDate] = useState(
    moment().format("YYYY/MM/DD")
  );

  useEffect(() => {
    const dateUpdater = setInterval(() => {
      const date = moment().format("YYYY/MM/DD");
      if (date !== continuousDate) {
        setContinuousDate(date);
      }
    }, 10000);
    return () => clearInterval(dateUpdater);
  }, [continuousDate]);

  useEffect(() => {
    const loadThemes = async () => {
      const savedColorTheme = JSON.parse(
        await AsyncStorage.getItem("ColorTheme")
      );
      const savedTextTheme = JSON.parse(
        await AsyncStorage.getItem("TextTheme")
      );

      setColorTheme(
        savedColorTheme || {
          primary: "#1C2331",
          secondary: "#252D3D",
          neutral: "#1A1F2C",
          accent1: "#E4D5B7",
          accent2: "#8B8FA3",
          cardBorder: "#2F374A",
        }
      );

      setTextTheme(
        savedTextTheme || {
          text: "#E4D5B7",
          subText: "#8B8FA3",
        }
      );
    };

    const loadInitialData = async () => {
      await loadThemes();
      await retrieveHabits();
      await retrieveTodo();
    };

    loadInitialData();
  }, []);

  const retrieveHabits = async () => {
    const savedHabits = JSON.parse(await AsyncStorage.getItem("Habits"));
    if (savedHabits) {
      setHabits(savedHabits);
    } else {
      firstLoginHabits([
        {
          id: Math.random(),
          title: "Organize My Room",
          streak: 2,
          completed: true,
          storeDate: moment().format("YYYY/MM/DD"),
          tomorrowDate: moment().add(1, "d").format("YYYY/MM/DD"),
        },
        {
          id: Math.random(),
          title: "Drink Water",
          streak: 0,
          completed: false,
          storeDate: "",
          tomorrowDate: "",
        },
      ]);
    }
  };

  const retrieveTodo = async () => {
    const savedTodos = JSON.parse(await AsyncStorage.getItem("ToDoItems"));
    if (savedTodos) {
      setTestData(savedTodos);
    } else {
      firstLoginTodo([
        { title: "Download Moti App", completed: true, id: Math.random() },
        {
          title: "Press Square to Complete",
          completed: false,
          id: Math.random(),
        },
        { title: "Swipe Left to Delete", completed: false, id: Math.random() },
      ]);
    }
  };

  const firstLoginHabits = async (array) => {
    await AsyncStorage.setItem("Habits", JSON.stringify(array));
    setHabits(array);
  };

  const firstLoginTodo = async (array) => {
    await AsyncStorage.setItem("ToDoItems", JSON.stringify(array));
    setTestData(array);
  };

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const userName = JSON.parse(await AsyncStorage.getItem("Name"));
      setOnboard(!!userName);
    };

    checkIfLoggedIn().then(() => setLoading(false));
  }, []);

  return (
    <RootContext.Provider
      value={{
        onboarded,
        setOnboard,
        colorTheme,
        setColorTheme,
        textTheme,
        setTextTheme,
        habits,
        setHabits,
        testData,
        setTestData,
        continuousDate,
      }}
    >
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator animating color="black" />
        </View>
      ) : onboarded ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeTabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={OnBoardingScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </RootContext.Provider>
  );
}

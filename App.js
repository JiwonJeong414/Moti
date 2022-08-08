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
import { Provider as PaperProvider } from "react-native-paper";
import { ActivityIndicator } from "react-native-paper";

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
  const [onboarded, setOnboard] = React.useState(false);
  const [colorTheme, setColorTheme] = React.useState({});
  const [textTheme, setTextTheme] = useState();
  const [loading, setLoading] = useState();
  const [primary, setPrimary] = useState();
  const [neutral, setNeutral] = useState();
  const [accents, setAccents] = useState();
  const [textColor, setTextColor] = useState();
  const [quoteColor, setQuoteColor] = useState();
  const [habits, setHabits] = useState([]);
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    let colorTheme = {
      text: textColor,
      quote: quoteColor,
    };
    setTextTheme(colorTheme);
  }, [quoteColor]);

  useEffect(() => {
    const retrieveText = async () => {
      let retrieveData = await AsyncStorage.getItem("Text");
      retrieveData = JSON.parse(retrieveData);
      if (retrieveData == null) setTextColor("white");
      else setTextColor(retrieveData);
    };
    retrieveText();
    const retrieveQuote = async () => {
      let retrieveData = await AsyncStorage.getItem("Quotes");
      retrieveData = JSON.parse(retrieveData);
      if (retrieveData == null) setQuoteColor("white");
      else setQuoteColor(retrieveData);
    };
    retrieveQuote();
  }, []);

  useEffect(() => {
    let colorTheme = {
      primary: primary,
      neutral: neutral,
      accents: accents,
    };
    setColorTheme(colorTheme);
  }, [accents]);

  useEffect(() => {
    const retrievePrimary = async () => {
      let retrieveData = await AsyncStorage.getItem("Primary");
      retrieveData = JSON.parse(retrieveData);
      if (retrieveData == null) setPrimary("#2E2C2F");
      else setPrimary(retrieveData);
    };
    retrievePrimary();
    const retrieveNeutral = async () => {
      let retrieveData = await AsyncStorage.getItem("Neutral");
      retrieveData = JSON.parse(retrieveData);
      if (retrieveData == null) setNeutral("#C2BFB5");
      else setNeutral(retrieveData);
    };
    retrieveNeutral();
    const retrieveAccents = async () => {
      let retrieveData = await AsyncStorage.getItem("Accents");
      retrieveData = JSON.parse(retrieveData);
      if (retrieveData == null) setAccents("#C2BFB5");
      else setAccents(retrieveData);
    };
    retrieveAccents();
  }, []);

  useEffect(() => {
    const retrieveHabits = async () => {
      let retrieveData = await AsyncStorage.getItem("Habits");
      retrieveData = JSON.parse(retrieveData);
      let tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      let day = tomorrowDate.getDate();
      let month = tomorrowDate.getMonth() + 1;
      let year = tomorrowDate.getFullYear();
      let todayDate = new Date();
      let todayDay = todayDate.getDate();
      let todayMonth = todayDate.getMonth() + 1;
      let todayYear = todayDate.getFullYear();
      if (retrieveData == null)
        firstLoginHabits([
          {
            id: Math.random(),
            title: "Organize My Room",
            streak: 2,
            completed: true,
            storeDate: todayMonth + "/" + todayDay + "/" + todayYear,
            tomorrowDate: month + "/" + day + "/" + year,
          },
          {
            id: Math.random(),
            title: "Drink Water",
            streak: 0,
            completed: false,
            storeDate: todayMonth + "/" + todayDay + "/" + todayYear,
            tomorrowDate: month + "/" + day + "/" + year,
          },
        ]);
      else setHabits(retrieveData);
    };
    retrieveHabits();
    const retrieveTodo = async () => {
      let retrieveData = await AsyncStorage.getItem("ToDoItems");
      retrieveData = JSON.parse(retrieveData);
      if (retrieveData == null)
        firstLoginTodo([
          { title: "Download Moti App", completed: true, id: Math.random() },
          {
            title: "Press the Square to Complete",
            completed: false,
            id: Math.random(),
          },
          {
            title: "Swipe Left to Delete",
            completed: false,
            id: Math.random(),
          },
        ]);
      else setTestData(retrieveData);
    };
    retrieveTodo();
  }, []);

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
      let userName = await AsyncStorage.getItem("Name");
      userName = JSON.parse(userName);
      if (userName == null) setOnboard(false);
      else setOnboard(true);
    };
    setLoading(true);
    checkIfLoggedIn();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <RootContext.Provider
      value={{
        onboarded: onboarded,
        setOnboard: setOnboard,
        colorTheme: colorTheme,
        setColorTheme: setColorTheme,
        textTheme: textTheme,
        setTextTheme: setTextTheme,
        habits: habits,
        setHabits: setHabits,
        testData: testData,
        setTestData: setTestData,
      }}
    >
      {loading === true ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator animating={true} color="black" />
        </View>
      ) : onboarded === false ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={OnBoardingScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
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
      )}
    </RootContext.Provider>
  );
}

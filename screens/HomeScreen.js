import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Animated,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  NotoSans_400Regular,
  NotoSans_700Bold,
  useFonts,
} from "@expo-google-fonts/noto-sans";
import Todo from "../Components/Todo";
import { RootContext } from "../config/RootContext";
import CustomDatePicker from "../Components/CustomDatePicker";
import Quotes from "../Components/Quotes";
import BannerAndIcon from "../Components/BannerAndIcon";
import Habits from "../Components/Habits";
import SettingModal from "../Components/SettingModal";

const HomeScreen = ({ navigation }) => {
  const [myName, setMyName] = useState("");
  const [activeSection, setActiveSection] = useState("events");
  const scrollY = useRef(new Animated.Value(0)).current;
  const { onboarded, colorTheme, textTheme } = React.useContext(RootContext);
  const customDatePickerRef = useRef(null);
  const todoRef = useRef(null);
  const habitsRef = useRef(null);

  const [eventsHeight, setEventsHeight] = useState(0);
  const [todoHeight, setTodoHeight] = useState(0);
  const [habitsHeight, setHabitsHeight] = useState(0);

  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  useEffect(() => {
    const getName = async () => {
      try {
        let userName = await AsyncStorage.getItem("Name");
        userName = JSON.parse(userName);
        setMyName(userName);
      } catch (error) {
        console.log("Error fetching name:", error);
      }
    };
    getName();
  }, [onboarded]);

  const getComposeIcon = () => {
    switch (activeSection) {
      case "events":
        return "calendar-plus";
      case "todo":
        return "playlist-plus";
      case "habits":
        return "bookmark-plus";
      default:
        return "plus";
    }
  };

  const handleCompose = () => {
    switch (activeSection) {
      case "events":
        customDatePickerRef.current?.openModal();
        break;
      case "todo":
        todoRef.current?.openModal();
        break;
      case "habits":
        habitsRef.current?.openModal();
        break;
    }
  };

  const calculateActiveSection = (y) => {
    if (y < eventsHeight) return "events";
    if (y < eventsHeight + todoHeight) return "todo";
    return "habits";
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={[styles.scrollView, { backgroundColor: colorTheme.primary }]}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: false,
            listener: (event) => {
              const y = event.nativeEvent.contentOffset.y;
              setActiveSection(calculateActiveSection(y));
            },
          }
        )}
        scrollEventThrottle={16}
      >
        <View
          style={[
            styles.greetingContainer,
            { backgroundColor: colorTheme.primary },
          ]}
        >
          <View
            style={[
              styles.bannerContainer,
              { backgroundColor: colorTheme.primary },
            ]}
          >
            <BannerAndIcon />
          </View>

          <Text style={[styles.greeting, { color: colorTheme.accent1 }]}>
            Hi, {myName || "there"}
          </Text>
          <Text style={[styles.subGreeting, { color: colorTheme.accent2 }]}>
            Welcome back! Here's your daily overview
          </Text>
        </View>

        <View style={styles.widgetsContainer}>
          <View
            style={[
              styles.widgetCard,
              {
                backgroundColor: colorTheme.secondary,
                borderColor: colorTheme.cardBorder,
              },
            ]}
          >
            <Text style={[styles.widgetTitle, { color: colorTheme.accent1 }]}>
              Events
            </Text>
            <CustomDatePicker props ref={customDatePickerRef} />
          </View>

          <View
            style={[
              styles.widgetCard,
              {
                backgroundColor: colorTheme.secondary,
                borderColor: colorTheme.cardBorder,
              },
            ]}
          >
            <Text style={[styles.widgetTitle, { color: colorTheme.accent1 }]}>
              Todo
            </Text>
            <Todo props ref={todoRef} />
          </View>

          <View
            style={[
              styles.widgetCard,
              styles.lastWidget,
              {
                backgroundColor: colorTheme.secondary,
                borderColor: colorTheme.cardBorder,
              },
            ]}
          >
            <Text style={[styles.widgetTitle, { color: colorTheme.accent1 }]}>
              Habits
            </Text>
            <Habits props ref={habitsRef} />
          </View>
        </View>
        <SettingModal navigation={navigation} />
      </ScrollView>

      <Animated.View
        style={[
          styles.composeButton,
          {
            backgroundColor: colorTheme.accent1,
            transform: [
              {
                scale: scrollY.interpolate({
                  inputRange: [0, 100],
                  outputRange: [1, 0.9],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          onPress={handleCompose}
          style={styles.composeButtonTouchable}
        >
          <MaterialCommunityIcons
            name={getComposeIcon()}
            size={24}
            color={colorTheme.primary}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  bannerContainer: {
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(45),
    alignItems: "center",
    justifyContent: "center",
  },
  greetingContainer: {
    paddingHorizontal: moderateScale(24),
    paddingTop: moderateScale(24),
    paddingBottom: moderateScale(16),
  },
  greeting: {
    fontSize: moderateScale(34),
    fontFamily: "NotoSans_700Bold",
    marginBottom: moderateScale(8),
    letterSpacing: 0.5,
  },
  subGreeting: {
    fontSize: moderateScale(15),
    fontFamily: "NotoSans_400Regular",
    letterSpacing: 0.3,
    opacity: 0.9,
  },
  widgetsContainer: {
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(16),
  },
  widgetCard: {
    borderRadius: moderateScale(16),
    padding: moderateScale(20),
    marginBottom: moderateScale(16),
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  widgetTitle: {
    fontSize: moderateScale(24),
    fontFamily: "NotoSans_700Bold",
    marginBottom: moderateScale(16),
    letterSpacing: 0.5,
  },
  lastWidget: {
    marginBottom: moderateScale(32),
  },
  composeButton: {
    alignSelf: "flex-end",
    right: moderateScale(20),
    bottom: moderateScale(110),
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  composeButtonTouchable: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;

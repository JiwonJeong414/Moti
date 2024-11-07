import React, { useState, useEffect, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Animated,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale } from "react-native-size-matters";
import { RootContext } from "./RootContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  NotoSans_400Regular,
  NotoSans_700Bold,
  useFonts,
} from "@expo-google-fonts/noto-sans";
import Todo from "../Components/Todo";
import CustomDatePicker from "../Components/CustomDatePicker";
import Quotes from "../Components/Quotes";
import BannerAndIcon from "../Components/BannerAndIcon";
import Habits from "../Components/Habits";
import SettingModal from "../Components/SettingModal";

const HomeScreen = ({ navigation }) => {
  const [myName, setMyName] = useState("");
  const [activeSection, setActiveSection] = useState("events");
  const scrollY = useRef(new Animated.Value(0)).current;
  const context = useContext(RootContext);
  const customDatePickerRef = useRef(null);

  const colorTheme = context?.colorTheme || {
    primary: "#1C2331",
    secondary: "#252D3D",
    neutral: "#1A1F2C",
    accent1: "#E4D5B7",
    accent2: "#8B8FA3",
    cardBorder: "#2F374A",
    text: "#E4D5B7",
    subText: "#8B8FA3",
  };

  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  useEffect(() => {
    const getName = async () => {
      try {
        const userName = await AsyncStorage.getItem("Name");
        if (userName) {
          setMyName(JSON.parse(userName));
        }
      } catch (error) {
        console.log("Error getting name:", error);
      }
    };
    getName();
  }, []);

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
        if (customDatePickerRef.current) {
          console.log("Opening CustomDatePicker modal");
          customDatePickerRef.current.openModal();
        }
        break;
      case "todo":
        // TODO: Implement todo add functionality
        break;
      case "habits":
        // TODO: Implement habits add functionality
        break;
    }
  };

  const calculateSection = (y) => {
    if (y < 300) return "events";
    if (y < 600) return "todo";
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
              setActiveSection(calculateSection(y));
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
            <Todo />
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
            <Habits />
          </View>
        </View>
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
    paddingBottom: moderateScale(40),
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
    bottom: moderateScale(90),
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

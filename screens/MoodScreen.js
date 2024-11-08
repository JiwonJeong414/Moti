import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { RootContext } from "../config/RootContext";

import {
  useFonts,
  NotoSans_400Regular,
  NotoSans_700Bold,
} from "@expo-google-fonts/noto-sans";

const MoodScreen = () => {
  const { onboarded, colorTheme, textTheme } = React.useContext(RootContext);

  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  const [moodNumber, setMoodNumber] = useState(3);
  const [data, setData] = useState({});
  const [myName, setMyName] = useState("");
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    const getName = async () => {
      let userName = await AsyncStorage.getItem("Name");
      userName = JSON.parse(userName);
      setMyName(userName);
    };
    getName();
  }, []);

  useEffect(() => {
    const retrieveMoodList = async () => {
      try {
        let retrieveData = await AsyncStorage.getItem("Moods");
        retrieveData = JSON.parse(retrieveData);
        if (retrieveData) {
          setData(retrieveData);
        }
      } catch (error) {
        console.log("Error retrieving moods:", error);
      }
    };
    retrieveMoodList();
  }, []);

  const getMoodColor = (moodType) => {
    switch (moodType) {
      case "amazing":
        return "#E4D5B7"; // accent1
      case "happy":
        return "#8B8FA3"; // accent2
      case "okay":
        return "#2F374A"; // cardBorder
      case "sad":
        return "#252D3D"; // secondary
      case "mad":
        return "#1C2331"; // primary
      default:
        return "#1A1F2C"; // neutral
    }
  };

  const handleMoodChange = () => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    setMoodNumber(moodNumber === 5 ? 1 : moodNumber + 1);
  };

  const getMoodEmoji = (type) => {
    switch (type) {
      case "amazing":
        return "🌟";
      case "happy":
        return "😊";
      case "okay":
        return "😐";
      case "sad":
        return "😢";
      case "mad":
        return "😠";
      default:
        return "😐";
    }
  };

  const getTypeFromNumber = (num) => {
    switch (num) {
      case 1:
        return "mad";
      case 2:
        return "sad";
      case 3:
        return "okay";
      case 4:
        return "happy";
      case 5:
        return "amazing";
      default:
        return "okay";
    }
  };

  const handleSubmit = async () => {
    try {
      const today = moment().format("YYYY-MM-DD");
      const moodType = getTypeFromNumber(moodNumber);

      const newData = {
        ...data,
        [today]: {
          marked: true,
          customStyles: {
            container: {
              backgroundColor: getMoodColor(moodType),
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colorTheme.cardBorder,
            },
            text: {
              color: colorTheme.text,
              fontFamily: "NotoSans_700Bold",
            },
          },
          mood: moodType,
        },
      };

      await AsyncStorage.setItem("Moods", JSON.stringify(newData));
      setData(newData);
    } catch (error) {
      console.log("Error saving mood:", error);
    }
  };

  const customTheme = {
    backgroundColor: colorTheme.primary,
    calendarBackground: colorTheme.secondary,
    textSectionTitleColor: colorTheme.accent1,
    selectedDayBackgroundColor: colorTheme.accent1,
    selectedDayTextColor: colorTheme.primary,
    todayTextColor: colorTheme.accent1,
    dayTextColor: colorTheme.accent1,
    textDisabledColor: colorTheme.accent1,
    dotColor: colorTheme.accent1,
    selectedDotColor: colorTheme.primary,
    arrowColor: colorTheme.accent1,
    monthTextColor: colorTheme.accent1,
    textDayFontFamily: "NotoSans_400Regular",
    textMonthFontFamily: "NotoSans_700Bold",
    textDayHeaderFontFamily: "NotoSans_400Regular",
    textDayFontSize: moderateScale(16),
    textMonthFontSize: moderateScale(16),
    textDayHeaderFontSize: moderateScale(14),
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colorTheme.neutral }]}
    >
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Text
            style={[
              styles.headerText,
              {
                color: colorTheme.accent1,
                fontFamily: "NotoSans_700Bold",
              },
            ]}
          >
            {myName}'s Mood Tracker
          </Text>
          <TouchableOpacity
            style={[
              styles.chartButton,
              { backgroundColor: colorTheme.secondary },
            ]}
          >
            <MaterialCommunityIcons
              name="chart-box-outline"
              size={moderateScale(24)}
              color={colorTheme.accent1}
            />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.calendarWrapper,
            {
              backgroundColor: colorTheme.secondary,
              borderColor: colorTheme.cardBorder,
              borderWidth: 1,
            },
          ]}
        >
          <Calendar
            style={styles.calendar}
            theme={customTheme}
            markedDates={data}
            markingType="custom"
            enableSwipeMonths={true}
            hideExtraDays={true}
          />
        </View>

        <Animated.View
          style={[
            styles.moodContainer,
            {
              transform: [
                {
                  scale: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.2],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            onPress={handleMoodChange}
            style={[
              styles.moodButton,
              {
                backgroundColor: colorTheme.secondary,
                borderColor: colorTheme.cardBorder,
                borderWidth: 1,
              },
            ]}
          >
            <Text style={styles.moodEmoji}>
              {getMoodEmoji(getTypeFromNumber(moodNumber))}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity
          style={[
            styles.saveButton,
            {
              backgroundColor: colorTheme.secondary,
              borderColor: colorTheme.cardBorder,
              borderWidth: 1,
            },
          ]}
          onPress={handleSubmit}
        >
          <Text
            style={[
              styles.saveButtonText,
              {
                color: colorTheme.accent1,
                fontFamily: "NotoSans_700Bold",
              },
            ]}
          >
            Save Today's Mood
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? moderateScale(25) : 0,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15),
    marginBottom: moderateScale(10),
  },
  headerText: {
    fontSize: moderateScale(24),
  },
  chartButton: {
    padding: moderateScale(8),
    borderRadius: moderateScale(8),
  },
  calendarWrapper: {
    marginHorizontal: moderateScale(20),
    borderRadius: moderateScale(20),
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  calendar: {
    borderRadius: moderateScale(20),
  },
  moodContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: moderateScale(40),
    marginBottom: moderateScale(20),
  },
  moodButton: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  moodEmoji: {
    fontSize: moderateScale(50),
  },
  saveButton: {
    marginHorizontal: moderateScale(20),
    padding: moderateScale(15),
    borderRadius: moderateScale(15),
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  saveButtonText: {
    fontSize: moderateScale(18),
  },
});

export default MoodScreen;

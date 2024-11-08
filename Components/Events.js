import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import SettingOpenCircle from "./SettingOpenCircle";
import { moderateScale } from "react-native-size-matters";
import { RootContext } from "../config/RootContext";
import { IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  NotoSans_400Regular,
  NotoSans_700Bold,
  useFonts,
} from "@expo-google-fonts/noto-sans";
import moment from "moment";

const Event = ({ date, index, length, title, deleteItem, item }) => {
  const { colorTheme, textTheme, continuousDate } =
    React.useContext(RootContext);
  const [localdate, setLocaldate] = useState(date);
  const [calculateDate, setCalculateDate] = useState();

  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  useEffect(() => {
    let today = moment().format("YYYY-MM-DD");
    let myToday = calculate(today);
    let myDate = calculate(localdate);
    setCalculateDate(myDate - myToday);
  }, [continuousDate]);

  const calculate = (text) => {
    const selectedDate = text.split("-");
    let addedDate = 0;
    addedDate = Math.floor(Number(selectedDate[0]) / 4) * 1461;
    let isLeapYear = false;
    if (Number(selectedDate[0]) % 4 === 0) isLeapYear = true;
    if (Number(selectedDate[0]) % 4 === 1) addedDate += 366;
    if (Number(selectedDate[0]) % 4 === 2) addedDate += 731;
    if (Number(selectedDate[0]) % 4 === 3) addedDate += 1096;
    if (Number(selectedDate[1]) - 1 === 1) addedDate += 31;
    else if (Number(selectedDate[1]) - 1 === 2 && isLeapYear === false)
      addedDate += 59;
    else if (Number(selectedDate[1]) - 1 === 2 && isLeapYear === true)
      addedDate += 60;
    else if (Number(selectedDate[1]) - 1 === 3 && isLeapYear === false)
      addedDate += 90;
    else if (Number(selectedDate[1]) - 1 === 3 && isLeapYear === true)
      addedDate += 91;
    else if (Number(selectedDate[1]) - 1 === 4 && isLeapYear === false)
      addedDate += 120;
    else if (Number(selectedDate[1]) - 1 === 4 && isLeapYear === true)
      addedDate += 121;
    else if (Number(selectedDate[1]) - 1 === 5 && isLeapYear === false)
      addedDate += 151;
    else if (Number(selectedDate[1]) - 1 === 5 && isLeapYear === true)
      addedDate += 152;
    else if (Number(selectedDate[1]) - 1 === 6 && isLeapYear === false)
      addedDate += 181;
    else if (Number(selectedDate[1]) - 1 === 6 && isLeapYear === true)
      addedDate += 182;
    else if (Number(selectedDate[1]) - 1 === 7 && isLeapYear === false)
      addedDate += 212;
    else if (Number(selectedDate[1]) - 1 === 7 && isLeapYear === true)
      addedDate += 213;
    else if (Number(selectedDate[1]) - 1 === 8 && isLeapYear === false)
      addedDate += 243;
    else if (Number(selectedDate[1]) - 1 === 8 && isLeapYear === true)
      addedDate += 244;
    else if (Number(selectedDate[1]) - 1 === 9 && isLeapYear === false)
      addedDate += 273;
    else if (Number(selectedDate[1]) - 1 === 9 && isLeapYear === true)
      addedDate += 274;
    else if (Number(selectedDate[1]) - 1 === 10 && isLeapYear === false)
      addedDate += 304;
    else if (Number(selectedDate[1]) - 1 === 10 && isLeapYear === true)
      addedDate += 305;
    else if (Number(selectedDate[1]) - 1 === 11 && isLeapYear === false)
      addedDate += 334;
    else if (Number(selectedDate[1]) - 1 === 11 && isLeapYear === true)
      addedDate += 335;
    addedDate += Number(selectedDate[2]);
    return addedDate;
  };

  const margin = index + 1 === length ? moderateScale(4) : moderateScale(20);

  const handleDelete = (item) => {
    Alert.alert("Delete", "Do you want to delete this event?", [
      { text: "Yes", onPress: () => deleteItem(item) },
      { text: "No" },
    ]);
  };

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <View style={[styles.eventCard, { backgroundColor: colorTheme.primary }]}>
      <View style={[styles.eventIcon, { backgroundColor: "#7C4DFF" }]}>
        <MaterialCommunityIcons
          name="calendar-clock"
          size={24}
          color="#FFFFFF"
        />
      </View>
      <View style={styles.eventContent}>
        <Text style={[styles.eventTitle, { color: "#E4D5B7" }]}>{title}</Text>
        <Text style={[styles.eventSubtitle, { color: "#8B8FA3" }]}>
          {calculateDate > 1
            ? `${calculateDate} Days Left`
            : calculateDate === 0
            ? "D-Day"
            : Math.abs(calculateDate) > 1
            ? `${Math.abs(calculateDate)} Days Ago`
            : calculateDate === 1
            ? `${calculateDate} Day Left`
            : `${Math.abs(calculateDate)} Day Ago`}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleDelete(item)}
        style={styles.moreButton}
      >
        <MaterialCommunityIcons
          name="dots-vertical"
          size={20}
          color="#8B8FA3"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  eventCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: moderateScale(16),
    borderRadius: moderateScale(16),
    marginBottom: moderateScale(12),
    marginHorizontal: moderateScale(20),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  eventIcon: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    alignItems: "center",
    justifyContent: "center",
    marginRight: moderateScale(16),
    shadowColor: "#7C4DFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: moderateScale(18),
    fontFamily: "NotoSans_700Bold",
    marginBottom: moderateScale(4),
  },
  eventSubtitle: {
    fontSize: moderateScale(14),
    fontFamily: "NotoSans_400Regular",
  },
  moreButton: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Event;

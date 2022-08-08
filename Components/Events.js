import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import SettingOpenCircle from "./SettingOpenCircle";
import { moderateScale } from "react-native-size-matters";
import { RootContext } from "../config/RootContext";
import {
  NotoSans_400Regular,
  NotoSans_700Bold,
  useFonts,
} from "@expo-google-fonts/noto-sans";

const Event = ({ date, index, length, title, deleteItem, item }) => {
  const { colorTheme, textTheme } = React.useContext(RootContext);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [localdate, setLocaldate] = useState(date);
  const [calculateDate, setCalculateDate] = useState();

  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  useEffect(() => {
    let today = new Date();
    // setinterval to calculate date every 1 second or just pull to refresh
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    let myToday = calculate(year + "-" + (month + 1) + "-" + day);
    let myDate = calculate(localdate);
    // console.log("myToday: " + myToday);
    // console.log("myDate: " + myDate);
    setCalculateDate(myDate - myToday);
  }, []);

  const calculate = (text) => {
    const selectedDate = text.split("-");
    let addedDate = 0;
    addedDate = Math.floor(Number(selectedDate[0]) / 4) * 1461;
    // console.log("1: " + addedDate);
    let isLeapYear = false;
    // console.log("2: " + addedDate);
    if (Number(selectedDate[0]) % 4 === 0) isLeapYear = true;
    if (Number(selectedDate[0]) % 4 === 1) addedDate += 366;
    if (Number(selectedDate[0]) % 4 === 2) addedDate += 731;
    if (Number(selectedDate[0]) % 4 === 3) addedDate += 1096;
    // 31
    if (Number(selectedDate[1]) - 1 === 1) addedDate += 31;
    // 28 or 29
    else if (Number(selectedDate[1]) - 1 === 2 && isLeapYear === false)
      addedDate += 59;
    else if (Number(selectedDate[1]) - 1 === 2 && isLeapYear === true)
      addedDate += 60;
    // 31
    else if (Number(selectedDate[1]) - 1 === 3 && isLeapYear === false)
      addedDate += 90;
    else if (Number(selectedDate[1]) - 1 === 3 && isLeapYear === true)
      addedDate += 91;
    // 30
    else if (Number(selectedDate[1]) - 1 === 4 && isLeapYear === false)
      addedDate += 120;
    else if (Number(selectedDate[1]) - 1 === 4 && isLeapYear === true)
      addedDate += 121;
    // 31
    else if (Number(selectedDate[1]) - 1 === 5 && isLeapYear === false)
      addedDate += 151;
    else if (Number(selectedDate[1]) - 1 === 5 && isLeapYear === true)
      addedDate += 152;
    // 30
    else if (Number(selectedDate[1]) - 1 === 6 && isLeapYear === false)
      addedDate += 181;
    else if (Number(selectedDate[1]) - 1 === 6 && isLeapYear === true)
      addedDate += 182;
    // 31
    else if (Number(selectedDate[1]) - 1 === 7 && isLeapYear === false)
      addedDate += 212;
    else if (Number(selectedDate[1]) - 1 === 7 && isLeapYear === true)
      addedDate += 213;
    // 31
    else if (Number(selectedDate[1]) - 1 === 8 && isLeapYear === false)
      addedDate += 243;
    else if (Number(selectedDate[1]) - 1 === 8 && isLeapYear === true)
      addedDate += 244;
    // 30
    else if (Number(selectedDate[1]) - 1 === 9 && isLeapYear === false)
      addedDate += 273;
    else if (Number(selectedDate[1]) - 1 === 9 && isLeapYear === true)
      addedDate += 274;
    // 31
    else if (Number(selectedDate[1]) - 1 === 10 && isLeapYear === false)
      addedDate += 304;
    else if (Number(selectedDate[1]) - 1 === 10 && isLeapYear === true)
      addedDate += 305;
    // 30
    else if (Number(selectedDate[1]) - 1 === 11 && isLeapYear === false)
      addedDate += 334;
    else if (Number(selectedDate[1]) - 1 === 11 && isLeapYear === true)
      addedDate += 335;
    // 31 (now add days)
    // console.log("3: " + addedDate);
    addedDate += Number(selectedDate[2]);
    // console.log("4: " + addedDate);
    return addedDate;
  };

  const margin = index + 1 === length ? moderateScale(4) : moderateScale(20);

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <View
      style={[
        styles.item,
        {
          backgroundColor: colorTheme.primary,
          marginBottom: margin,
        },
      ]}
    >
      <View style={{ alignSelf: "flex-end" }}>
        <TouchableOpacity onPress={() => setDeleteVisible(!deleteVisible)}>
          <View hitSlop={10}>
            <SettingOpenCircle />
          </View>
        </TouchableOpacity>
        {deleteVisible === true ? (
          <TouchableWithoutFeedback onPress={() => deleteItem(item)}>
            <View
              style={{
                position: "absolute",
                width: moderateScale(50),
                height: moderateScale(30),
                top:
                  Platform.OS === "ios" ? moderateScale(7) : moderateScale(11),
                right:
                  Platform.OS === "ios" ? moderateScale(-4) : moderateScale(-8),
                backgroundColor: colorTheme.accents,
                borderRadius: moderateScale(10),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "NotoSans_400Regular",
                  color: textTheme.text,
                }}
              >
                Delete
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <></>
        )}
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text style={[styles.itemText, { color: textTheme.text }]}>
          {title}
        </Text>
        <View
          style={{
            marginBottom: moderateScale(8),
          }}
        >
          {calculateDate > 1 ? (
            <Text style={[styles.left, { color: textTheme.text }]}>
              {calculateDate} Days Left
            </Text>
          ) : calculateDate === 0 ? (
            <Text style={[styles.left, { color: textTheme.text }]}>D-Day</Text>
          ) : Math.abs(calculateDate) > 1 ? (
            <Text style={[styles.left, { color: textTheme.text }]}>
              {Math.abs(calculateDate)} Days Ago
            </Text>
          ) : calculateDate === 1 ? (
            <Text style={[styles.left, { color: textTheme.text }]}>
              {calculateDate} Day Left
            </Text>
          ) : (
            <Text style={[styles.left, { color: textTheme.text }]}>
              {Math.abs(calculateDate)} Day Ago
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: moderateScale(14),
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: "center",
    elevation: 5,
    left: moderateScale(18),
    width: "90.5%",
    borderRadius: moderateScale(20),
    justifyContent: "center",
  },
  itemText: {
    textAlign: "center",
    fontSize: moderateScale(28),
    fontFamily: "NotoSans_700Bold",
    paddingBottom: moderateScale(4),
  },
  left: {
    textAlign: "center",
    fontSize: moderateScale(23),
    fontFamily: "NotoSans_400Regular",
  },
  modalBackground: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Event;

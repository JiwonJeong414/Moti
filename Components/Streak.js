import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";
import { RootContext } from "../config/RootContext";
import SettingOpenCircle from "./SettingOpenCircle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NotoSans_400Regular,
  NotoSans_700Bold,
  useFonts,
} from "@expo-google-fonts/noto-sans";
import moment from "moment";

const Streak = ({
  title,
  deleteItem,
  streak,
  completed,
  storeDate,
  tomorrowDate,
  id,
  item,
}) => {
  const [localStreak, setLocalStreak] = useState(streak);
  const [localCompleted, setLocalCompleted] = useState(completed);
  const [localStoreDate, setLocalStoreDate] = useState(storeDate);
  const [localTomorrowDate, setLocalTomorrowDate] = useState(tomorrowDate);

  const { colorTheme, habits, setHabits, textTheme, continuousDate } =
    React.useContext(RootContext);

  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  useEffect(() => {
    const retrieveHabitItems = async () => {
      let retrieveData = await AsyncStorage.getItem("Habits");
      retrieveData = JSON.parse(retrieveData);
      let objIndex = retrieveData.findIndex((obj) => obj.id === id);
      setLocalStreak(retrieveData[objIndex].streak);
      setLocalCompleted(retrieveData[objIndex].completed);
    };
    retrieveHabitItems();
  }, []);
  // trying adding the asyncstorage here and completely remove from habits
  // just configure asyncstorage here and it will update on habits
  // asyncstorage set item (based on index setstreak)
  const handleComplete = async () => {
    setLocalCompleted(true);
    setLocalStreak(localStreak + 1);
    if (localStreak + 1 === 3) {
      Alert.alert("Congratulations! You hit a 3-day streak!");
    } else if (localStreak + 1 === 7) {
      Alert.alert("Congratulations! You hit a 7-day streak!");
    } else if (localStreak + 1 === 100) {
      Alert.alert("Congratulations! You hit a 100-day streak!");
    } else if (localStreak + 1 === 365) {
      Alert.alert("Congratulations! You hit a 365-day streak!");
    }
    let habitsArray = habits;
    let objIndex = habitsArray.findIndex((obj) => obj.id === id);
    habitsArray[objIndex].streak += 1;
    habitsArray[objIndex].completed = true;
    let todayDate = moment().format("YYYY/MM/DD");
    let tomorrowDate = moment().add(1, "d").format("YYYY/MM/DD");
    setLocalStoreDate(todayDate);
    setLocalTomorrowDate(tomorrowDate);
    habitsArray[objIndex].storeDate = todayDate;
    habitsArray[objIndex].tomorrowDate = tomorrowDate;
    setHabits(habitsArray);
    await AsyncStorage.setItem("Habits", JSON.stringify(habitsArray));
    // alert when reached milestone
  };

  useEffect(() => {
    let habitsArray = habits;
    let objIndex = habitsArray.findIndex((obj) => obj.id === id);
    let todayDate = moment().format("YYYY/MM/DD");
    console.log(habitsArray);
    // console.log("id stored date: " + habitsArray[objIndex].storeDate);
    if (todayDate === habitsArray[objIndex].tomorrowDate) {
      habitsArray[objIndex].completed = false;
      setLocalCompleted(false);
    } else if (
      habitsArray[objIndex].storeDate !== "" &&
      todayDate !== habitsArray[objIndex].storeDate
    ) {
      // Alert.alert(
      //   "Oh no! You missed a day and lost your streak for " +
      //     habitsArray[objIndex].title
      // );
      habitsArray[objIndex].tomorrowDate = "";
      habitsArray[objIndex].storeDate = "";
      habitsArray[objIndex].streak = 0;
      habitsArray[objIndex].completed = false;
      setLocalCompleted(false);
      setLocalTomorrowDate();
      setLocalStoreDate();
      setLocalStreak(0);
    }
    const set = async () => {
      setHabits(habitsArray);
      await AsyncStorage.setItem("Habits", JSON.stringify(habitsArray));
    };
    set();
  }, [continuousDate]);

  const handleDelete = (item) => {
    Alert.alert("Delete", "Do you want to delete this habit?", [
      { text: "Yes", onPress: () => deleteItem(item) },
      { text: "No" },
    ]);
  };

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <View style={[styles.item, { backgroundColor: colorTheme.primary }]}>
      <View style={{ alignSelf: "flex-end" }}>
        <TouchableOpacity onPress={() => handleDelete(item)} hitSlop={40}>
          <SettingOpenCircle />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text style={[styles.itemText, { color: textTheme.text }]}>
          {title}
        </Text>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: moderateScale(5),
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(25),
              marginRight: moderateScale(10),
              textAlign: "center",
              maxWidth: "90%",
              color: textTheme.text,
            }}
          >
            Accomplished Today:
          </Text>
          {localCompleted === false ? (
            <TouchableWithoutFeedback onPress={handleComplete}>
              <View
                style={{
                  top: moderateScale(2),
                  width: moderateScale(30),
                  height: moderateScale(30),
                  borderWidth: moderateScale(3),
                  borderColor: colorTheme.accents,
                  borderRadius: moderateScale(40),
                  alignItems: "center",
                }}
              ></View>
            </TouchableWithoutFeedback>
          ) : (
            <View>
              <View
                style={{
                  top: moderateScale(2),
                  width: moderateScale(30),
                  height: moderateScale(30),
                  borderWidth: moderateScale(3),
                  borderColor: colorTheme.accents,
                  borderRadius: moderateScale(40),
                  alignItems: "center",
                }}
              ></View>
              <AntDesign
                name="check"
                color={colorTheme.neutral}
                size={moderateScale(40)}
                style={{ position: "absolute", bottom: moderateScale(0) }}
              />
            </View>
          )}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={[styles.streak, { color: textTheme.text }]}>
            Streak:{" "}
          </Text>
          <Text style={[styles.streak, { color: textTheme.text }]}>
            {localStreak}
          </Text>
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
    elevation: 5,
    left: moderateScale(18),
    width: "90.5%", // moderateScale(345)
    borderRadius: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: moderateScale(25),
  },
  itemText: {
    textAlign: "center",
    fontSize: moderateScale(27),
    fontFamily: "NotoSans_700Bold",
  },
  streak: {
    fontSize: moderateScale(20),
    marginTop: moderateScale(5),
    fontFamily: "NotoSans_400Regular",
  },
  accomplished: {
    fontSize: moderateScale(20),
    marginTop: moderateScale(9),
    fontFamily: "NotoSans_700Bold",
  },
});

export default Streak;

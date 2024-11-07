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

const Streak = ({ title, deleteItem, streak, completed, id, item }) => {
  const [localStreak, setLocalStreak] = useState(streak);
  const [localCompleted, setLocalCompleted] = useState(completed);

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
  }, [localStreak, localCompleted]);

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
    let habitsArray = habits; // have to have this b/c we have to modify from the entire array
    let objIndex = habitsArray.findIndex((obj) => obj.id === id);
    habitsArray[objIndex].streak += 1;
    habitsArray[objIndex].completed = true;
    let todayDate = moment().format("YYYY/MM/DD");
    let tomorrowDate = moment().add(1, "d").format("YYYY/MM/DD");
    habitsArray[objIndex].storeDate = todayDate;
    habitsArray[objIndex].tomorrowDate = tomorrowDate;
    setHabits(habitsArray);
    await AsyncStorage.setItem("Habits", JSON.stringify(habitsArray));
  };

  useEffect(() => {
    let habitsArray = habits;
    let objIndex = habitsArray.findIndex((obj) => obj.id === id);
    let todayDate = moment().format("YYYY/MM/DD");
    if (todayDate === habitsArray[objIndex].tomorrowDate) {
      habitsArray[objIndex].completed = false;
      setLocalCompleted(false);
    } else if (
      habitsArray[objIndex].storeDate !== "" &&
      todayDate !== habitsArray[objIndex].storeDate
    ) {
      habitsArray[objIndex].tomorrowDate = "";
      habitsArray[objIndex].storeDate = "";
      habitsArray[objIndex].streak = 0;
      habitsArray[objIndex].completed = false;
      setLocalCompleted(false);
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
      <Text style={[styles.itemText, { color: textTheme.text }]}>{title}</Text>
      <View style={styles.streakContainer}>
        <Text style={styles.streakText}>Streak:</Text>
        <Text style={styles.streakValue}>{localStreak}</Text>
        {localCompleted ? (
          <View style={styles.checkContainer}>
            <AntDesign name="check" style={styles.checkIcon} />
          </View>
        ) : (
          <TouchableWithoutFeedback onPress={handleComplete}>
            <View style={styles.checkContainer}></View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: moderateScale(16),
    backgroundColor: "#333", // Slightly lighter dark gray for a sleek look
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: moderateScale(16),
    width: "90%",
    borderRadius: moderateScale(18),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: moderateScale(24),
  },
  itemText: {
    textAlign: "center",
    fontSize: moderateScale(24),
    fontFamily: "NotoSans_700Bold",
    color: "#ffffff",
    marginBottom: moderateScale(8),
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(8),
  },
  streakText: {
    fontSize: moderateScale(18),
    fontFamily: "NotoSans_400Regular",
    color: "#d1d1d1",
    marginRight: moderateScale(4),
  },
  streakValue: {
    fontSize: moderateScale(18),
    fontFamily: "NotoSans_700Bold",
    color: "#ffffff",
  },
  checkContainer: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderWidth: moderateScale(3),
    borderColor: "#4caf50",
    borderRadius: moderateScale(16),
    alignItems: "center",
    justifyContent: "center",
    marginLeft: moderateScale(10),
  },
  checkIcon: {
    position: "absolute",
    color: "#4caf50",
    fontSize: moderateScale(24),
  },
});

export default Streak;

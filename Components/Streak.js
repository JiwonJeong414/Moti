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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";
import { RootContext } from "../config/RootContext";
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

  if (!fontsLoaded) return null;

  return (
    <View style={[styles.card, { backgroundColor: colorTheme.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: "#E4D5B7" }]}>{title}</Text>
        <TouchableOpacity
          onPress={() => handleDelete(item)}
          style={styles.menuButton}
        >
          <MaterialCommunityIcons
            name="dots-vertical"
            size={20}
            color="#8B8FA3"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.streakContainer}>
        <Text style={[styles.streakLabel, { color: "#8B8FA3" }]}>
          Streak: {localStreak}
        </Text>

        <TouchableWithoutFeedback
          onPress={!localCompleted ? handleComplete : null}
        >
          <View
            style={[
              styles.checkContainer,
              {
                borderColor: localCompleted ? "#7C4DFF" : "#8B8FA3",
                backgroundColor: localCompleted ? "#7C4DFF" : "transparent",
              },
            ]}
          >
            {localCompleted && (
              <MaterialCommunityIcons name="check" size={16} color="#FFFFFF" />
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: moderateScale(16),
    marginHorizontal: moderateScale(20),
    marginBottom: moderateScale(12),
    borderRadius: moderateScale(16),
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScale(12),
  },
  title: {
    fontSize: moderateScale(20),
    fontFamily: "NotoSans_700Bold",
  },
  menuButton: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    alignItems: "center",
    justifyContent: "center",
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: moderateScale(4),
  },
  streakLabel: {
    fontSize: moderateScale(16),
    fontFamily: "NotoSans_400Regular",
  },
  checkContainer: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  checkIcon: {
    fontSize: moderateScale(16),
    color: "#FFFFFF",
  },
});

export default Streak;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Completed from "../Components/Completed";
import { moderateScale } from "react-native-size-matters";
import { Button } from "react-native-paper";
import { RootContext } from "../config/RootContext";
import SettingOpenCircle from "./SettingOpenCircle";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const [update, setUpdate] = useState();

  const { colorTheme, habits, setHabits } = React.useContext(RootContext);

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
    let testArray = habits;
    let objIndex = testArray.findIndex((obj) => obj.id === id);
    console.log("Before Update: ", testArray[objIndex]);
    testArray[objIndex].streak += 1;
    testArray[objIndex].completed = true;
    console.log("After Update: ", testArray[objIndex]);
    console.log(habits.find((obj) => obj.id === id).streak + 1);
    console.log(habits.find((obj) => obj.id === id).completed);
    console.log(testArray);
    var tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var day = tomorrowDate.getDate();
    var month = tomorrowDate.getMonth() + 1;
    var year = tomorrowDate.getFullYear();
    console.log(month + "/" + day + "/" + year);
    var todayDate = new Date();
    var todayDay = todayDate.getDate();
    var todayMonth = todayDate.getMonth() + 1;
    var todayYear = todayDate.getFullYear();
    setLocalStoreDate(todayMonth + "/" + todayDay + "/" + todayYear);
    setLocalTomorrowDate(month + "/" + day + "/" + year);
    testArray[objIndex].storeDate =
      todayMonth + "/" + todayDay + "/" + todayYear;
    testArray[objIndex].tomorrowDate = month + "/" + day + "/" + year;
    setHabits(testArray);
    await AsyncStorage.setItem("Habits", JSON.stringify(testArray));
    // alert when reached milestone
  };

  useEffect(() => {
    let testArray = habits;
    let objIndex = testArray.findIndex((obj) => obj.id === id);
    let todayDate = new Date();
    let todayDay = todayDate.getDate();
    let todayMonth = todayDate.getMonth() + 1;
    let todayYear = todayDate.getFullYear();
    let today = todayMonth + "/" + todayDay + "/" + todayYear;
    console.log("id stored date: " + testArray[objIndex].storeDate);
    if (today === testArray[objIndex].tomorrowDate) {
      testArray[objIndex].completed = false;
      setLocalCompleted(false);
    } else if (
      testArray[objIndex].storeDate != undefined &&
      today !== testArray[objIndex].storeDate
    ) {
      testArray[objIndex].tomorrowDate = "";
      testArray[objIndex].storeDate = "";
      testArray[objIndex].streak = 0;
      setLocalTomorrowDate();
      setLocalStoreDate();
      setLocalStreak(0);
    }
    console.log(testArray);
  }, [update]);

  // asyncstorage habit + title (cause having 2 of the same habit will be wierd)

  const [deleteVisible, setDeleteVisible] = useState(false);

  return (
    <View style={[styles.item, { backgroundColor: colorTheme.primary }]}>
      <View style={styles.itemLeft}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View
            style={{
              left: moderateScale(285),
              position: "absolute",
              flexDirection: "column",
            }}
          >
            <TouchableOpacity onPress={() => setDeleteVisible(!deleteVisible)}>
              <SettingOpenCircle />
            </TouchableOpacity>
            {deleteVisible === true ? (
              <TouchableWithoutFeedback onPress={() => deleteItem(item)}>
                <View
                  style={{
                    width: moderateScale(50),
                    height: moderateScale(30),
                    right: moderateScale(15),
                    backgroundColor: "white",
                    borderColor: "gray",
                    borderWidth: moderateScale(1),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>Delete</Text>
                </View>
              </TouchableWithoutFeedback>
            ) : (
              <></>
            )}
          </View>
          <Text style={styles.itemText}>{title}</Text>
        </View>
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
                  backgroundColor: colorTheme.accents,
                  borderRadius: moderateScale(40),
                  alignItems: "center",
                }}
              ></View>
            </TouchableWithoutFeedback>
          ) : (
            <View
              style={{
                top: moderateScale(2),
                width: moderateScale(30),
                height: moderateScale(30),
                backgroundColor: colorTheme.accents,
                borderRadius: moderateScale(40),
                alignItems: "center",
              }}
            >
              <AntDesign
                name="check"
                color={colorTheme.neutral}
                size={moderateScale(40)}
                style={{ bottom: moderateScale(10) }}
              />
            </View>
          )}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={styles.streak}> Streak: </Text>
          <Text style={styles.streak}> {localStreak}</Text>
        </View>
      </View>
      <Button onPress={() => setUpdate(!update)} style={{ marginTop: 10 }}>
        Update
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    left: 20,
    width: 380,
    height: 140,
    borderRadius: moderateScale(20),
    justifyContent: "space-between",
    marginBottom: moderateScale(25),
  },
  itemLeft: {
    flexDirection: "column",
  },
  itemText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  streak: {
    fontSize: 22,
    marginTop: 18,
  },
  accomplished: {
    fontSize: 22,
    marginTop: 10,
  },
});

export default Streak;

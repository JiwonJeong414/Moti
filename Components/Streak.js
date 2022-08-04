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
import { AntDesign } from "@expo/vector-icons";
import Completed from "../Components/Completed";
import { moderateScale } from "react-native-size-matters";
import { Button } from "react-native-paper";

const Streak = ({ title }) => {
  const [streak, setStreak] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showTouchable, setShowTouchable] = useState(true);
  const [storeDate, setStoreDate] = useState();
  const [tomorrowDate, setTomorrowDate] = useState();
  const [update, setUpdate] = useState();

  const handleComplete = () => {
    setCompleted(true);
    setStreak(streak + 1);
    setShowTouchable(false);
    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    console.log(month + "/" + day + "/" + year);
    var todayDate = new Date();
    var todayDay = todayDate.getDate();
    var todayMonth = todayDate.getMonth() + 1;
    var todayYear = todayDate.getFullYear();
    console.log(todayMonth + "/" + todayDay + "/" + todayYear);
    setStoreDate(todayMonth + "/" + todayDay + "/" + todayYear);
    setTomorrowDate(month + "/" + day + "/" + year);
    // alert when reached milestone
  };

  useEffect(() => {
    var todayDate = new Date();
    var todayDay = todayDate.getDate();
    var todayMonth = todayDate.getMonth() + 1;
    var todayYear = todayDate.getFullYear();
    if (todayMonth + "/" + todayDay + "/" + todayYear === tomorrowDate) {
      setShowTouchable(true);
      setCompleted(false);
    } else {
      //however if it is still today then it shouldn't do this like to tomorrowdate -1 or something
      setTomorrowDate();
      setStoreDate();
      setStreak(0);
    }
    console.log("testTomorrow: " + tomorrowDate);
    console.log("rightNow: " + todayMonth + "/" + todayDay + "/" + todayYear);
  }, [update]);

  // asyncstorage habit + title (cause having 2 of the same habit will be wierd)

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Text style={styles.itemText}>{title}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.streak}> Streak: </Text>
          <Text style={styles.streak}> {streak}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.accomplished}>Accomplished Today: </Text>
        {showTouchable === true ? (
          <TouchableWithoutFeedback onPress={handleComplete}>
            <View
              style={{
                width: 25,
                height: 25,
                backgroundColor: "dodgerblue",
                top: 13,
                borderRadius: 4,
              }}
            >
              {completed === true ? (
                <AntDesign
                  name="close"
                  size={moderateScale(28)}
                  style={{ right: 2.5, bottom: 2.5 }}
                />
              ) : (
                <></>
              )}
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <></>
        )}
      </View>
      <Button onPress={() => setUpdate(!update)} style={{ marginTop: 40 }}>
        Update
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    left: 20,
    width: 380,
    height: 140,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "column",
  },
  itemText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  streak: {
    left: 20,
    fontSize: 22,
    marginTop: 18,
  },
  accomplished: {
    fontSize: 22,
    marginTop: 10,
  },
});

export default Streak;

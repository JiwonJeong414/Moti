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
import { RootContext } from "../config/RootContext";
import SettingOpenCircle from "./SettingOpenCircle";

const Streak = ({
  title,
  deleteItem,
  index,
  streak,
  completed,
  storeDate,
  tomorrowDate,
  item,
  key,
}) => {
  const [localStreak, setLocalStreak] = useState(streak);
  const [localCompleted, setLocalCompleted] = useState(completed);
  const [localStoreDate, setLocalStoreDate] = useState(storeDate);
  const [localTomorrowDate, setLocalTomorrowDate] = useState(tomorrowDate);

  const [showTouchable, setShowTouchable] = useState(true);
  const [update, setUpdate] = useState();

  const { colorTheme } = React.useContext(RootContext);

  // trying adding the asyncstorage here and completely remove from habits

  console.log("streak: " + streak);

  // just configure asyncstorage here and it will update on habits
  // asyncstorage set item (based on index setstreak)
  const handleComplete = async () => {
    let newData = [...events, { date: calculateDate, title: title }];
    let retrieved = null;
    const retrieveHabit = async () => {
      let retrieveData = await AsyncStorage.getItem("Habits");
      retrieveData = JSON.parse(retrieveData);
      retrieved = retrieveData.find((x) => x.key === key);
    };
    retrieveHabit();
    await AsyncStorage.setItem("Events", JSON.stringify(newData));
    setLocalCompleted(true);
    setLocalStreak(localStreak + 1);
    setShowTouchable(false);
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
    // alert when reached milestone
  };

  useEffect(() => {
    let todayDate = new Date();
    let todayDay = todayDate.getDate();
    let todayMonth = todayDate.getMonth() + 1;
    let todayYear = todayDate.getFullYear();
    let today = todayMonth + "/" + todayDay + "/" + todayYear;
    if (today === localTomorrowDate) {
      setShowTouchable(true);
      setLocalCompleted(false);
    } else if (localStoreDate != undefined && today !== localStoreDate) {
      setLocalTomorrowDate();
      setLocalStoreDate();
      setLocalStreak(0);
    }
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
              <TouchableWithoutFeedback onPress={() => deleteItem(index)}>
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
          {showTouchable === true ? (
            <TouchableWithoutFeedback onPress={handleComplete}>
              <View
                style={{
                  width: moderateScale(35),
                  height: moderateScale(35),
                  backgroundColor: colorTheme.accents,
                  marginLeft: moderateScale(10),
                  borderRadius: 4,
                }}
              >
                {localCompleted === true ? (
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
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={styles.streak}> Streak: </Text>
          <Text style={styles.streak}> {localStreak}</Text>
        </View>
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

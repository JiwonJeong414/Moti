import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { RootContext } from "../config/RootContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale } from "react-native-size-matters";
import LottieView from "lottie-react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

const MoodScreen = () => {
  const { textTheme, setTextTheme } = React.useContext(RootContext);
  const [speed, setSpeed] = useState(1);
  const [moodNumber, setMoodNumber] = useState(3);
  const [editTrue, setEditTrue] = useState(false);

  useEffect(() => {
    setSpeed(0.999);
  }, []);

  const handleTouch = () => {
    if (moodNumber === 5) setMoodNumber(1);
    else setMoodNumber(moodNumber + 1);
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          top: moderateScale(50),
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Calendar
          style={styles.Calendar}
          dayComponent={({ date, state, marking }) => {
            return (
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    color: state === "disabled" ? "gray" : "black",
                  }}
                >
                  {date.day}
                </Text>
                {marking === undefined
                  ? console.log(marking)
                  : console.log(marking.type)}
                {marking !== undefined ? (
                  <Image
                    style={{ width: 50, height: 100 }}
                    source={require("../assets/image/alien-amazing.png")}
                  />
                ) : (
                  <View
                    style={{ width: 50, height: 80, backgroundColor: "gray" }}
                  ></View>
                )}
              </View>
            );
          }}
          markedDates={{
            "2022-09-03": { type: "happy" },
            "2022-09-17": { marked: true },
            "2022-09-30": { marked: true },
          }}
        />
        {editTrue === false ? (
          <TouchableWithoutFeedback onPress={() => setEditTrue(true)}>
            <AntDesign
              name="pluscircleo"
              size={moderateScale(24.2)}
              color="black"
            />
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={() => setEditTrue(false)}>
            <Feather name="edit-2" size={moderateScale(24.2)} color="black" />
          </TouchableWithoutFeedback>
        )}
        {moodNumber === 1 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
                marginBottom: moderateScale(100),
              }}
              source={require("../assets/lottie/alien-mad.json")}
            />
          </TouchableWithoutFeedback>
        ) : moodNumber === 2 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
                marginBottom: moderateScale(100),
              }}
              source={require("../assets/lottie/alien-sad.json")}
            />
          </TouchableWithoutFeedback>
        ) : moodNumber === 3 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
                marginBottom: moderateScale(100),
              }}
              source={require("../assets/lottie/alien-okay.json")}
            />
          </TouchableWithoutFeedback>
        ) : moodNumber === 4 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
                marginBottom: moderateScale(100),
              }}
              source={require("../assets/lottie/alien-happy.json")}
            />
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
                marginBottom: moderateScale(100),
              }}
              source={require("../assets/lottie/alien-amazing.json")}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
    </ScrollView>
  );
};

{
  /* <Calendar
  style={[styles.calendar, {height: 300}]}
  dayComponent={({date, state}) => {
    return (
      <View>
        <Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>
          {date.day}
        </Text>
      </View>
    );
  }}
/> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Calendar: {
    width: moderateScale(350),
  },
});

export default MoodScreen;

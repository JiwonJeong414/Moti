import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { RootContext } from "../config/RootContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale } from "react-native-size-matters";
import LottieView from "lottie-react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

const MoodScreen = () => {
  const { textTheme, setTextTheme } = React.useContext(RootContext);
  const [speed, setSpeed] = useState(1);
  const [moodNumber, setMoodNumber] = useState(3);

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
          top: moderateScale(40),
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Calendar
          style={styles.Calendar}
          dayComponent={({ date, state }) => {
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
                <LottieView
                  style={{ width: 100, height: 100 }}
                  source={require("../assets/lottie/alien-amazing.json")}
                />
              </View>
            );
          }}
        />
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

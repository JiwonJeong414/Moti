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
import moment from "moment";

const MoodScreen = () => {
  const { textTheme, colorTheme } = React.useContext(RootContext);
  const [speed, setSpeed] = useState(1);
  const [moodNumber, setMoodNumber] = useState(3);
  const [editTrue, setEditTrue] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    setSpeed(0.999);
  }, []);

  useEffect(() => {
    const retrieveMoodList = async () => {
      let retrieveData = await AsyncStorage.getItem("Moods");
      retrieveData = JSON.parse(retrieveData);
      if (retrieveData == null) setData({});
      else setData(retrieveData);
    };
    retrieveMoodList();
  }, []);

  const handleTouch = () => {
    if (moodNumber === 5) setMoodNumber(1);
    else setMoodNumber(moodNumber + 1);
  };

  const handleSubmit = async () => {
    setEditTrue(!editTrue);
    let today = moment().format("YYYY-MM-DD");
    // today = moment().add(-4, "d").format("YYYY-MM-DD");
    let type = "";
    if (moodNumber === 1) type = "mad";
    else if (moodNumber === 2) type = "sad";
    else if (moodNumber === 3) type = "okay";
    else if (moodNumber === 4) type = "happy";
    else if (moodNumber === 5) type = "amazing";
    const newData = { ...data, [today]: { type: type } };
    await AsyncStorage.setItem("Moods", JSON.stringify(newData));
    setData(newData);
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
          theme={{ calendarBackground: colorTheme.primary }}
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
                {marking !== undefined && marking.type === "happy" ? (
                  <Image
                    style={{
                      width: moderateScale(46),
                      height: moderateScale(90),
                      marginBottom: moderateScale(-30),
                    }}
                    source={require("../assets/image/alien-happy.png")}
                  />
                ) : marking !== undefined && marking.type === "sad" ? (
                  <Image
                    style={{
                      width: moderateScale(46),
                      height: moderateScale(90),
                      marginBottom: moderateScale(-30),
                    }}
                    source={require("../assets/image/alien-sad.png")}
                  />
                ) : marking !== undefined && marking.type === "okay" ? (
                  <Image
                    style={{
                      width: 50,
                      height: moderateScale(95),
                      marginTop: moderateScale(-10),
                      marginBottom: moderateScale(-30),
                    }}
                    source={require("../assets/image/alien-okay2.png")}
                  />
                ) : marking !== undefined && marking.type === "mad" ? (
                  <Image
                    style={{
                      width: moderateScale(46),
                      height: moderateScale(110),
                      marginTop: moderateScale(-15),
                      marginBottom: moderateScale(-30),
                    }}
                    source={require("../assets/image/alien-mad.png")}
                  />
                ) : marking !== undefined && marking.type === "amazing" ? (
                  <Image
                    style={{
                      width: moderateScale(46),
                      height: moderateScale(90),
                      marginBottom: moderateScale(-30),
                    }}
                    source={require("../assets/image/alien-amazing.png")}
                  />
                ) : (
                  <View
                    style={{
                      width: moderateScale(46),
                      height: moderateScale(78),
                      backgroundColor: "#D3D3D3",
                      borderRadius: 20,
                    }}
                  ></View>
                )}
              </View>
            );
          }}
          markedDates={data}
        />
        {editTrue === false ? (
          <TouchableWithoutFeedback onPress={handleSubmit}>
            <AntDesign
              name="pluscircleo"
              size={moderateScale(24.2)}
              color="black"
            />
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={handleSubmit}>
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
    borderRadius: moderateScale(8),
  },
});

export default MoodScreen;

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
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import moment from "moment";
import Modal from "react-native-modal";

const MoodScreen = () => {
  const { textTheme, colorTheme } = React.useContext(RootContext);
  const [speed, setSpeed] = useState(1);
  const [moodNumber, setMoodNumber] = useState(3);
  const [editTrue, setEditTrue] = useState(false);
  const [data, setData] = useState({});
  const [settingsVisible, setSettingVisible] = useState(false);
  const [moodSet, setMoodSet] = useState(1);

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
    <ScrollView
      style={[styles.container, { backgroundColor: colorTheme.neutral }]}
    >
      <View
        style={{
          top: moderateScale(50),
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colorTheme.neutral,
        }}
      >
        <Calendar
          style={styles.Calendar}
          theme={{
            calendarBackground: colorTheme.primary,
            arrowColor: colorTheme.accents,
          }}
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
        <View
          style={{
            alignSelf: "flex-end",
            right: moderateScale(20),
            marginTop: moderateScale(-5),
          }}
        >
          <TouchableWithoutFeedback onPress={() => setSettingVisible(true)}>
            <Entypo
              name="dots-three-horizontal"
              size={moderateScale(50)}
              color="black"
            />
          </TouchableWithoutFeedback>
        </View>
        <Modal
          isVisible={settingsVisible}
          animationIn="bounceIn"
          animationOut="bounceOut"
          onBackdropPress={() => setSettingVisible(false)}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <View style={[styles.modalBackground, { flexDirection: "column" }]}>
            <View style={styles.modalHeader}>
              <Text
                style={{
                  color: "white",
                  fontFamily: "NotoSans_400Regular",
                  fontSize: moderateScale(20),
                }}
              >
                Choose Mood Set
              </Text>
            </View>
            <TouchableWithoutFeedback onPress={() => setMoodSet(1)}>
              <View>
                <Image
                  style={{
                    width: moderateScale(110),
                    height: moderateScale(90),
                    right: moderateScale(105),
                    top: moderateScale(10),
                  }}
                  source={require("../assets/image/alien-okay2.png")}
                />
                {moodSet === 1 ? (
                  <Entypo
                    name="check"
                    size={moderateScale(30)}
                    color="#ADD8E6"
                    style={{
                      right: moderateScale(145),
                      position: "absolute",
                      top: moderateScale(100),
                    }}
                  />
                ) : (
                  <></>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
        {moodNumber === 1 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
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
              }}
              source={require("../assets/lottie/alien-amazing.json")}
            />
          </TouchableWithoutFeedback>
        )}
        <TouchableWithoutFeedback onPress={handleSubmit}>
          <View
            style={{
              backgroundColor: colorTheme.primary,
              width: moderateScale(120),
              height: moderateScale(50),
              borderRadius: moderateScale(10),
              marginBottom: moderateScale(100),
              shadowOpacity: 0.25,
              shadowRadius: 4,
              shadowOffset: {
                height: 2,
              },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(20),
                fontFamily: "NotoSans_400Regular",
              }}
            >
              Add Mood
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Calendar: {
    width: moderateScale(350),
    borderRadius: moderateScale(8),
  },
  modalHeader: {
    position: "absolute",
    width: "100.4%",
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(40),
    top: moderateScale(0),
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
    backgroundColor: "black",
  },
  modalBackground: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(10),
    width: moderateScale(320),
    height: moderateScale(185),
    backgroundColor: "#FFF",
  },
});

export default MoodScreen;

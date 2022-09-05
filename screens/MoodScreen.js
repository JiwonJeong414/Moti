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
  const { textTheme, colorTheme, onboarded } = React.useContext(RootContext);
  const [speed, setSpeed] = useState(1);
  const [moodNumber, setMoodNumber] = useState(3);
  const [editTrue, setEditTrue] = useState(false);
  const [data, setData] = useState({});
  const [settingsVisible, setSettingVisible] = useState(false);
  const [moodSet, setMoodSet] = useState(1);
  const [myName, setMyName] = useState();

  useEffect(() => {
    setTimeout(() => {
      setSpeed(0.999);
    }, 1000);
  }, []);

  useEffect(() => {
    const getName = async () => {
      let userName = await AsyncStorage.getItem("Name");
      userName = JSON.parse(userName);
      setMyName(userName);
    };
    getName();
  }, [onboarded]);

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
        <View>
          <Text style={{ fontSize: moderateScale(30) }}>
            {myName}'s Mood Calendar
          </Text>
        </View>
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
                {marking !== undefined &&
                marking.type === "happy" &&
                moodSet === 1 ? (
                  <Image
                    style={{
                      width: moderateScale(46),
                      height: moderateScale(90),
                      marginBottom: moderateScale(-30),
                    }}
                    source={require("../assets/image/alien-happy.png")}
                  />
                ) : marking !== undefined &&
                  marking.type === "sad" &&
                  moodSet === 1 ? (
                  <Image
                    style={{
                      width: moderateScale(46),
                      height: moderateScale(90),
                      marginBottom: moderateScale(-30),
                    }}
                    source={require("../assets/image/alien-sad.png")}
                  />
                ) : marking !== undefined &&
                  marking.type === "okay" &&
                  moodSet === 1 ? (
                  <Image
                    style={{
                      width: 50,
                      height: moderateScale(95),
                      marginTop: moderateScale(-10),
                      marginBottom: moderateScale(-30),
                    }}
                    source={require("../assets/image/alien-okay2.png")}
                  />
                ) : marking !== undefined &&
                  marking.type === "mad" &&
                  moodSet === 1 ? (
                  <Image
                    style={{
                      width: moderateScale(46),
                      height: moderateScale(110),
                      marginTop: moderateScale(-15),
                      marginBottom: moderateScale(-30),
                    }}
                    source={require("../assets/image/alien-mad.png")}
                  />
                ) : marking !== undefined &&
                  marking.type === "amazing" &&
                  moodSet === 1 ? (
                  <Image
                    style={{
                      width: moderateScale(46),
                      height: moderateScale(90),
                      marginBottom: moderateScale(-30),
                    }}
                    source={require("../assets/image/alien-amazing.png")}
                  />
                ) : marking === undefined && moodSet === 1 ? (
                  <View
                    style={{
                      width: moderateScale(46),
                      height: moderateScale(78),
                      backgroundColor: "#D3D3D3",
                      borderRadius: 20,
                    }}
                  ></View>
                ) : marking !== undefined &&
                  marking.type === "happy" &&
                  moodSet === 2 ? (
                  <Image
                    style={{
                      width: moderateScale(50),
                      height: moderateScale(70),
                      marginBottom: moderateScale(-30),
                    }}
                    source={require("../assets/image/koala-happy.png")}
                  />
                ) : marking !== undefined &&
                  marking.type === "sad" &&
                  moodSet === 2 ? (
                  <Image
                    style={{
                      width: moderateScale(50),
                      height: moderateScale(70),
                      marginBottom: moderateScale(-30),
                    }}
                    source={require("../assets/image/koala-sad.png")}
                  />
                ) : marking !== undefined &&
                  marking.type === "okay" &&
                  moodSet === 2 ? (
                  <Image
                    style={{
                      width: moderateScale(50),
                      height: moderateScale(70),
                      marginBottom: moderateScale(-30),
                    }}
                    source={require("../assets/image/koala-normal.png")}
                  />
                ) : marking !== undefined &&
                  marking.type === "mad" &&
                  moodSet === 2 ? (
                  <Image
                    style={{
                      width: moderateScale(50),
                      height: moderateScale(70),
                      marginBottom: moderateScale(-30),
                    }}
                    source={require("../assets/image/koala-tired.png")}
                  />
                ) : marking !== undefined &&
                  marking.type === "amazing" &&
                  moodSet === 2 ? (
                  <Image
                    style={{
                      width: moderateScale(50),
                      height: moderateScale(70),
                      marginBottom: moderateScale(-30),
                    }}
                    source={require("../assets/image/koala-love.png")}
                  />
                ) : marking === undefined && moodSet === 2 ? (
                  <View
                    style={{
                      width: moderateScale(46),
                      height: moderateScale(46),
                      backgroundColor: "#D3D3D3",
                      marginTop: moderateScale(10),
                      borderRadius: moderateScale(19),
                    }}
                  ></View>
                ) : marking !== undefined &&
                  marking.type === "happy" &&
                  moodSet === 3 ? (
                  <Image
                    style={{
                      width: moderateScale(50),
                      height: moderateScale(60),
                      marginBottom: moderateScale(-30),
                    }}
                    source={require("../assets/image/fruit-happy.png")}
                  />
                ) : marking !== undefined &&
                  marking.type === "sad" &&
                  moodSet === 3 ? (
                  <Image
                    style={{
                      width: moderateScale(50),
                      height: moderateScale(60),
                      marginBottom: moderateScale(-30),
                    }}
                    source={require("../assets/image/fruit-sleepy.png")}
                  />
                ) : marking !== undefined &&
                  marking.type === "okay" &&
                  moodSet === 3 ? (
                  <Image
                    style={{
                      width: moderateScale(50),
                      height: moderateScale(60),
                      marginBottom: moderateScale(-30),
                    }}
                    source={require("../assets/image/fruit-normal.png")}
                  />
                ) : marking !== undefined &&
                  marking.type === "mad" &&
                  moodSet === 3 ? (
                  <Image
                    style={{
                      width: moderateScale(50),
                      height: moderateScale(60),
                      marginBottom: moderateScale(-30),
                    }}
                    source={require("../assets/image/fruit-dizzy.png")}
                  />
                ) : marking !== undefined &&
                  marking.type === "amazing" &&
                  moodSet === 3 ? (
                  <Image
                    style={{
                      width: moderateScale(50),
                      height: moderateScale(55),
                      top: moderateScale(5),
                    }}
                    source={require("../assets/image/fruit-amazing.png")}
                  />
                ) : marking === undefined && moodSet === 3 ? (
                  <View
                    style={{
                      width: moderateScale(46),
                      height: moderateScale(46),
                      backgroundColor: "#D3D3D3",
                      marginTop: moderateScale(10),
                      borderRadius: moderateScale(19),
                    }}
                  ></View>
                ) : marking !== undefined &&
                  marking.type === "happy" &&
                  moodSet === 4 ? (
                  <Image
                    style={{
                      width: moderateScale(70),
                      height: moderateScale(90),
                      marginBottom: moderateScale(-30),
                      bottom: moderateScale(10),
                    }}
                    source={require("../assets/image/monster-happy.png")}
                  />
                ) : marking !== undefined &&
                  marking.type === "sad" &&
                  moodSet === 4 ? (
                  <Image
                    style={{
                      width: moderateScale(70),
                      height: moderateScale(70),
                      marginBottom: moderateScale(-30),
                    }}
                    source={require("../assets/image/monster-sad.png")}
                  />
                ) : marking !== undefined &&
                  marking.type === "okay" &&
                  moodSet === 4 ? (
                  <Image
                    style={{
                      width: moderateScale(70),
                      height: moderateScale(90),
                      marginBottom: moderateScale(-30),
                      bottom: moderateScale(10),
                    }}
                    source={require("../assets/image/monster-normal.png")}
                  />
                ) : marking !== undefined &&
                  marking.type === "mad" &&
                  moodSet === 4 ? (
                  <Image
                    style={{
                      width: moderateScale(70),
                      height: moderateScale(90),
                      marginBottom: moderateScale(-30),
                      bottom: moderateScale(10),
                    }}
                    source={require("../assets/image/monster-mad.png")}
                  />
                ) : marking !== undefined &&
                  marking.type === "amazing" &&
                  moodSet === 4 ? (
                  <Image
                    style={{
                      width: moderateScale(70),
                      height: moderateScale(70),
                      marginBottom: moderateScale(-30),
                    }}
                    source={require("../assets/image/monster-love.png")}
                  />
                ) : marking === undefined && moodSet === 4 ? (
                  <View
                    style={{
                      width: moderateScale(46),
                      height: moderateScale(46),
                      backgroundColor: "#D3D3D3",
                      marginTop: moderateScale(10),
                      borderRadius: moderateScale(19),
                    }}
                  ></View>
                ) : marking !== undefined &&
                  marking.type === "happy" &&
                  moodSet === 5 ? (
                  <Image
                    style={{
                      width: moderateScale(70),
                      height: moderateScale(90),
                      marginBottom: moderateScale(-30),
                      bottom: moderateScale(10),
                    }}
                    source={require("../assets/image/twod-happy.png")}
                  />
                ) : marking !== undefined &&
                  marking.type === "sad" &&
                  moodSet === 5 ? (
                  <Image
                    style={{
                      width: moderateScale(70),
                      height: moderateScale(80),
                      bottom: moderateScale(5),
                      marginBottom: moderateScale(-30),
                    }}
                    source={require("../assets/image/twod-lazy.png")}
                  />
                ) : marking !== undefined &&
                  marking.type === "okay" &&
                  moodSet === 5 ? (
                  <Image
                    style={{
                      width: moderateScale(70),
                      height: moderateScale(90),
                      marginBottom: moderateScale(-30),
                      bottom: moderateScale(10),
                    }}
                    source={require("../assets/image/twod-good.png")}
                  />
                ) : marking !== undefined &&
                  marking.type === "mad" &&
                  moodSet === 5 ? (
                  <Image
                    style={{
                      width: moderateScale(70),
                      height: moderateScale(90),
                      marginBottom: moderateScale(-30),
                      bottom: moderateScale(10),
                    }}
                    source={require("../assets/image/twod-sad.png")}
                  />
                ) : marking !== undefined &&
                  marking.type === "amazing" &&
                  moodSet === 5 ? (
                  <Image
                    style={{
                      width: moderateScale(70),
                      height: moderateScale(80),
                      marginBottom: moderateScale(-30),
                      left: moderateScale(10),
                      bottom: moderateScale(10),
                    }}
                    source={require("../assets/image/twod-love.png")}
                  />
                ) : marking === undefined && moodSet === 5 ? (
                  <View
                    style={{
                      width: moderateScale(46),
                      height: moderateScale(46),
                      backgroundColor: "#D3D3D3",
                      marginTop: moderateScale(10),
                      borderRadius: moderateScale(19),
                    }}
                  ></View>
                ) : (
                  <></>
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
            <View style={{ flexDirection: "row" }}>
              <TouchableWithoutFeedback onPress={() => setMoodSet(1)}>
                <View>
                  <Image
                    style={{
                      width: moderateScale(110),
                      height: moderateScale(90),
                      left: moderateScale(55),
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
                        position: "absolute",
                        top: moderateScale(100),
                        left: moderateScale(95),
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setMoodSet(2)}>
                <View>
                  <Image
                    style={{
                      width: moderateScale(90),
                      height: moderateScale(90),
                      left: moderateScale(20),
                      top: moderateScale(10),
                    }}
                    source={require("../assets/image/koala-normal.png")}
                  />
                  {moodSet === 2 ? (
                    <Entypo
                      name="check"
                      size={moderateScale(30)}
                      color="#ADD8E6"
                      style={{
                        position: "absolute",
                        top: moderateScale(100),
                        left: moderateScale(50),
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setMoodSet(3)}>
                <View>
                  <Image
                    style={{
                      width: moderateScale(60),
                      height: moderateScale(60),
                      top: moderateScale(30),
                    }}
                    source={require("../assets/image/fruit-happy.png")}
                  />
                  {moodSet === 3 ? (
                    <Entypo
                      name="check"
                      size={moderateScale(30)}
                      color="#ADD8E6"
                      style={{
                        right: moderateScale(12),
                        position: "absolute",
                        top: moderateScale(100),
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setMoodSet(4)}>
                <View>
                  <Image
                    style={{
                      width: moderateScale(110),
                      height: moderateScale(110),
                      right: moderateScale(20),
                      top: moderateScale(5),
                    }}
                    source={require("../assets/image/monster-happy.png")}
                  />
                  {moodSet === 4 ? (
                    <Entypo
                      name="check"
                      size={moderateScale(30)}
                      color="#ADD8E6"
                      style={{
                        right: moderateScale(58),
                        position: "absolute",
                        top: moderateScale(100),
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setMoodSet(5)}>
                <View>
                  <Image
                    style={{
                      width: moderateScale(90),
                      height: moderateScale(90),
                      right: moderateScale(60),
                      top: moderateScale(10),
                    }}
                    source={require("../assets/image/twod-good.png")}
                  />
                  {moodSet === 5 ? (
                    <Entypo
                      name="check"
                      size={moderateScale(30)}
                      color="#ADD8E6"
                      style={{
                        right: moderateScale(88),
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
          </View>
        </Modal>
        {moodNumber === 1 && moodSet === 1 ? (
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
        ) : moodNumber === 2 && moodSet === 1 ? (
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
        ) : moodNumber === 3 && moodSet === 1 ? (
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
        ) : moodNumber === 4 && moodSet === 1 ? (
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
        ) : moodNumber === 5 && moodSet === 1 ? (
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
        ) : moodNumber === 1 && moodSet === 2 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/lottie/koala-tired.json")}
            />
          </TouchableWithoutFeedback>
        ) : moodNumber === 2 && moodSet === 2 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/lottie/koala-sad.json")}
            />
          </TouchableWithoutFeedback>
        ) : moodNumber === 3 && moodSet === 2 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/lottie/koala-okay.json")}
            />
          </TouchableWithoutFeedback>
        ) : moodNumber === 4 && moodSet === 2 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/lottie/koala-happy.json")}
            />
          </TouchableWithoutFeedback>
        ) : moodNumber === 5 && moodSet === 2 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/lottie/koala-amazing.json")}
            />
          </TouchableWithoutFeedback>
        ) : moodNumber === 1 && moodSet === 3 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/lottie/fruit-dizzy.json")}
            />
          </TouchableWithoutFeedback>
        ) : moodNumber === 2 && moodSet === 3 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/lottie/fruit-sleepy.json")}
            />
          </TouchableWithoutFeedback>
        ) : moodNumber === 3 && moodSet === 3 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/lottie/fruit-cute.json")}
            />
          </TouchableWithoutFeedback>
        ) : moodNumber === 4 && moodSet === 3 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/lottie/fruit-happy.json")}
            />
          </TouchableWithoutFeedback>
        ) : moodNumber === 5 && moodSet === 3 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/lottie/fruit-amazing.json")}
            />
          </TouchableWithoutFeedback>
        ) : moodNumber === 1 && moodSet === 4 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/lottie/monster-mad.json")}
            />
          </TouchableWithoutFeedback>
        ) : moodNumber === 2 && moodSet === 4 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/lottie/monster-sad.json")}
            />
          </TouchableWithoutFeedback>
        ) : moodNumber === 3 && moodSet === 4 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/lottie/monster-fine.json")}
            />
          </TouchableWithoutFeedback>
        ) : moodNumber === 4 && moodSet === 4 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/lottie/monster-happy.json")}
            />
          </TouchableWithoutFeedback>
        ) : moodNumber === 5 && moodSet === 4 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/lottie/monster-love.json")}
            />
          </TouchableWithoutFeedback>
        ) : moodNumber === 1 && moodSet === 5 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/lottie/twod-sad.json")}
            />
          </TouchableWithoutFeedback>
        ) : moodNumber === 2 && moodSet === 5 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/lottie/twod-lazy.json")}
            />
          </TouchableWithoutFeedback>
        ) : moodNumber === 3 && moodSet === 5 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/lottie/twod-good.json")}
            />
          </TouchableWithoutFeedback>
        ) : moodNumber === 4 && moodSet === 5 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/lottie/twod-happy.json")}
            />
          </TouchableWithoutFeedback>
        ) : moodNumber === 5 && moodSet === 5 ? (
          <TouchableWithoutFeedback onPress={handleTouch}>
            <LottieView
              autoPlay
              loop
              speed={speed}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/lottie/twod-love.json")}
            />
          </TouchableWithoutFeedback>
        ) : (
          <></>
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

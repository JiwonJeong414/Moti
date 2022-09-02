import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, Text, SafeAreaView } from "react-native";
import { RootContext } from "../config/RootContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale } from "react-native-size-matters";
import LottieView from "lottie-react-native";

const MoodScreen = () => {
  const { textTheme, setTextTheme } = React.useContext(RootContext);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    setSpeed(0.999);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          top: moderateScale(40),
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <LottieView
          autoPlay
          loop
          speed={speed}
          style={{ width: 100, height: 100 }}
          source={require("../assets/lottie/alien-amazing.json")}
        />
        <LottieView
          autoPlay
          loop
          speed={speed}
          style={{ width: 100, height: 100 }}
          source={require("../assets/lottie/alien-happy.json")}
        />
        <LottieView
          autoPlay
          loop
          speed={speed}
          style={{ width: 100, height: 100 }}
          source={require("../assets/lottie/alien-okay.json")}
        />
        <LottieView
          autoPlay
          loop
          speed={speed}
          style={{ width: 100, height: 100 }}
          source={require("../assets/lottie/alien-sad.json")}
        />
        <LottieView
          autoPlay
          loop
          speed={speed}
          style={{ width: 100, height: 100 }}
          source={require("../assets/lottie/alien-mad.json")}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MoodScreen;

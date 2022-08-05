import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "../screens/HomeScreen";
import { RootContext } from "../config/RootContext";
import { moderateScale } from "react-native-size-matters";
import {
  NotoSans_400Regular,
  NotoSans_700Bold,
  useFonts,
} from "@expo-google-fonts/noto-sans";

const OnBoardingScreen = ({ navigation, route }) => {
  const [text, setText] = useState();
  const { onboarded, setOnboard } = React.useContext(RootContext);

  const setName = async (name) => {
    await AsyncStorage.setItem("Name", JSON.stringify(name));
    setOnboard(true);
  };

  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.green}></View>
      <Text style={styles.text}>What is your name?</Text>
      <View style={styles.textInput}>
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="First Name"
          placeholderTextColor="gray"
          onChangeText={(text) => setText(text)}
        ></TextInput>
      </View>
      <TouchableWithoutFeedback onPress={() => setName(text)}>
        <View style={styles.confirm}>
          <Text style={styles.next}>Next</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFEF7",
    justifyContent: "center",
    alignItems: "center",
  },
  green: {
    position: "absolute",
    top: moderateScale(193.5),
    left: moderateScale(131.5),
    width: moderateScale(40),
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  textInput: {
    position: "absolute",
    top: moderateScale(444),
    left: moderateScale(24),
    width: moderateScale(327),
    height: moderateScale(52),
    backgroundColor: "#FFFFFF",
    borderColor: "gray",
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(40),
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    fontSize: moderateScale(16),
    fontFamily: "NotoSans_400Regular",
  },
  confirm: {
    position: "absolute",
    top: moderateScale(516),
    left: moderateScale(24),
    width: moderateScale(327),
    height: moderateScale(52),
    borderRadius: moderateScale(40),
    backgroundColor: "#6524FF",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  next: {
    fontSize: moderateScale(16),
    fontFamily: "NotoSans_400Regular",
    color: "white",
  },
});

export default OnBoardingScreen;

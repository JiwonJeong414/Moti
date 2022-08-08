import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootContext } from "../config/RootContext";
import { moderateScale } from "react-native-size-matters";

const OnBoardingScreen = ({ navigation, route }) => {
  const [text, setText] = useState();
  const { onboarded, setOnboard } = React.useContext(RootContext);

  const setName = async (name) => {
    await AsyncStorage.setItem("Name", JSON.stringify(name));
    setOnboard(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.green}></View>
      <Image
        source={require("../assets/image/motibackground.png")}
        style={{
          width: moderateScale(112 * 1.5),
          height: moderateScale(125 * 1.5),
          position: "absolute",
          top: moderateScale(140),
        }}
      />
      <View style={styles.textInput}>
        <Text
          style={[
            styles.text,
            {
              position: "absolute",
              bottom: moderateScale(60),
            },
          ]}
        >
          What is your name?
        </Text>
        <TextInput
          autoCorrect={false}
          style={styles.input}
          keyboardType="default"
          placeholder="First Name"
          placeholderTextColor="gray"
          onChangeText={(text) => setText(text)}
        />
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
  text: {
    fontWeight: "bold",
    fontSize: moderateScale(20),
  },
  textInput: {
    position: "absolute",
    top: Platform.OS === "ios" ? moderateScale(444) : moderateScale(400),
    left: moderateScale(24),
    width: "86%",
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
    fontFamily: Platform.OS === "ios" ? "Verdana" : "notoserif",
  },
  confirm: {
    position: "absolute",
    top: Platform.OS === "ios" ? moderateScale(516) : moderateScale(470),
    left: moderateScale(24),
    width: "86%",
    height: moderateScale(52),
    borderRadius: moderateScale(40),
    backgroundColor: "#6524FF",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  next: {
    fontSize: moderateScale(16),
    fontFamily: Platform.OS === "ios" ? "Verdana" : "notoserif",
    color: "white",
  },
});

export default OnBoardingScreen;

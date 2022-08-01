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

const OnBoardingScreen = ({ navigation, route }) => {
  const [text, setText] = useState();
  const { onboarded, setOnboard } = React.useContext(RootContext);

  const setName = async (name) => {
    await AsyncStorage.setItem("Name", JSON.stringify(name));
    setOnboard(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}> First Name</Text>
      <View style={styles.name}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="gray"
          onChangeText={(text) => setText(text)}
        ></TextInput>
        <TouchableWithoutFeedback onPress={() => setName(text)}>
          <View style={styles.confirm} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "dodgerblue",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  name: {
    width: "70%",
    height: "5%",
    marginTop: 85,
    backgroundColor: "#FFFFFF",
    opacity: 0.4,
    borderRadius: 5,
    marginTop: 10,
    borderColor: "black",
    borderWidth: 2,
    justifyContent: "center",
  },
  input: {
    paddingLeft: 10,
  },
  confirm: {
    position: "absolute",
    left: 295,
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "black",
  },
});

export default OnBoardingScreen;

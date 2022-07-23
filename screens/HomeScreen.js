import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
  Button,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Task from "../Components/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Todo from "../Components/Todo";
import CustomDatePicker from "../Components/CustomDatePicker";

const HomeScreen = ({ navigation, route }) => {
  const [myName, setMyName] = useState();
  const { onboarded, setOnboard } = route.params;

  useEffect(() => {
    const getName = async () => {
      let userName = await AsyncStorage.getItem("Name");
      userName = JSON.parse(userName);
      setMyName(userName);
    };
    getName();
  }, [onboarded]);

  const deleteUsername = async () => {
    await AsyncStorage.removeItem("Name");
    setOnboard(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.image}
          source={require("../assets/pixel_night.png")}
        />
      </TouchableOpacity>
      <Image style={styles.profile} source={require("../assets/night.png")} />

      {/* Quotes */}
      <View style={styles.quotes}>
        <Text style={styles.words}>
          "When you have a dream, you've got to grab it and never let go."
        </Text>
        <Text style={styles.words2}> — Carol Burnett</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}> {myName}'s Dashboard </Text>
        <TouchableWithoutFeedback onPress={() => deleteUsername()}>
          <View style={styles.deleteAccount} />
        </TouchableWithoutFeedback>
      </View>
      <CustomDatePicker widgetTitle="Events" />
      <Todo widgetTitle="Today's Tasks" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b3b3d5",
  },
  image: {
    width: "100%",
    height: 190,
    marginBottom: 40,
  },
  profile: {
    position: "absolute",
    top: 120,
    width: 100,
    height: 100,
    borderRadius: 20,
    left: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    left: 10,
    paddingTop: 10,
  },
  quotes: {
    paddingLeft: 10,
  },
  words: {
    fontSize: 25,
    fontStyle: "italic",
    fontFamily: "Baskerville-Bold",
    color: "darkblue",
  },
  row: {
    flexDirection: "row",
  },
  words2: {
    fontSize: 25,
    fontStyle: "italic",
    fontFamily: "Baskerville-Bold",
    color: "darkblue",
    marginLeft: 180,
  },
  deleteAccount: {
    width: 30,
    height: 30,
    backgroundColor: "purple",
    marginLeft: 20,
    top: 10,
  },
});

export default HomeScreen;

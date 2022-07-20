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
} from "react-native";
import Task from "../Components/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Todo from "../Components/Todo";
import CustomDatePicker from "../Components/CustomDatePicker";

const HomeScreen = ({ navigation }) => {
  const goToHotlineScreen = () => {
    navigation.navigate("Hotline");
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
      <Text style={styles.text}> Jiwon's Dashboard </Text>
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
  words2: {
    fontSize: 25,
    fontStyle: "italic",
    fontFamily: "Baskerville-Bold",
    color: "darkblue",
    marginLeft: 180,
  },
});

export default HomeScreen;

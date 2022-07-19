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
import Events from "../Components/Events";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Todo from "../Components/Todo";

const HomeScreen = ({ navigation }) => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState();
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Empty");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setText(fDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

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

      {/* Events */}
      {/* <Text style={styles.sectionTitle}> Events </Text>
      <View style={styles.eventsTitle}>
        <Events></Events>
      </View> */}
      {/* <Text style={{ fontWeight: "bold", fontSize: 20 }}>{text}</Text>
      <View style={{ margin: 20 }}>
        <Button title="DatePicker" onPress={() => showMode("date")} />
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )} */}

      <Todo />
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
  taskWrapper: {
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingRight: 10,
  },
  items: {
    marginTop: 15,
  },
  writeTaskWrapper: {
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    width: 35,
    height: 35,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  eventsTitle: {
    paddingTop: 10,
  },
  test: {
    flexDirection: "row",
  },
});

export default HomeScreen;

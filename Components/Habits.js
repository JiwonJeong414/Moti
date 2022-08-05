import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "react-native-neat-date-picker";
import Events from "./Events";
import { Button, IconButton, TextInput } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import Streak from "../Components/Streak";
import SettingOpenCircle from "./SettingOpenCircle";
import { AntDesign } from "@expo/vector-icons";
import Completed from "../Components/Completed";
import { RootContext } from "../config/RootContext";

const Habits = ({ widgetTitle }) => {
  const [modal, showModal] = useState(false);
  const [title, setTitle] = useState();
  const [habits, setHabits] = useState([]);
  const [key, setKey] = useState(0);

  const [streak, setStreak] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [storeDate, setStoreDate] = useState();
  const [tomorrowDate, setTomorrowDate] = useState();

  const handleAdd = async () => {
    showModal(false);
    let newData = [
      ...habits,
      {
        key: key,
        title: title,
        streak: streak,
        completed: completed,
        storeDate: storeDate,
        tomorrowDate: tomorrowDate,
      },
    ];
    console.log("ajklsadfjk;: " + streak);
    await AsyncStorage.setItem("Habits", JSON.stringify(newData));
    setHabits(newData);
    setTitle(null);
  };

  const deleteHabitItem = async (index) => {
    let itemsCopy = [...habits];
    setKey(key - 1);
    itemsCopy.splice(index, 1);
    await AsyncStorage.setItem("Habits", JSON.stringify(itemsCopy));
    setHabits(itemsCopy);
  };

  useEffect(() => {
    const retrieveToDoItems = async () => {
      let retrieveData = await AsyncStorage.getItem("Habits");
      retrieveData = JSON.parse(retrieveData);
      if (retrieveData == null) setHabits([]);
      else setHabits(retrieveData);
    };
    retrieveToDoItems();
  }, []);

  const handleModal = () => {
    showModal(true);
    setTitle(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.sectionTitle}> {widgetTitle}</Text>
        <IconButton
          icon="bookmark-plus-outline"
          onPress={handleModal}
          style={{
            right: moderateScale(15),
            marginBottom: moderateScale(-8),
            bottom: moderateScale(8),
          }}
        />
      </View>
      <Modal
        isVisible={modal}
        animationIn="bounceIn"
        animationOut="bounceOut"
        useNativeDriver
        hideModalContentWhileAnimating
        onBackdropPress={() => showModal(false)}
        style={styles.modalBackground}
      >
        <View style={styles.modalHeader}>
          <TextInput
            label="Habit"
            value={title}
            mode="outlined"
            onChangeText={(text) => setTitle(text)}
            style={{
              width: moderateScale(190),
              marginBottom: moderateScale(20),
            }}
          />
          <Button
            onPress={handleAdd}
            mode="contained"
            style={{
              position: "absolute",
              left: moderateScale(195),
              top: moderateScale(190),
            }}
          >
            Add
          </Button>
        </View>
      </Modal>
      {habits != null ? (
        habits.map((item, index) => {
          return (
            <TouchableWithoutFeedback key={index}>
              <Streak
                title={item.title}
                deleteItem={deleteHabitItem}
                index={index}
                streak={item.streak}
                completed={item.completed}
                storeDate={item.storeDate}
                tomorrowDate={item.tomorrowDate}
                item={item}
                key={key}
              />
            </TouchableWithoutFeedback>
          );
        })
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingRight: 10,
  },
  row: {
    flexDirection: "row",
  },
  modalBackground: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "80%",
    height: "30%",
    backgroundColor: "#FFF",
  },
});

export default Habits;

import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, IconButton, TextInput } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import Streak from "../Components/Streak";
import { RootContext } from "../config/RootContext";

const Habits = ({ widgetTitle }) => {
  const [modal, showModal] = useState(false);
  const [title, setTitle] = useState();
  const { habits, setHabits, textTheme } = React.useContext(RootContext);

  const handleAdd = async () => {
    showModal(false);
    let newData = [
      ...habits,
      {
        id: Math.random(),
        title: title,
        streak: 0,
        completed: false,
        storeDate: "",
        tomorrowDate: "",
      },
    ];
    await AsyncStorage.setItem("Habits", JSON.stringify(newData));
    setHabits(newData);
    setTitle(null);
  };

  const deleteHabitItem = async (item) => {
    let newDataArray = habits.filter((obj) => obj.id != item.id);
    await AsyncStorage.setItem("Habits", JSON.stringify(newDataArray));
    setHabits(newDataArray);
  };

  const handleModal = () => {
    showModal(true);
    setTitle(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.sectionTitle, { color: textTheme.text }]}>
          {widgetTitle}
        </Text>
        <IconButton
          icon="bookmark-plus-outline"
          onPress={handleModal}
          color={textTheme.text}
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
          <View style={styles.modal}>
            <Text
              style={{
                color: "white",
                fontFamily: "NotoSans_400Regular",
                fontSize: moderateScale(20),
              }}
            >
              Add Habit
            </Text>
          </View>
          <TextInput
            label="Habit"
            value={title}
            mode="outlined"
            onChangeText={(text) => setTitle(text)}
            activeOutlineColor="#55BCF6"
            style={{
              width: moderateScale(190),
            }}
          />
          <Button
            onPress={handleAdd}
            mode="contained"
            style={{
              position: "absolute",
              left: moderateScale(195),
              top: moderateScale(190),
              backgroundColor: "#55BCF6",
            }}
          >
            Add
          </Button>
        </View>
      </Modal>
      {habits != null ? (
        habits.map((item) => {
          return (
            <TouchableWithoutFeedback key={item.id}>
              <Streak
                title={item.title}
                deleteItem={deleteHabitItem}
                streak={item.streak}
                completed={item.completed}
                id={item.id}
                item={item}
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
    fontSize: moderateScale(22),
    fontWeight: "bold",
    paddingLeft: moderateScale(18),
    paddingRight: moderateScale(9),
    paddingBottom: moderateScale(15),
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
    width: moderateScale(270),
    height: moderateScale(240),
    backgroundColor: "#FFF",
  },
  modal: {
    position: "absolute",
    width: "100.4%",
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(50),
    top: moderateScale(0),
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
    backgroundColor: "black",
  },
});

export default Habits;

import React, { useState, useImperativeHandle, forwardRef } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Task from "./Task";
import { Button, IconButton, TextInput } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import { RootContext } from "../config/RootContext";

const Todo = forwardRef((props, ref) => {
  const [task, setTask] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const { testData, setTestData, textTheme } = React.useContext(RootContext);

  const setToDoItem = async (title) => {
    let newData = [
      ...testData,
      { title: title, completed: false, id: Math.random() },
    ];
    await AsyncStorage.setItem("ToDoItems", JSON.stringify(newData));
    setTestData(newData);
  };

  useImperativeHandle(ref, () => ({
    openModal: () => {
      setModalVisible(true);
    },
  }));

  const deleteToDoItem = async (item) => {
    let newDataArray = testData.filter((obj) => obj.id != item.id);
    await AsyncStorage.setItem("ToDoItems", JSON.stringify(newDataArray));
    setTestData(newDataArray);
  };

  const handleAddTask = async (title) => {
    setToDoItem(title);
    setTask(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={modalVisible}
        animationIn="bounceIn"
        animationOut="bounceOut"
        useNativeDriver
        hideModalContentWhileAnimating
        onBackdropPress={() => setModalVisible(false)}
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
              Add Task
            </Text>
          </View>
          <TextInput
            label="Task Title"
            mode="outlined"
            style={{ width: moderateScale(190) }}
            value={task}
            activeOutlineColor="#55BCF6"
            onChangeText={(text) => setTask(text)}
          />
          <Button
            mode="contained"
            onPress={() => handleAddTask(task)}
            style={{
              position: "absolute",
              left: moderateScale(200),
              top: moderateScale(190),
              backgroundColor: "#55BCF6",
            }}
          >
            Add
          </Button>
        </View>
      </Modal>
      {testData != null ? (
        testData.map((item) => {
          return (
            <TouchableWithoutFeedback key={item.id}>
              <Task
                text={item.title}
                item={item}
                completed={item.completed}
                id={item.id}
                deleteitem={deleteToDoItem}
              />
            </TouchableWithoutFeedback>
          );
        })
      ) : (
        <></>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: moderateScale(22),
    paddingTop: moderateScale(10),
    fontWeight: "bold",
    paddingLeft: moderateScale(18),
    paddingRight: moderateScale(9),
  },
  groupRow: {
    flexDirection: "row",
  },
  modalBackground: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
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

export default Todo;

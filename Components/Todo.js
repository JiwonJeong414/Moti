import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Task from "./Task";
import { Button, IconButton, TextInput } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import { Swipeable } from "react-native-gesture-handler";

const Todo = ({ widgetTitle }) => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const retrieveToDoItems = async () => {
      let retrieveData = await AsyncStorage.getItem("ToDoItems");
      retrieveData = JSON.parse(retrieveData);
      if (retrieveData == null) setTaskItems([]);
      else setTaskItems(retrieveData.tasks);
    };
    retrieveToDoItems();
  }, []);

  const setToDoItem = async (title) => {
    let newData = { tasks: [...taskItems, title] };
    await AsyncStorage.setItem("ToDoItems", JSON.stringify(newData));
    setTaskItems(newData.tasks);
  };

  const deleteToDoItem = async (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    await AsyncStorage.setItem("ToDoItems", JSON.stringify(itemsCopy));
    setTaskItems(itemsCopy);
  };

  const handleAddTask = (title) => {
    setLoading(true);
    console.log("title: " + title);
    setToDoItem(title);
    setTask(null);
    setLoading(false);
    setModalVisible(false);
  };

  const handleModal = () => {
    setTask(null);
    setModalVisible(true);
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator
          style={{
            zIndex: 999,
            position: "absolute",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            backgroundColor: "lightgray",
            opacity: 0.3,
          }}
          animating={loading}
          color={"black"}
        />
      ) : (
        <></>
      )}
      <View style={styles.container}>
        <View style={styles.groupRow}>
          <Text style={styles.sectionTitle}> {widgetTitle}</Text>
          <IconButton
            icon="sticker-plus"
            onPress={handleModal}
            style={{
              right: moderateScale(15),
              marginBottom: moderateScale(-8),
              bottom: moderateScale(8),
            }}
          />
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
              <TextInput
                label="Task Title"
                mode="outlined"
                style={{ width: moderateScale(245) }}
                value={task}
                onChangeText={(text) => setTask(text)}
              />
              <Button
                mode="contained"
                onPress={() => handleAddTask(task)}
                style={{
                  position: "absolute",
                  left: moderateScale(200),
                  top: moderateScale(190),
                }}
              >
                Add
              </Button>
            </View>
          </Modal>
        </View>
        {taskItems != null ? (
          taskItems.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => deleteToDoItem(item)}
              >
                <Task
                  text={item}
                  renderRightActions={() => (
                    <View
                      style={{
                        backgroundColor: "red",
                        width: 70,
                      }}
                    ></View>
                  )}
                />
              </TouchableOpacity>
            );
          })
        ) : (
          <></>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 40,
    backgroundColor: "dodgerblue",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 10,
  },
  groupRow: {
    flexDirection: "row",
  },
  closeButton: {
    width: 140,
    height: 55,
    top: 490,
    left: 180,
    borderRadius: 20,
    backgroundColor: "#553AF6",
    position: "absolute",
  },
  modalBackground: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    borderRadius: 10,
    width: "80%",
    height: "30%",
    backgroundColor: "#FFF",
  },
  addTodo: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Todo;

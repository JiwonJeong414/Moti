import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Modal,
  Button,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Task from "./Task";

const Todo = ({ widgetTitle }) => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const retrieveToDoItems = async () => {
      let retrieveData = await AsyncStorage.getItem("ToDoItems").then(
        console.log("retrieved")
      );
      retrieveData = JSON.parse(retrieveData);
      if (retrieveData == null) setTaskItems([]);
      else setTaskItems(retrieveData.tasks);
    };
    retrieveToDoItems();
    console.log("called");
  }, []);

  const setToDoItem = async (title) => {
    let newData = { tasks: [...taskItems, title] };
    await AsyncStorage.setItem("ToDoItems", JSON.stringify(newData));
    setTaskItems(newData.tasks);
  };

  const deleteToDoItem = async (deleteTitle) => {
    let newDataArray = taskItems.filter((title) => title != deleteTitle);
    let newDataObject = { tasks: newDataArray };
    await AsyncStorage.setItem("ToDoItems", JSON.stringify(newDataObject));
    setTaskItems(newDataArray);
  };

  const handleAddTask = (title) => {
    setLoading(true);
    setToDoItem(title);
    setTask(null);
    setLoading(false);
    setModalVisible(false);
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
          <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
            <View style={styles.addButton}></View>
          </TouchableWithoutFeedback>
          <Modal transparent visible={modalVisible} animationType="fade">
            <View style={styles.modalBackground}>
              <TextInput
                style={styles.modalHeader}
                placeholder="Type your todos here"
                placeholderTextColor={"gray"}
                value={task}
                onChangeText={(text) => setTask(text)}
              />
            </View>
            <View style={styles.closeButton} />
            <TouchableWithoutFeedback onPress={() => handleAddTask(task)}>
              <View style={styles.closeButton}></View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
        {console.log(taskItems)}
        {taskItems != null ? (
          taskItems.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => deleteToDoItem(item)}
              >
                <Task text={item} />
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
    top: 510,
    left: 210,
    borderRadius: 20,
    backgroundColor: "#553AF6",
    position: "absolute",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0,0,0.5)",
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

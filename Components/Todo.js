import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Task from "./Task";
import { Button, IconButton, TextInput } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import { Swipeable } from "react-native-gesture-handler";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import ListItemDeleteAction from "./ListItemDeleteAction";
import TaskTestTwo from "./TaskTestTwo";

const Todo = ({ widgetTitle }) => {
  const [task, setTask] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    const retrieveToDoItems = async () => {
      let retrieveData = await AsyncStorage.getItem("ToDoItems");
      retrieveData = JSON.parse(retrieveData);
      if (retrieveData == null) setTestData([]);
      else setTestData(retrieveData);
      console.log(retrieveData);
    };
    retrieveToDoItems();
  }, []);

  const setToDoItem = async (title) => {
    let newData = [...testData, { title: title, id: Math.random() }];
    await AsyncStorage.setItem("ToDoItems", JSON.stringify(newData));
    setTestData(newData);
  };

  const deleteToDoItem = async (item) => {
    let newDataArray = testData.filter((obj) => obj.id != item.id);
    await AsyncStorage.setItem("ToDoItems", JSON.stringify(newDataArray));
    setTestData(newDataArray);
  };

  const handleAddTask = (title) => {
    setLoading(true);
    setToDoItem(title);
    setTask(null);
    setLoading(false);
    setModalVisible(false);
  };

  const handleModal = () => {
    setTask(null);
    setModalVisible(true);
  };

  const handleDelete = (item, index) => {
    deleteToDoItem(item);
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
              top: moderateScale(2),
            }}
          />
        </View>
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
        {testData != null ? (
          testData.map((item) => {
            return (
              <TouchableWithoutFeedback key={item.id}>
                <Task
                  text={item.title}
                  item={item}
                  deleteitem={deleteToDoItem}
                />
              </TouchableWithoutFeedback>
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

import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
} from "react-native";
import Task from "../Components/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Todo from "../Components/Todo";
import CustomDatePicker from "../Components/CustomDatePicker";
import BannerAndIcon from "../Components/BannerAndIcon";
import Quotes from "../Components/Quotes";
import { RootContext } from "../config/RootContext";
import ListItemDeleteAction from "../Components/ListItemDeleteAction";
import { moderateScale } from "react-native-size-matters";
import { Button, IconButton, TextInput } from "react-native-paper";
import Modal from "react-native-modal";

const HomeScreen = ({ navigation, route }) => {
  const [myName, setMyName] = useState();
  const { onboarded, colorTheme } = React.useContext(RootContext);
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
    };
    retrieveToDoItems();
  }, []);

  const setToDoItem = async (title) => {
    let newData = [...testData, { title: title }];
    await AsyncStorage.setItem("ToDoItems", JSON.stringify(newData));
    setTestData(newData);
  };

  const deleteToDoItem = async (index) => {
    let itemsCopy = [...testData];
    itemsCopy.splice(index, 1);
    await AsyncStorage.setItem("ToDoItems", JSON.stringify(itemsCopy));
    setTestData(itemsCopy);
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
    deleteToDoItem(index);
  };

  useEffect(() => {
    const getName = async () => {
      let userName = await AsyncStorage.getItem("Name");
      userName = JSON.parse(userName);
      setMyName(userName);
    };
    getName();
  }, [onboarded]);

  return (
    <FlatList
      style={{ backgroundColor: colorTheme.primary }}
      ListHeaderComponent={
        <View
          style={[styles.container, { backgroundColor: colorTheme.primary }]}
        >
          <BannerAndIcon />
          <Quotes />
          <Text style={styles.text}>{myName}'s Dashboard</Text>
          <CustomDatePicker widgetTitle="Events" />
          <View style={styles.groupRow}>
            <Text style={styles.sectionTitle}> Tasks</Text>
            <IconButton
              icon="sticker-plus"
              onPress={handleModal}
              style={{
                right: moderateScale(15),
                marginBottom: moderateScale(-8),
                bottom: moderateScale(8),
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
        </View>
      }
      data={testData}
      renderItem={({ item, index }) => (
        <Task
          text={item.title}
          renderRightActions={() => (
            <ListItemDeleteAction onPress={() => handleDelete(item, index)} />
          )}
        />
      )}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    left: 10,
    paddingTop: 10,
  },
  row: {
    flexDirection: "row",
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

export default HomeScreen;

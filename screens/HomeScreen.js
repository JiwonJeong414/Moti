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
import Quotes from "../Components/Quotes";
import BannerAndIcon from "../Components/BannerAndIcon";
import { RootContext } from "../config/RootContext";
import ListItemDeleteAction from "../Components/ListItemDeleteAction";
import { moderateScale } from "react-native-size-matters";
import Modal from "react-native-modal";
import Habits from "../Components/Habits";
import SettingModal from "../Components/SettingModal";
import { Button, IconButton, TextInput } from "react-native-paper";
import {
  NotoSans_400Regular,
  NotoSans_700Bold,
  useFonts,
} from "@expo-google-fonts/noto-sans";

const HomeScreen = ({ navigation, route }) => {
  const [myName, setMyName] = useState();
  const { onboarded, colorTheme } = React.useContext(RootContext);
  const [task, setTask] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testData, setTestData] = useState([]);

  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

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

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colorTheme.primary }}>
      <FlatList
        style={{ backgroundColor: colorTheme.primary }}
        ListHeaderComponent={
          <View>
            <View
              style={[
                styles.container,
                { backgroundColor: colorTheme.primary },
              ]}
            >
              <BannerAndIcon />
              <SettingModal navigation={navigation} />
              <Quotes />
            </View>
            <View
              style={[
                styles.dashboard,
                { backgroundColor: colorTheme.neutral, flex: 1 },
              ]}
            >
              <Text style={styles.myName}>Hi {myName}</Text>
              <View style={styles.divider}></View>
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
          </View>
        }
        data={testData}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: moderateScale(380),
              height: moderateScale(65),
              backgroundColor: colorTheme.neutral,
            }}
          >
            <Task
              text={item.title}
              renderRightActions={() => (
                <ListItemDeleteAction
                  onPress={() => handleDelete(item, index)}
                />
              )}
            />
          </View>
        )}
        ListFooterComponent={
          <View
            style={{
              width: moderateScale(380),
              backgroundColor: colorTheme.neutral,
              borderBottomLeftRadius: moderateScale(49),
              borderBottomRightRadius: moderateScale(49),
            }}
          >
            <Habits widgetTitle="Habits" />
          </View>
        }
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  myName: {
    fontSize: moderateScale(35),
    textAlign: "left",
    fontFamily: "NotoSans_700Bold",
    left: moderateScale(24),
    paddingTop: moderateScale(24),
  },
  divider: {
    width: moderateScale(327),
    left: moderateScale(24),
    height: moderateScale(1),
    backgroundColor: "gray",
    marginTop: moderateScale(5),
  },
  row: {
    flexDirection: "row",
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
  dashboard: {
    width: moderateScale(380),
    borderTopLeftRadius: moderateScale(49),
    borderTopRightRadius: moderateScale(49),
  },
});

export default HomeScreen;

import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
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
import Tasktest from "../Components/Tasktest";
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
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: colorTheme.primary }}>
        <View>
          <View
            style={[styles.container, { backgroundColor: colorTheme.primary }]}
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
            <Todo widgetTitle="Todo" />
            <Habits widgetTitle="Habits" />
          </View>
        </View>
      </View>
    </ScrollView>
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

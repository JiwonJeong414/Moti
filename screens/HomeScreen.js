import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
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

const HomeScreen = ({ navigation, route }) => {
  const [myName, setMyName] = useState();
  const { onboarded, colorTheme } = React.useContext(RootContext);

  useEffect(() => {
    const getName = async () => {
      let userName = await AsyncStorage.getItem("Name");
      userName = JSON.parse(userName);
      setMyName(userName);
    };
    getName();
  }, [onboarded]);

  return (
    // <View style={[styles.container, { backgroundColor: colorTheme.primary }]}>
    //   <View>
    //     <BannerAndIcon />
    //     <View style={styles.quotes}>
    //       <Quotes />
    //     </View>
    //     <View style={styles.row}>
    //       <Text style={styles.text}> {myName}'s Dashboard </Text>
    //     </View>
    //     <CustomDatePicker widgetTitle="Events" />
    //     <Todo widgetTitle="Today's Tasks" />
    //   </View>
    // </View>
    <View style={[styles.container, { backgroundColor: colorTheme.primary }]}>
      <BannerAndIcon />
      <Quotes />
      <Text style={styles.text}>{myName}'s Dashboard</Text>
      <CustomDatePicker widgetTitle="Events" />
      <Todo widgetTitle="Today's Tasks" />
    </View>
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
});

export default HomeScreen;

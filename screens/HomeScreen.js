import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
  Button,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import Task from "../Components/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Todo from "../Components/Todo";
import CustomDatePicker from "../Components/CustomDatePicker";
import BannerAndIcon from "../Components/BannerAndIcon";
import colorsContext from "../config/colorsContext";
import colors from "../config/colors";
import TemplateColors from "./TemplateColorsScreen";
import Quotes from "../Components/Quotes";
import { RootContext } from "../config/RootContext";

const HomeScreen = ({ navigation, route }) => {
  const theme = useContext(colorsContext);
  const [myName, setMyName] = useState();
  const { onboarded, setOnboard, colorTheme } = React.useContext(RootContext);

  useEffect(() => {
    const getName = async () => {
      let userName = await AsyncStorage.getItem("Name");
      userName = JSON.parse(userName);
      setMyName(userName);
    };
    getName();
  }, [onboarded]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colorTheme.primary }]}
    >
      <View>
        <BannerAndIcon />
        {/* Quotes */}
        <View style={styles.quotes}>
          <Quotes />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}> {myName}'s Dashboard </Text>
        </View>
        <CustomDatePicker widgetTitle="Events" />
        <Todo widgetTitle="Today's Tasks" />
      </View>
    </ScrollView>
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
  quotes: {
    paddingLeft: 10,
    marginTop: -10,
  },
  words: {
    fontSize: 25,
    fontStyle: "italic",
    fontFamily: "Baskerville-Bold",
    color: "darkblue",
  },
  row: {
    flexDirection: "row",
  },
  words2: {
    fontSize: 25,
    fontStyle: "italic",
    fontFamily: "Baskerville-Bold",
    color: "darkblue",
    marginLeft: 180,
  },
  deleteAccount: {
    width: 30,
    height: 30,
    backgroundColor: "purple",
    marginLeft: 20,
    top: 10,
  },
});

export default HomeScreen;

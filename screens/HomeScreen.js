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
import colorsContext from "../config/colorsContext";
import colors from "../config/colors";
import Quotes from "../Components/Quotes";
import { RootContext } from "../config/RootContext";
import { TextInput } from "react-native-paper";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";
import ListItemDeleteAction from "../Components/ListItemDeleteAction";

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

  const DATA = [
    {
      id: 1,
      title: "First Item",
    },
    {
      id: 2,
      title: "Second Item",
    },
    {
      id: 3,
      title: "Third Item",
    },
  ];

  const [taskTests, setTaskTest] = useState(DATA);

  const handleDelete = (taskTest) => {
    setTaskTest(taskTests.filter((t) => t.id !== taskTest.id));
  };

  const renderItem = ({ item }) => <Item title={item.title} />;

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={
        <View
          style={[styles.container, { backgroundColor: colorTheme.primary }]}
        >
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
      }
      data={taskTests}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Task
          renderRightActions={() => (
            <ListItemDeleteAction onPress={() => handleDelete(item)} />
          )}
        />
      )}
    />
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
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default HomeScreen;

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { moderateScale } from "react-native-size-matters";
import {
  NotoSans_400Regular,
  NotoSans_700Bold,
  useFonts,
} from "@expo-google-fonts/noto-sans";
import { AntDesign } from "@expo/vector-icons";
import ListItemDeleteAction from "./ListItemDeleteAction";
import { RootContext } from "../config/RootContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Task = ({ text, item, completed, id, deleteitem }) => {
  const { colorTheme, testData, textTheme } = React.useContext(RootContext);
  const [completedVisible, setCompletedVisible] = useState(completed);

  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  useEffect(() => {
    const retrieveTodoItems = async () => {
      let retrieveData = await AsyncStorage.getItem("ToDoItems");
      retrieveData = JSON.parse(retrieveData);
      let objIndex = retrieveData.findIndex((obj) => obj.id === id);
      setCompletedVisible(retrieveData[objIndex].completed);
    };
    retrieveTodoItems();
  }, []);

  const handleComplete = async () => {
    let testArray = testData;
    let objIndex = testData.findIndex((obj) => obj.id === id);
    testArray[objIndex].completed = !completedVisible;
    setCompletedVisible(!completedVisible);
    await AsyncStorage.setItem("ToDoItems", JSON.stringify(testArray));
  };

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <Swipeable
      renderRightActions={() => (
        <ListItemDeleteAction onPress={() => deleteitem(item)} />
      )}
    >
      <View
        style={[
          styles.item,
          {
            borderColor: colorTheme.accents,
            backgroundColor: colorTheme.primary,
          },
        ]}
      >
        <View style={styles.itemLeft}>
          <TouchableWithoutFeedback onPress={handleComplete}>
            <View hitSlop={10}>
              <View
                style={[
                  styles.square,
                  {
                    borderColor: colorTheme.accents,
                  },
                ]}
              >
                {completedVisible === true ? (
                  <AntDesign
                    name="close"
                    size={moderateScale(23)}
                    style={{
                      color: colorTheme.neutral,
                      right: moderateScale(2),
                      bottom: moderateScale(2),
                    }}
                  />
                ) : (
                  <></>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
          {completedVisible === true ? (
            <Text
              style={[
                styles.itemText,
                {
                  textDecorationLine: "line-through",
                  textDecorationColor: colorTheme.accents,
                  color: textTheme.text,
                },
              ]}
            >
              {text}
            </Text>
          ) : (
            <Text style={[styles.itemText, { color: textTheme.text }]}>
              {text}
            </Text>
          )}
        </View>
        <View
          style={[styles.circular, { borderColor: colorTheme.accents }]}
        ></View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: moderateScale(14),
    left: moderateScale(18),
    top: moderateScale(9),
    width: "90.5%",
    borderRadius: moderateScale(10),
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: moderateScale(14),
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: moderateScale(25),
    height: moderateScale(25),
    alignItems: "center",
    borderWidth: moderateScale(3),
    borderRadius: moderateScale(3),
    marginRight: moderateScale(15),
  },
  itemText: {
    maxWidth: "85%",
    fontSize: moderateScale(16),
    fontFamily: "NotoSans_400Regular",
  },
  circular: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(5),
  },
});

export default Task;

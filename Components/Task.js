import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { moderateScale } from "react-native-size-matters";
import {
  NotoSans_400Regular,
  NotoSans_700Bold,
  useFonts,
} from "@expo-google-fonts/noto-sans";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
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

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    const opacity = dragX.interpolate({
      inputRange: [-100, -20],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.deleteContainer,
          {
            opacity: trans,
            transform: [{ scale: trans }],
          },
        ]}
      >
        <Animated.View style={[styles.deleteIconContainer, { opacity }]}>
          <MaterialCommunityIcons
            name="delete-outline"
            size={24}
            color="#E4D5B7"
          />
        </Animated.View>
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableRightOpen={() => deleteitem(item)}
        overshootRight={false}
        rightThreshold={40}
      >
        <Animated.View
          style={[
            styles.item,
            {
              backgroundColor: colorTheme.primary,
              borderRadius: moderateScale(16),
            },
          ]}
        >
          <View style={styles.itemLeft}>
            <TouchableWithoutFeedback onPress={handleComplete}>
              <View style={styles.checkboxContainer}>
                <View
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: completedVisible
                        ? "#7C4DFF"
                        : "transparent",
                      borderColor: completedVisible ? "#7C4DFF" : "#8B8FA3",
                    },
                  ]}
                >
                  {completedVisible && (
                    <AntDesign name="check" size={16} color="#FFFFFF" />
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
            <Text
              style={[
                styles.itemText,
                {
                  color: "#E4D5B7",
                  textDecorationLine: completedVisible
                    ? "line-through"
                    : "none",
                  opacity: completedVisible ? 0.6 : 1,
                },
              ]}
            >
              {text}
            </Text>
          </View>
        </Animated.View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: moderateScale(16),
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScale(6),
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    marginRight: moderateScale(12),
  },
  checkbox: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(6),
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    fontSize: moderateScale(16),
    fontFamily: "NotoSans_400Regular",
    flex: 1,
  },
  deleteContainer: {
    marginRight: moderateScale(20),
    alignItems: "flex-end",
    justifyContent: "center",
    paddingLeft: moderateScale(16),
  },
  deleteIconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: "#252D3D",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default Task;

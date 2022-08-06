import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { RootContext } from "../config/RootContext";
import { moderateScale } from "react-native-size-matters";
import {
  NotoSans_400Regular,
  NotoSans_700Bold,
  useFonts,
} from "@expo-google-fonts/noto-sans";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const TaskTestTwo = () => {
  const { colorTheme } = React.useContext(RootContext);
  const [completedVisible, setCompletedVisible] = useState(false);

  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  const handleComplete = () => {
    setCompletedVisible(!completedVisible);
  };

  return (
    <View>
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
                  size={moderateScale(20)}
                  style={{ right: moderateScale(2), bottom: moderateScale(2) }}
                />
              ) : (
                <></>
              )}
            </View>
          </TouchableWithoutFeedback>
          {completedVisible === true ? (
            <Text
              style={[styles.itemText, { textDecorationLine: "line-through" }]}
            >
              TESTTTT
            </Text>
          ) : (
            <Text style={styles.itemText}>TESTTTT</Text>
          )}
        </View>
        <View
          style={[styles.circular, { borderColor: colorTheme.accents }]}
        ></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    left: 20,
    top: 10,
    width: 380,
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: moderateScale(22),
    height: moderateScale(22),
    alignItems: "center",
    borderWidth: moderateScale(3),
    borderRadius: moderateScale(3),
    marginRight: moderateScale(15),
  },
  itemText: {
    maxWidth: "100%",
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

export default TaskTestTwo;

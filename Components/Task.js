import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { RootContext } from "../config/RootContext";
import { moderateScale } from "react-native-size-matters";
import {
  NotoSans_400Regular,
  NotoSans_700Bold,
  useFonts,
} from "@expo-google-fonts/noto-sans";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import ListItemDeleteAction from "./ListItemDeleteAction";

const Task = ({ text, item, deleteitem }) => {
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
              {text}
            </Text>
          ) : (
            <Text style={styles.itemText}>{text}</Text>
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
    width: moderateScale(345),
    borderRadius: moderateScale(10),
    shadowOpacity: 0.3,
    shadowRadius: 4,
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

export default Task;

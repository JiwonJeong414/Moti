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

const Task = ({ text, renderRightActions }) => {
  const [completedVisible, setCompletedVisible] = useState(false);
  const handleComplete = () => {
    setCompletedVisible(!completedVisible);
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <TouchableWithoutFeedback onPress={handleComplete}>
            <View style={styles.square}>
              {completedVisible === true ? (
                <AntDesign
                  name="close"
                  size={30}
                  style={{ right: 2.5, bottom: 2.5 }}
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
        <View style={styles.circular}></View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  item: {
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#FFF",
    padding: 15,
    left: 20,
    width: 380,
    borderRadius: 10,
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
    width: 24,
    height: 24,
    alignItems: "center",
    backgroundColor: "#55BCF6",
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task;

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

const Event = ({ text, title, renderRightActions }) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.text}> </Text>
        <Text style={styles.itemText}>{title}</Text>
      </View>
      <View style={styles.itemLeft}>
        <View style={styles.circular}></View>
        {text > 1 ? (
          <Text style={styles.left}>{text} Days Left</Text>
        ) : text === 0 ? (
          <Text style={styles.left}>D-Day</Text>
        ) : text < 1 ? (
          <Text style={styles.left}>{Math.abs(text)} Days Ago</Text>
        ) : text === 1 ? (
          <Text style={styles.left}>{text} Day Left </Text>
        ) : (
          <Text style={styles.left}>{Math.abs(text)} Day Ago </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    left: 20,
    width: 380,
    height: 120,
    borderRadius: 10,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
  },
  square: {
    width: 15,
    height: 15,
    marginLeft: 85,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginTop: 10,
  },
  text: {
    fontSize: 35,
    fontWeight: "bold",
  },
  itemText: {
    maxWidth: "80%",
    paddingBottom: 10,
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 60,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 5,
  },
  left: {
    fontSize: 24,
  },
});

export default Event;

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Event = ({ text }) => {
  const calculateDate = (text) => {
    const today = new Date();
    const selectedDate = text.split("-");
    return Number(selectedDate[2]) - Number(today.getDate());
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.text}> </Text>
        <TextInput style={styles.itemText} placeholder="Event Title" />
      </View>
      <View style={styles.itemLeft}>
        <View style={styles.circular}></View>
        <Text style={styles.left}>{calculateDate(text)} Days Left</Text>
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

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Banner = ({ color, name }) => {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.title}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "10%",
    width: "90%",
    borderWidth: 1,
    borderRadius: 25,
    alignItems: "center",
    padding: 15,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
  },
});

export default Banner;

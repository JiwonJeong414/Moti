import React from "react";
import { View, Text, StyleSheet, Button, SafeAreaView } from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";

const HotlineScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.sectionTitle}>My Hotlines</Text>
      <Text style={styles.sectionTitle}>Default Hotlines</Text>
      <View style={styles.addWrapper}>
        <Feather name="plus" size={35} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "dodgerblue",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 10,
  },
  addWrapper: {
    position: "absolute",
    bottom: 20,
    left: 330,
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 3,
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default HotlineScreen;

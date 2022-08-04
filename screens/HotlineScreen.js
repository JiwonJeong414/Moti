import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import { RootContext } from "../config/RootContext";
import call from "react-native-phone-call";

const HotlineScreen = () => {
  const { colorTheme } = React.useContext(RootContext);

  const imagePick = () => {};

  const args = {
    number: "9492998258", // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.sectionTitle}>My Hotlines</Text>
      <Text style={styles.sectionTitle}>Default Hotlines</Text>
      <TouchableWithoutFeedback onPress={() => call(args)}>
        <View
          style={[
            styles.item,
            {
              borderColor: colorTheme.accents,
              backgroundColor: colorTheme.neutral,
            },
          ]}
        >
          <View style={styles.itemLeft}>
            <View
              style={[
                styles.square,
                {
                  backgroundColor: colorTheme.accents,
                },
              ]}
            ></View>
          </View>
          <View
            style={[styles.circular, { borderColor: colorTheme.accents }]}
          ></View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={imagePick}>
        <View
          style={[
            styles.item,
            {
              borderColor: colorTheme.accents,
              backgroundColor: colorTheme.neutral,
            },
          ]}
        >
          <View style={styles.itemLeft}>
            <View
              style={[
                styles.square,
                {
                  backgroundColor: colorTheme.accents,
                },
              ]}
            ></View>
          </View>
          <View
            style={[styles.circular, { borderColor: colorTheme.accents }]}
          ></View>
        </View>
      </TouchableWithoutFeedback>
      <TextInput
        placeholder="Type"
        placeholderTextColor="gray"
        style={{ left: 40 }}
        keyboardType="number-pad"
      ></TextInput>
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
  item: {
    borderWidth: 2,
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
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "100%",
    fontSize: 20,
    fontWeight: "bold",
  },
  circular: {
    width: 12,
    height: 12,
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default HotlineScreen;

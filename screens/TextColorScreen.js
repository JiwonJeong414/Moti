import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { RadioButton } from "react-native-paper";
import { RootContext } from "../config/RootContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale } from "react-native-size-matters";

const TextColorScreen = () => {
  const { textTheme, setTextTheme } = React.useContext(RootContext);
  const [selectedOption, setSelectedOption] = useState(
    textTheme.text === "black" && textTheme.quote === "white"
      ? "option1"
      : "option2"
  );

  const handleOptionChange = async (option) => {
    setSelectedOption(option);

    const newTextTheme =
      option === "option1"
        ? { text: "black", quote: "white" }
        : { text: "white", quote: "black" };

    setTextTheme(newTextTheme);

    // Save text and quote colors to AsyncStorage
    await AsyncStorage.setItem("TextTheme", JSON.stringify(newTextTheme));
  };

  return (
    <ScrollView>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.header}>Choose Text and Quote Colors</Text>
      </View>
      <RadioButton.Item
        label="Option 1 (Text: Black, Quote: White)"
        value="option1"
        status={selectedOption === "option1" ? "checked" : "unchecked"}
        onPress={() => handleOptionChange("option1")}
      />
      <RadioButton.Item
        label="Option 2 (Text: White, Quote: Black)"
        value="option2"
        status={selectedOption === "option2" ? "checked" : "unchecked"}
        onPress={() => handleOptionChange("option2")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: moderateScale(15),
    fontSize: moderateScale(30),
    fontWeight: "bold",
  },
});

export default TextColorScreen;

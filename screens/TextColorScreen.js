import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { RadioButton } from "react-native-paper";
import { RootContext } from "../config/RootContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale } from "react-native-size-matters";

const TextColorScreen = () => {
  const { textTheme, setTextTheme } = React.useContext(RootContext);

  const [textColor, setTextColor] = useState(textTheme.text);
  const [quoteColor, setQuoteColor] = useState(textTheme.quote);

  const handleTextCheck = async (name) => {
    await AsyncStorage.setItem("Text", JSON.stringify(name));
    setTextColor(name);
    let textTheme = {
      text: name,
      quote: quoteColor,
    };
    setTextTheme(textTheme);
  };

  const handleQuoteCheck = async (name) => {
    await AsyncStorage.setItem("Quotes", JSON.stringify(name));
    setQuoteColor(name);
    let textTheme = {
      text: textColor,
      quote: name,
    };
    setTextTheme(textTheme);
  };

  return (
    <ScrollView>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            marginTop: moderateScale(15),
            fontSize: moderateScale(30),
            fontWeight: "bold",
          }}
        >
          Text
        </Text>
      </View>
      <RadioButton.Item
        value="black"
        label="Black"
        status={textColor === "black" ? "checked" : "unchecked"}
        onPress={() => handleTextCheck("black")}
      />
      <RadioButton.Item
        value="white"
        label="White"
        status={textColor === "white" ? "checked" : "unchecked"}
        onPress={() => handleTextCheck("white")}
      />
      <RadioButton.Item
        value="red"
        label="Red"
        status={textColor === "red" ? "checked" : "unchecked"}
        onPress={() => handleTextCheck("red")}
      />
      <RadioButton.Item
        value="blue"
        label="Blue"
        status={textColor === "blue" ? "checked" : "unchecked"}
        onPress={() => handleTextCheck("blue")}
      />
      <RadioButton.Item
        value="green"
        label="Green"
        status={textColor === "green" ? "checked" : "unchecked"}
        onPress={() => handleTextCheck("green")}
      />
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            marginTop: moderateScale(15),
            fontSize: moderateScale(30),
            fontWeight: "bold",
          }}
        >
          Quote
        </Text>
      </View>
      <RadioButton.Item
        value="black"
        label="Black"
        status={quoteColor === "black" ? "checked" : "unchecked"}
        onPress={() => handleQuoteCheck("black")}
      />
      <RadioButton.Item
        value="white"
        label="White"
        status={quoteColor === "white" ? "checked" : "unchecked"}
        onPress={() => handleQuoteCheck("white")}
      />
      <RadioButton.Item
        value="red"
        label="Red"
        status={quoteColor === "red" ? "checked" : "unchecked"}
        onPress={() => handleQuoteCheck("red")}
      />
      <RadioButton.Item
        value="blue"
        label="Blue"
        status={quoteColor === "blue" ? "checked" : "unchecked"}
        onPress={() => handleQuoteCheck("blue")}
      />
      <RadioButton.Item
        value="green"
        label="Green"
        status={quoteColor === "green" ? "checked" : "unchecked"}
        onPress={() => handleQuoteCheck("green")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default TextColorScreen;

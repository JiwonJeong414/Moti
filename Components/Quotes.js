import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import quotes from "../quotes.json";

const Quotes = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {}, []);

  console.log(JSON.stringify(quotes));

  return (
    <View>
      <Text style={styles.words}>
        "When you have a dream, you've got to grab it and never let go."
      </Text>
      <Text style={styles.person}> — Carol Burnett</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  words: {
    fontSize: 25,
    fontStyle: "italic",
    fontFamily: "Baskerville-Bold",
    color: "darkblue",
  },
  person: {
    fontSize: 25,
    fontStyle: "italic",
    fontFamily: "Baskerville-Bold",
    color: "darkblue",
    marginLeft: 180,
  },
});

export default Quotes;

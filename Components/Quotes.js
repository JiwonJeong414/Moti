import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import quotes from "../quotes.json";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Quotes = () => {
  let DATA = [...quotes];

  const [idNumber, setIdNumber] = useState(1);
  const [quotesData, setQuotesData] = useState(DATA);

  useEffect(() => {
    const retrieveQuoteID = async () => {
      let retrieveQuoteID = await AsyncStorage.getItem("Number");
      retrieveQuoteID = JSON.parse(retrieveQuoteID);
      if (retrieveQuoteID === quotesData.length) handleIdNumber(0);
      else handleIdNumber(retrieveQuoteID);
    };
    retrieveQuoteID();
  }, []);

  const handleIdNumber = async (quoteID) => {
    await AsyncStorage.setItem("Number", JSON.stringify(quoteID + 1));
    setIdNumber(quoteID + 1);
  };

  let item = quotesData.find((item) => item.id === idNumber);

  return (
    <View style={styles.container}>
      <View style={styles.quotes}>
        <Text style={styles.words}>"{item.quote}"</Text>
        <Text style={styles.author}> — {item.person}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  words: {
    fontSize: moderateScale(22),
    fontStyle: "italic",
    fontFamily: "Baskerville-Bold",
    color: "darkblue",
  },
  quotes: {
    paddingLeft: moderateScale(5),
    marginTop: moderateScale(42),
  },
  author: {
    fontSize: moderateScale(22),
    fontStyle: "italic",
    fontFamily: "Baskerville-Bold",
    color: "darkblue",
    marginLeft: moderateScale(140),
    marginBottom: moderateScale(-10),
  },
});

export default Quotes;

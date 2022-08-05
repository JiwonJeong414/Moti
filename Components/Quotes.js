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
import {
  NotoSans_400Regular,
  NotoSans_700Bold,
  useFonts,
} from "@expo-google-fonts/noto-sans";

const Quotes = () => {
  let DATA = [...quotes];
  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  const [idNumber, setIdNumber] = useState(1);
  const [quotesData, setQuotesData] = useState(DATA);

  const handleIdNumber = async (quoteID) => {
    await AsyncStorage.setItem("Number", JSON.stringify(quoteID + 1));
    setIdNumber(quoteID + 1);
  };

  useEffect(() => {
    const retrieveQuoteID = async () => {
      let retrieveQuoteID = await AsyncStorage.getItem("Number");
      retrieveQuoteID = JSON.parse(retrieveQuoteID);
      if (retrieveQuoteID === quotesData.length) handleIdNumber(0);
      else handleIdNumber(retrieveQuoteID);
    };
    retrieveQuoteID();
  }, []);

  if (!fontsLoaded) {
    return <></>;
  }

  let item = quotesData.find((item) => item.id === idNumber);

  return (
    <View style={styles.container}>
      <View style={styles.quotes}>
        <Text style={styles.words}>"{item.quote}"</Text>
        <Text style={styles.author}>{item.person}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: moderateScale(10),
    marginRight: moderateScale(10),
  },
  words: {
    fontSize: moderateScale(16),
    fontFamily: "NotoSans_700Bold",
    color: "darkblue",
    textAlign: "center",
  },
  quotes: {
    paddingLeft: moderateScale(5),
  },
  author: {
    marginTop: moderateScale(15),
    marginBottom: moderateScale(15),
    fontSize: moderateScale(15),
    fontFamily: "NotoSans_400Regular",
    color: "darkblue",
    textAlign: "center",
  },
});

export default Quotes;

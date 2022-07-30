import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import quotes from "../quotes.json";

const Quotes = () => {
  const [isLoading, setLoading] = useState(true);
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((response) => response.json())
      .then((json) => setBackendData(json.movies))
      .catch((error) => alert(error))
      .then(setLoading(false));
  }, []);

  console.log(JSON.stringify(quotes));

  return (
    <View>
      <Text>{backendData}</Text>
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

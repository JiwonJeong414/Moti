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
    fetch("http://192.168.0.139:5000/api")
      .then((response) => response.json())
      .then((json) => setBackendData(json.movies))
      .catch((error) => alert(error))
      .then(setLoading(false));
  }, []);

  console.log(backendData);

  return (
    <View>
      <FlatList
        data={backendData}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <View style={{ paddingBottom: 10 }}>
            <Text style={styles.movieText}>
              {item.id}. {item.title}, {item.releaseYear}
            </Text>
          </View>
        )}
      />
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

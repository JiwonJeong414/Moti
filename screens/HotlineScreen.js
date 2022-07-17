import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const HotlineScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Hotline Screen</Text>
      <Button title="Hello"> test </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "dodgerblue",
  },
});

export default HotlineScreen;

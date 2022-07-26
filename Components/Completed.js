import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Completed = () => {
  return (
    <View styles={styles.container}>
      <MaterialCommunityIcons name="check" size={70} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Completed;

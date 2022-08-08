import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";

const Completed = () => {
  return (
    <View styles={styles.container}>
      <MaterialCommunityIcons name="check" size={moderateScale(63)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Completed;

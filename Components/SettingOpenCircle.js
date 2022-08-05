import React from "react";
import { View, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const SettingOpenCircle = () => {
  return (
    <View style={styles.row}>
      <View style={styles.circular} />
      <View style={[styles.circular, { marginLeft: moderateScale(3) }]} />
      <View style={[styles.circular, { marginLeft: moderateScale(4) }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  circular: {
    width: 10,
    height: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  row: {
    bottom: 5,
    flexDirection: "row",
  },
});

export default SettingOpenCircle;

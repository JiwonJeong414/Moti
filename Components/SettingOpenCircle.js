import React from "react";
import { View, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { RootContext } from "../config/RootContext";

const SettingOpenCircle = () => {
  const { colorTheme } = React.useContext(RootContext);

  return (
    <View style={styles.row}>
      <View style={[styles.circular, { borderColor: colorTheme.accents }]} />
      <View
        style={[
          styles.circular,
          { marginLeft: moderateScale(3), borderColor: colorTheme.accents },
        ]}
      />
      <View
        style={[
          styles.circular,
          { marginLeft: moderateScale(3.5), borderColor: colorTheme.accents },
        ]}
      />
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

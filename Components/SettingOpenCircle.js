import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { RootContext } from "../config/RootContext";

const SettingOpenCircle = () => {
  const { colorTheme } = React.useContext(RootContext);

  return (
    <View style={styles.row}>
      <View
        style={[
          styles.circular,
          { marginLeft: moderateScale(3), borderColor: colorTheme.accents },
        ]}
      />
      <View
        style={[
          styles.circular,
          { marginLeft: moderateScale(3), borderColor: colorTheme.accents },
        ]}
      />
      <View
        style={[
          styles.circular,
          { marginLeft: moderateScale(3), borderColor: colorTheme.accents },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  circular: {
    width: moderateScale(9),
    height: moderateScale(9),
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(9),
  },
  row: {
    flexDirection: "row",
    right: Platform.OS === "ios" ? moderateScale(2) : moderateScale(0),
  },
});

export default SettingOpenCircle;

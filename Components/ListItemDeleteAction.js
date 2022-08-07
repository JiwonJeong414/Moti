import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootContext } from "../config/RootContext";

function ListItemDeleteAction({ onPress }) {
  const { colorTheme } = React.useContext(RootContext);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          marginBottom: moderateScale(10),
          paddingRight: moderateScale(10),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="trash-can"
          size={moderateScale(35)}
          color={colorTheme.accents}
          style={{ top: moderateScale(10), right: moderateScale(5) }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 70,
  },
});

export default ListItemDeleteAction;

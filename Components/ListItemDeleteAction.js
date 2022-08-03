import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ListItemDeleteAction({ onPress }) {
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
          color="black"
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

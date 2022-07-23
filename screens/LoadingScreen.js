import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Dimensions,
} from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        style={{
          zIndex: 999,
          position: "absolute",
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
          backgroundColor: "gray",
          opacity: 0.3,
        }}
        animating={true}
        color={"black"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default LoadingScreen;

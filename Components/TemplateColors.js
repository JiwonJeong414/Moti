import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
  Button,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import Completed from "./Completed";
import { EventRegister } from "react-native-event-listeners";
import { ModeContext } from "../App";

const TemplateColors = () => {
  const [colorsModalVisible, setColorsModalVisible] = useState(false);
  const { mode, setMode } = useContext(ModeContext);

  const colorPicked = (color) => {
    setMode(color);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Colors"
        style={styles.button}
        onPress={() => setColorsModalVisible(true)}
      />
      <Modal visible={colorsModalVisible} animationType="slide">
        <View style={styles.modalBackground}>
          <Text style={styles.header}>Primary</Text>
          <TouchableWithoutFeedback onPress={() => colorPicked("white")}>
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "#f0f5fc",
                },
              ]}
            >
              {mode === "white" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => colorPicked("red")}>
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "red",
                },
              ]}
            >
              {mode === "red" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => colorPicked("blue")}>
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "blue",
                },
              ]}
            >
              {mode === "blue" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => setColorsModalVisible(false)}
          >
            <View style={styles.closeButton}></View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: -40,
    bottom: 40,
  },
  button: {
    width: 10,
    height: 40,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  closeButton: {
    width: 140,
    height: 55,
    top: 810,
    left: 240,
    borderRadius: 20,
    backgroundColor: "#553AF6",
    position: "absolute",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
  },
  pickedColor: {
    width: 70,
    height: 70,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TemplateColors;
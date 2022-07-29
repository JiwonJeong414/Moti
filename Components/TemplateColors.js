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
import ColorPicker from "react-native-wheel-color-picker";
import { EventRegister } from "react-native-event-listeners";
import { ModeContext } from "../App";

const TemplateColors = () => {
  const [colorsModalVisible, setColorsModalVisible] = useState(false);
  const { primary, setPrimary } = useContext(ModeContext);
  const { neutral, setNeutral } = useContext(ModeContext);
  const { accents, setAccents } = useContext(ModeContext);

  const colorPicked = (color) => {
    setPrimary(color);
  };

  const neutralColorPicked = (color) => {
    setNeutral(color);
  };

  const accentColorPicked = (color) => {
    setAccents(color);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Colors"
        style={styles.button}
        onPress={() => setColorsModalVisible(true)}
      />
      <Modal visible={colorsModalVisible} animationType="slide">
        <ColorPicker thumbSize={50} gapSize={16} sliderHidden={true} />
        <View style={[styles.modalBackground, { marginTop: 50 }]}>
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
              {primary === "white" ? <Completed /> : <></>}
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
              {primary === "red" ? <Completed /> : <></>}
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
              {primary === "blue" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback onPress={() => setColorsModalVisible(false)}>
          <View style={styles.closeButton}></View>
        </TouchableWithoutFeedback>

        <View style={styles.modalBackground}>
          <Text style={[styles.header, { marginRight: 10 }]}>Neutral</Text>
          <TouchableWithoutFeedback onPress={() => neutralColorPicked("white")}>
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "#f0f5fc",
                },
              ]}
            >
              {neutral === "white" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => neutralColorPicked("red")}>
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "red",
                },
              ]}
            >
              {neutral === "red" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => neutralColorPicked("blue")}>
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "blue",
                },
              ]}
            >
              {neutral === "blue" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.modalBackground}>
          <Text style={[styles.header, { marginRight: 1 }]}>Accents</Text>
          <TouchableWithoutFeedback onPress={() => accentColorPicked("white")}>
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "#f0f5fc",
                },
              ]}
            >
              {accents === "white" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => accentColorPicked("red")}>
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "red",
                },
              ]}
            >
              {accents === "red" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => accentColorPicked("blue")}>
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "blue",
                },
              ]}
            >
              {accents === "blue" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 10,
    height: 40,
  },
  modalBackground: {
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 20,
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
    marginLeft: 5,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TemplateColors;

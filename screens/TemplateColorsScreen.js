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
  TouchableHighlight,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import Completed from "../Components/Completed";
import ColorPicker from "react-native-wheel-color-picker";
import Modal from "react-native-modal";
import { EventRegister } from "react-native-event-listeners";
import { MaterialCommunityIcons, Entypo, AntDesign } from "@expo/vector-icons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Button } from "react-native-paper";
import { RootContext } from "../config/RootContext";

const TemplateColors = () => {
  const [colorsModalVisible, setColorsModalVisible] = useState(false);
  const [customVisible, setCustomVisible] = useState(false);
  const { colorTheme, setColorTheme } = React.useContext(RootContext);
  const [primary, setPrimary] = useState(colorTheme.primary);
  const [neutral, setNeutral] = useState(colorTheme.neutral);
  const [accents, setAccents] = useState(colorTheme.accents);

  const [customColor, setCustomColor] = useState("");
  const [customPicked, setCustomPicked] = useState("");

  useEffect(() => {
    let colorTheme = {
      primary: "",
      neutral: neutral,
      accents: accents,
    };
    if (primary == "white") {
      colorTheme.primary = "white";
    } else if (primary == "red") {
      colorTheme.primary = "red";
    } else if (primary == "blue") {
      colorTheme.primary = "blue";
    } else if (primary == "custom") {
      colorTheme.primary = customColor;
    }
    setColorTheme(colorTheme);
  }, [primary]);

  useEffect(() => {
    let colorTheme = {
      primary: primary,
      neutral: "",
      accents: accents,
    };
    if (neutral == "white") {
      colorTheme.neutral = "white";
    } else if (neutral == "red") {
      colorTheme.neutral = "red";
    } else if (neutral == "blue") {
      colorTheme.neutral = "blue";
    }
    setColorTheme(colorTheme);
  }, [neutral]);

  useEffect(() => {
    let colorTheme = {
      primary: primary,
      neutral: neutral,
      accents: "",
    };
    if (accents == "white") {
      colorTheme.accents = "white";
    } else if (accents == "red") {
      colorTheme.accents = "red";
    } else if (accents == "blue") {
      colorTheme.accents = "blue";
    }
    setColorTheme(colorTheme);
  }, [accents]);

  const colorPicked = (color) => {
    console.log("picked");
    setPrimary(color);
  };

  const neutralColorPicked = (color) => {
    setNeutral(color);
  };

  const accentColorPicked = (color) => {
    setAccents(color);
  };

  const handleCustomColor = (color) => {
    colorPicked("custom");
    setCustomPicked(color);
    setCustomVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.whiteBackground}>
        <View style={[styles.modalBackground, { marginTop: 50 }]}>
          <Text style={styles.header}>Primary</Text>
          <Modal isVisible={customVisible} style={styles.customModal}>
            <View style={styles.wheelBackground}>
              <View style={styles.test}>
                <ColorPicker
                  sliderSize={30}
                  gapSize={20}
                  thumbSize={25}
                  onColorChange={(color) => setCustomColor(color)}
                />
              </View>
              <Button
                mode="contained"
                color={customColor}
                onPress={() => handleCustomColor(customColor)}
                style={{ marginLeft: 220, top: 170, marginTop: 50 }}
              >
                Select
              </Button>
            </View>
          </Modal>
          <TouchableWithoutFeedback onPress={() => setCustomVisible(true)}>
            {primary === "custom" ? (
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: customPicked,
                  },
                ]}
              >
                <Completed />
              </View>
            ) : (
              <View
                style={[
                  styles.pickedColor,
                  { borderColor: "black", borderWidth: moderateScale(5) },
                ]}
              >
                <AntDesign name="plus" size={moderateScale(30)} color="black" />
              </View>
            )}
          </TouchableWithoutFeedback>
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
      </View>
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
  icon: {
    flexDirection: "row-reverse",
    marginLeft: 20,
    marginTop: -4,
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
  test: {
    bottom: 90,
    width: moderateScale(240),
  },
  whiteBackground: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "100%",
    height: "80%",
    backgroundColor: "#FFF",
  },
  wheelBackground: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "100%",
    height: "55%",
    backgroundColor: "#FFF",
  },
  customModal: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TemplateColors;

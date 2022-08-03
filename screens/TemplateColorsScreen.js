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
  const { colorTheme, setColorTheme } = React.useContext(RootContext);
  const [customVisible, setCustomVisible] = useState(false);
  const [primary, setPrimary] = useState(colorTheme.primary);
  const [neutral, setNeutral] = useState(colorTheme.neutral);
  const [accents, setAccents] = useState(colorTheme.accents);

  const [customColor, setCustomColor] = useState("");
  const [tempCustom, setTempCustom] = useState("");
  const [customPicked, setCustomPicked] = useState(""); //irrealvent for primary for now

  const initialCustom = () => {
    console.log(colorTheme.accent.charAt(0));
    if (colorTheme.accent.charAt(0) === "#") {
      return colorTheme.accent;
    } else {
      return "";
    }
  };

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
    let isCustom = false;
    if (accents == "#939597") {
      colorTheme.accents = "#939597";
    } else if (accents == "#F5DF4D") {
      colorTheme.accents = "#F5DF4D";
    } else if (accents == "#BE5B3E") {
      colorTheme.accents = "#BE5B3E";
    } else if (accents == "#924684") {
      colorTheme.accents = "#924684";
    } else if (accents == "#9A8455") {
      colorTheme.accents = "#9A8455";
    } else if (accents == "#2E2C2F") {
      colorTheme.accents = "#2E2C2F";
    } else if (accents == "#CFC486") {
      colorTheme.accents = "#CFC486";
    } else if (accents == "#7E4B54") {
      colorTheme.accents = "#7E4B54";
    } else if (accents == "#82846E") {
      colorTheme.accents = "#82846E";
    } else if (accents == "#AEA3CE") {
      colorTheme.accents = "#AEA3CE";
    } else if (accents == "#89ACD2") {
      colorTheme.accents = "#89ACD2";
    } else if (accents == "#F3A0BC") {
      colorTheme.accents = "#F3A0BC";
    } else if (accents == "#58609F") {
      colorTheme.accents = "#58609F";
    } else if (accents == "#C1BD84") {
      colorTheme.accents = "#C1BD84";
    } else {
      isCustom = true;
      console.log("accents: " + accents);
      setCustomColor(accents);
    }
    if (isCustom === false) {
      setColorTheme(colorTheme);
    } else {
      setCustomColor(accents);
      setColorTheme({
        primary: primary,
        neutral: neutral,
        accents: accents,
      });
    }
  }, [accents]);

  const colorPicked = (color) => {
    console.log("picked");
    setPrimary(color);
  };

  const neutralColorPicked = (color) => {
    setNeutral(color);
  };

  const accentColorPicked = (color, isCustom) => {
    if (isCustom === false) {
      setAccents(color);
      setCustomColor("");
    } else {
      setAccents(color);
      setCustomColor(color);
    }
  };

  const handleCustomColor = (color) => {
    colorPicked("custom");
    setCustomPicked(color);
    setCustomVisible(false);
  };

  const handleAccentsColor = (color) => {
    accentColorPicked(color, true);
    setCustomVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.whiteBackground}>
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
        <Text style={[styles.header, { marginRight: 1 }]}>Accents</Text>
        <View style={[styles.modalBackground, { flexWrap: "wrap" }]}>
          <TouchableWithoutFeedback
            onPress={() => accentColorPicked("#939597", false)}
          >
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "#939597",
                },
              ]}
            >
              {accents === "#939597" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => accentColorPicked("#F5DF4D", false)}
          >
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "#F5DF4D",
                },
              ]}
            >
              {accents === "#F5DF4D" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => accentColorPicked("#BE5B3E", false)}
          >
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "#BE5B3E",
                },
              ]}
            >
              {accents === "#BE5B3E" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => accentColorPicked("#924684", false)}
          >
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "#924684",
                },
              ]}
            >
              {accents === "#924684" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => accentColorPicked("#9A8455", false)}
          >
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "#9A8455",
                },
              ]}
            >
              {accents === "#9A8455" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => accentColorPicked("#2E2C2F", false)}
          >
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "#2E2C2F",
                },
              ]}
            >
              {accents === "#2E2C2F" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => accentColorPicked("#CFC486", false)}
          >
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "#CFC486",
                },
              ]}
            >
              {accents === "#CFC486" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => accentColorPicked("#7E4B54", false)}
          >
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "#7E4B54",
                },
              ]}
            >
              {accents === "#7E4B54" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => accentColorPicked("#82846E", false)}
          >
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "#82846E",
                },
              ]}
            >
              {accents === "#82846E" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => accentColorPicked("#AEA3CE", false)}
          >
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "#AEA3CE",
                },
              ]}
            >
              {accents === "#AEA3CE" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => accentColorPicked("#89ACD2", false)}
          >
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "#89ACD2",
                },
              ]}
            >
              {accents === "#89ACD2" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => accentColorPicked("#F3A0BC", false)}
          >
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "#F3A0BC",
                },
              ]}
            >
              {accents === "#F3A0BC" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => accentColorPicked("#58609F", false)}
          >
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "#58609F",
                },
              ]}
            >
              {accents === "#58609F" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => accentColorPicked("#C1BD84", false)}
          >
            <View
              style={[
                styles.pickedColor,
                {
                  backgroundColor: "#C1BDB4",
                },
              ]}
            >
              {accents === "#C1BD84" ? <Completed /> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <Modal isVisible={customVisible} style={styles.customModal}>
            <View style={styles.wheelBackground}>
              <View style={styles.test}>
                <ColorPicker
                  sliderSize={30}
                  gapSize={20}
                  thumbSize={25}
                  onColorChange={(color) => setTempCustom(color)}
                />
              </View>
              <Button
                mode="contained"
                color={tempCustom}
                onPress={() => handleAccentsColor(tempCustom)}
                style={{ marginLeft: 220, top: 170, marginTop: 50 }}
              >
                Select
              </Button>
            </View>
          </Modal>
          <TouchableWithoutFeedback onPress={() => setCustomVisible(true)}>
            {customColor !== "" ? (
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: customColor,
                  },
                ]}
              >
                {console.log("customColor: " + customColor)}
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
    marginLeft: 10,
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
    marginBottom: 10,
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

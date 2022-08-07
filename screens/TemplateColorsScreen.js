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
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import Completed from "../Components/Completed";
import ColorPicker from "react-native-wheel-color-picker";
import Modal from "react-native-modal";
import { EventRegister } from "react-native-event-listeners";
import { MaterialCommunityIcons, Entypo, AntDesign } from "@expo/vector-icons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Button } from "react-native-paper";
import { RootContext } from "../config/RootContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NotoSans_400Regular,
  NotoSans_700Bold,
  useFonts,
} from "@expo-google-fonts/noto-sans";

const TemplateColors = () => {
  const { colorTheme, setColorTheme } = React.useContext(RootContext);
  const [primary, setPrimary] = useState(colorTheme.primary);
  const [neutral, setNeutral] = useState(colorTheme.neutral);
  const [accents, setAccents] = useState(colorTheme.accents);

  const [customColorPrimary, setCustomColorPrimary] = useState("");
  const [tempCustomPrimary, setTempCustomPrimary] = useState("");
  const [customVisiblePrimary, setCustomVisiblePrimary] = useState(false);

  const [customColorNeutral, setCustomColorNeutral] = useState("");
  const [tempCustomNeutral, setTempCustomNeutral] = useState("");
  const [customVisibleNeutral, setCustomVisibleNeutral] = useState(false);

  const [customColor, setCustomColor] = useState("");
  const [tempCustom, setTempCustom] = useState("");
  const [customVisible, setCustomVisible] = useState(false);

  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  useEffect(() => {
    let colorTheme = {
      primary: "",
      neutral: neutral,
      accents: accents,
    };
    let isCustom = false;
    if (primary == "#939597") {
      colorTheme.primary = "#939597";
    } else if (primary == "#F5DF4D") {
      colorTheme.primary = "#F5DF4D";
    } else if (primary == "#BE5B3E") {
      colorTheme.primary = "#BE5B3E";
    } else if (primary == "#924684") {
      colorTheme.primary = "#924684";
    } else if (primary == "#9A8455") {
      colorTheme.primary = "#9A8455";
    } else if (primary == "#2E2C2F") {
      colorTheme.primary = "#2E2C2F";
    } else if (primary == "#CFC486") {
      colorTheme.primary = "#CFC486";
    } else if (primary == "#7E4B54") {
      colorTheme.primary = "#7E4B54";
    } else if (primary == "#82846E") {
      colorTheme.primary = "#82846E";
    } else if (primary == "#AEA3CE") {
      colorTheme.primary = "#AEA3CE";
    } else if (primary == "#89ACD2") {
      colorTheme.primary = "#89ACD2";
    } else if (primary == "#F3A0BC") {
      colorTheme.primary = "#F3A0BC";
    } else if (primary == "#58609F") {
      colorTheme.primary = "#58609F";
    } else if (primary == "#C1BD84") {
      colorTheme.primary = "#C1BD84";
    } else {
      isCustom = true;
      console.log("primary: " + primary);
      setCustomColorPrimary(primary);
    }
    if (isCustom === false) {
      setColorTheme(colorTheme);
    } else {
      setCustomColorPrimary(primary);
      setColorTheme({
        primary: primary,
        neutral: neutral,
        accents: accents,
      });
    }
  }, [primary]);

  useEffect(() => {
    let colorTheme = {
      primary: primary,
      neutral: "",
      accents: accents,
    };
    let isCustom = false;
    if (neutral == "#939597") {
      colorTheme.neutral = "#939597";
    } else if (neutral == "#F5DF4D") {
      colorTheme.neutral = "#F5DF4D";
    } else if (neutral == "#BE5B3E") {
      colorTheme.neutral = "#BE5B3E";
    } else if (neutral == "#924684") {
      colorTheme.neutral = "#924684";
    } else if (neutral == "#9A8455") {
      colorTheme.neutral = "#9A8455";
    } else if (neutral == "#2E2C2F") {
      colorTheme.neutral = "#2E2C2F";
    } else if (neutral == "#CFC486") {
      colorTheme.neutral = "#CFC486";
    } else if (neutral == "#7E4B54") {
      colorTheme.neutral = "#7E4B54";
    } else if (neutral == "#82846E") {
      colorTheme.neutral = "#82846E";
    } else if (neutral == "#AEA3CE") {
      colorTheme.neutral = "#AEA3CE";
    } else if (neutral == "#89ACD2") {
      colorTheme.neutral = "#89ACD2";
    } else if (neutral == "#F3A0BC") {
      colorTheme.neutral = "#F3A0BC";
    } else if (neutral == "#58609F") {
      colorTheme.neutral = "#58609F";
    } else if (neutral == "#C1BD84") {
      colorTheme.neutral = "#C1BD84";
    } else {
      isCustom = true;
      console.log("neutral: " + neutral);
      setCustomColorNeutral(neutral);
    }
    if (isCustom === false) {
      setColorTheme(colorTheme);
    } else {
      setCustomColorNeutral(neutral);
      setColorTheme({
        primary: primary,
        neutral: neutral,
        accents: accents,
      });
    }
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

  const primaryColorPicked = async (color, isCustom) => {
    if (isCustom === false) {
      await AsyncStorage.setItem("Primary", JSON.stringify(color));
      setPrimary(color);
      setCustomColorPrimary("");
    } else {
      await AsyncStorage.setItem("Primary", JSON.stringify(color));
      setPrimary(color);
      setCustomColorPrimary(color);
    }
  };

  const neutralColorPicked = async (color, isCustom) => {
    if (isCustom === false) {
      await AsyncStorage.setItem("Neutral", JSON.stringify(color));
      setNeutral(color);
      setCustomColorNeutral("");
    } else {
      await AsyncStorage.setItem("Neutral", JSON.stringify(color));
      setNeutral(color);
      setCustomColorNeutral(color);
    }
  };

  const accentColorPicked = async (color, isCustom) => {
    if (isCustom === false) {
      await AsyncStorage.setItem("Accents", JSON.stringify(color));
      setAccents(color);
      setCustomColor("");
    } else {
      await AsyncStorage.setItem("Accents", JSON.stringify(color));
      setAccents(color);
      setCustomColor(color);
    }
  };

  const handlePrimaryColor = (color) => {
    primaryColorPicked(color, true);
    setCustomVisiblePrimary(false);
  };

  const handleNeutralColor = (color) => {
    neutralColorPicked(color, true);
    setCustomVisibleNeutral(false);
  };

  const handleAccentsColor = (color) => {
    accentColorPicked(color, true);
    setCustomVisible(false);
  };

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.whiteBackground}>
          <Text style={[styles.header, { marginRight: 1, marginTop: 15 }]}>
            Primary
          </Text>
          <View style={[styles.modalBackground, { flexWrap: "wrap" }]}>
            <TouchableWithoutFeedback
              onPress={() => primaryColorPicked("#939597", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#939597",
                  },
                ]}
              >
                {primary === "#939597" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => primaryColorPicked("#F5DF4D", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#F5DF4D",
                  },
                ]}
              >
                {primary === "#F5DF4D" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => primaryColorPicked("#BE5B3E", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#BE5B3E",
                  },
                ]}
              >
                {primary === "#BE5B3E" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => primaryColorPicked("#924684", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#924684",
                  },
                ]}
              >
                {primary === "#924684" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => primaryColorPicked("#9A8455", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#9A8455",
                  },
                ]}
              >
                {primary === "#9A8455" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => primaryColorPicked("#2E2C2F", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#2E2C2F",
                  },
                ]}
              >
                {primary === "#2E2C2F" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => primaryColorPicked("#CFC486", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#CFC486",
                  },
                ]}
              >
                {primary === "#CFC486" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => primaryColorPicked("#7E4B54", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#7E4B54",
                  },
                ]}
              >
                {primary === "#7E4B54" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => primaryColorPicked("#82846E", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#82846E",
                  },
                ]}
              >
                {primary === "#82846E" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => primaryColorPicked("#AEA3CE", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#AEA3CE",
                  },
                ]}
              >
                {primary === "#AEA3CE" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => primaryColorPicked("#89ACD2", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#89ACD2",
                  },
                ]}
              >
                {primary === "#89ACD2" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => primaryColorPicked("#F3A0BC", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#F3A0BC",
                  },
                ]}
              >
                {primary === "#F3A0BC" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => primaryColorPicked("#58609F", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#58609F",
                  },
                ]}
              >
                {primary === "#58609F" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => primaryColorPicked("#C1BD84", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#C1BDB4",
                  },
                ]}
              >
                {primary === "#C1BD84" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <Modal isVisible={customVisiblePrimary} style={styles.customModal}>
              <View style={styles.wheelBackground}>
                <View style={styles.modalHeader}>
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "NotoSans_400Regular",
                      fontSize: moderateScale(20),
                    }}
                  >
                    Custom Color
                  </Text>
                </View>
                <View style={styles.test}>
                  <ColorPicker
                    sliderSize={moderateScale(30)}
                    gapSize={moderateScale(20)}
                    thumbSize={moderateScale(25)}
                    onColorChange={(color) => setTempCustomPrimary(color)}
                  />
                </View>
                <Button
                  mode="contained"
                  color={tempCustomPrimary}
                  onPress={() => handlePrimaryColor(tempCustomPrimary)}
                  style={{ marginLeft: 220, top: 170, marginTop: 50 }}
                >
                  Select
                </Button>
              </View>
            </Modal>
            <TouchableWithoutFeedback
              onPress={() => setCustomVisiblePrimary(true)}
            >
              {customColorPrimary !== "" ? (
                <View
                  style={[
                    styles.pickedColor,
                    {
                      backgroundColor: customColorPrimary,
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
                  <AntDesign
                    name="plus"
                    size={moderateScale(30)}
                    color="black"
                  />
                </View>
              )}
            </TouchableWithoutFeedback>
          </View>
          <Text style={[styles.header, { marginRight: 1 }]}>Neutral</Text>
          <View style={[styles.modalBackground, { flexWrap: "wrap" }]}>
            <TouchableWithoutFeedback
              onPress={() => neutralColorPicked("#939597", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#939597",
                  },
                ]}
              >
                {neutral === "#939597" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => neutralColorPicked("#F5DF4D", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#F5DF4D",
                  },
                ]}
              >
                {neutral === "#F5DF4D" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => neutralColorPicked("#BE5B3E", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#BE5B3E",
                  },
                ]}
              >
                {neutral === "#BE5B3E" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => neutralColorPicked("#924684", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#924684",
                  },
                ]}
              >
                {neutral === "#924684" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => neutralColorPicked("#9A8455", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#9A8455",
                  },
                ]}
              >
                {neutral === "#9A8455" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => neutralColorPicked("#2E2C2F", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#2E2C2F",
                  },
                ]}
              >
                {neutral === "#2E2C2F" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => neutralColorPicked("#CFC486", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#CFC486",
                  },
                ]}
              >
                {neutral === "#CFC486" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => neutralColorPicked("#7E4B54", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#7E4B54",
                  },
                ]}
              >
                {neutral === "#7E4B54" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => neutralColorPicked("#82846E", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#82846E",
                  },
                ]}
              >
                {neutral === "#82846E" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => neutralColorPicked("#AEA3CE", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#AEA3CE",
                  },
                ]}
              >
                {neutral === "#AEA3CE" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => neutralColorPicked("#89ACD2", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#89ACD2",
                  },
                ]}
              >
                {neutral === "#89ACD2" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => neutralColorPicked("#F3A0BC", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#F3A0BC",
                  },
                ]}
              >
                {neutral === "#F3A0BC" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => neutralColorPicked("#58609F", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#58609F",
                  },
                ]}
              >
                {neutral === "#58609F" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => neutralColorPicked("#C1BD84", false)}
            >
              <View
                style={[
                  styles.pickedColor,
                  {
                    backgroundColor: "#C1BDB4",
                  },
                ]}
              >
                {neutral === "#C1BD84" ? <Completed /> : <></>}
              </View>
            </TouchableWithoutFeedback>
            <Modal isVisible={customVisibleNeutral} style={styles.customModal}>
              <View style={styles.wheelBackground}>
                <View style={styles.modalHeader}>
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "NotoSans_400Regular",
                      fontSize: moderateScale(20),
                    }}
                  >
                    Custom Color
                  </Text>
                </View>
                <View style={styles.test}>
                  <ColorPicker
                    sliderSize={moderateScale(30)}
                    gapSize={moderateScale(20)}
                    thumbSize={moderateScale(25)}
                    onColorChange={(color) => setTempCustomNeutral(color)}
                  />
                </View>
                <Button
                  mode="contained"
                  color={tempCustomNeutral}
                  onPress={() => handleNeutralColor(tempCustomNeutral)}
                  style={{ marginLeft: 220, top: 170, marginTop: 50 }}
                >
                  Select
                </Button>
              </View>
            </Modal>
            <TouchableWithoutFeedback
              onPress={() => setCustomVisibleNeutral(true)}
            >
              {customColorNeutral !== "" ? (
                <View
                  style={[
                    styles.pickedColor,
                    {
                      backgroundColor: customColorNeutral,
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
                  <AntDesign
                    name="plus"
                    size={moderateScale(30)}
                    color="black"
                  />
                </View>
              )}
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
                <View style={styles.modalHeader}>
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "NotoSans_400Regular",
                      fontSize: moderateScale(20),
                    }}
                  >
                    Custom Color
                  </Text>
                </View>
                <View style={styles.test}>
                  <ColorPicker
                    sliderSize={moderateScale(30)}
                    gapSize={moderateScale(20)}
                    thumbSize={moderateScale(25)}
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
                  <Completed />
                </View>
              ) : (
                <View
                  style={[
                    styles.pickedColor,
                    { borderColor: "black", borderWidth: moderateScale(5) },
                  ]}
                >
                  <AntDesign
                    name="plus"
                    size={moderateScale(30)}
                    color="black"
                  />
                </View>
              )}
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFEF7",
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
  whiteBackground: {
    alignItems: "center",
  },
  customModal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    position: "absolute",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(60),
    top: moderateScale(0),
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
    backgroundColor: "black",
  },
});

export default TemplateColors;

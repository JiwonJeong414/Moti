import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Entypo } from "@expo/vector-icons";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootContext } from "../config/RootContext";

const SettingModal = ({ navigation }) => {
  const { onboarded, setOnboard } = React.useContext(RootContext);
  const [settingVisible, setSettingVisible] = useState(false);

  const chooseColorPressed = () => {
    navigation.navigate("TemplateColorsScreen");
    setSettingVisible(false);
  };

  const deleteUsername = async () => {
    await AsyncStorage.removeItem("Name");
    setSettingVisible(false);
    setOnboard(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setSettingVisible(true)}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginRight: moderateScale(20),
          headerStyle: {
            height: 80,
          },
        }}
      >
        <Entypo
          name="dots-three-horizontal"
          size={moderateScale(45)}
          color={"black"}
        />
        <Modal
          isVisible={settingVisible}
          animationIn="bounceIn"
          animationOut="bounceOut"
          onBackdropPress={() => setSettingVisible(false)}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <View style={[styles.modalBackground, { flexDirection: "column" }]}>
            <TouchableWithoutFeedback onPress={chooseColorPressed}>
              <View style={styles.item}>
                <View style={styles.itemLeft}>
                  <View style={styles.square}></View>
                  <Text style={styles.itemText}>Choose Colors</Text>
                </View>
                <View style={styles.circular}></View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={deleteUsername}>
              <View style={[styles.item, { marginTop: 10 }]}>
                <View style={styles.itemLeft}>
                  <View style={styles.square}></View>
                  <Text style={styles.itemText}>Edit Name</Text>
                </View>
                <View style={styles.circular}></View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={[styles.item, { marginTop: 10 }]}>
                <View style={styles.itemLeft}>
                  <View style={styles.square}></View>
                  <Text style={styles.itemText}>Themes/Modes</Text>
                </View>
                <View style={styles.circular}></View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalBackground: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "80%",
    height: "30%",
    backgroundColor: "#FFF",
  },
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderColor: "black",
    borderWidth: moderateScale(3),
    width: moderateScale(210),
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default SettingModal;

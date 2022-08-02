import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "react-native-neat-date-picker";
import Events from "./Events";
import { Button, IconButton, TextInput } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";

const CustomDatePicker = ({ widgetTitle }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [title, setTitle] = useState();
  const [date, setDate] = useState(null);
  const [modal, showModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [calculateDate, setCalculateDate] = useState([]);

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onCancel = () => {
    setShowDatePicker(false);
  };

  const onConfirm = (date) => {
    setShowDatePicker(false);
    setDate(date.dateString);
    let today = new Date();
    let day = today.getDay();
    let month = today.getMonth();
    let year = today.getFullYear();
    let myToday = calculate(year + "-" + (month + 1) + "-" + day);
    let myDate = calculate(date.dateString);
    setCalculateDate(myDate - myToday);
  };

  const calculate = (text) => {
    console.log(text);
    const selectedDate = text.split("-");
    let addedDate = 0;
    addedDate = Math.floor(Number(selectedDate[0]) / 4) * 1461;
    let isLeapYear = false;
    if (Number(selectedDate[0]) % 4 === 0) isLeapYear = true;
    if (!isLeapYear) addedDate += (Number(selectedDate[0]) % 4) * 365;
    // 31
    if (Number(selectedDate[1]) - 1 === 1) addedDate += 31;
    // 28 or 29
    else if (Number(selectedDate[1]) - 1 === 2 && isLeapYear === false)
      addedDate += 59;
    else if (Number(selectedDate[1]) - 1 === 2 && isLeapYear === true)
      addedDate += 60;
    // 31
    else if (Number(selectedDate[1]) - 1 === 3 && isLeapYear === false)
      addedDate += 90;
    else if (Number(selectedDate[1]) - 1 === 3 && isLeapYear === true)
      addedDate += 91;
    // 30
    else if (Number(selectedDate[1]) - 1 === 4 && isLeapYear === false)
      addedDate += 120;
    else if (Number(selectedDate[1]) - 1 === 4 && isLeapYear === true)
      addedDate += 121;
    // 31
    else if (Number(selectedDate[1]) - 1 === 5 && isLeapYear === false)
      addedDate += 151;
    else if (Number(selectedDate[1]) - 1 === 5 && isLeapYear === true)
      addedDate += 152;
    // 30
    else if (Number(selectedDate[1]) - 1 === 6 && isLeapYear === false)
      addedDate += 181;
    else if (Number(selectedDate[1]) - 1 === 6 && isLeapYear === true)
      addedDate += 182;
    // 31
    else if (Number(selectedDate[1]) - 1 === 7 && isLeapYear === false)
      addedDate += 212;
    else if (Number(selectedDate[1]) - 1 === 7 && isLeapYear === true)
      addedDate += 213;
    // 31
    else if (Number(selectedDate[1]) - 1 === 8 && isLeapYear === false)
      addedDate += 243;
    else if (Number(selectedDate[1]) - 1 === 8 && isLeapYear === true)
      addedDate += 244;
    // 30
    else if (Number(selectedDate[1]) - 1 === 9 && isLeapYear === false)
      addedDate += 273;
    else if (Number(selectedDate[1]) - 1 === 9 && isLeapYear === true)
      addedDate += 274;
    // 31
    else if (Number(selectedDate[1]) - 1 === 10 && isLeapYear === false)
      addedDate += 304;
    else if (Number(selectedDate[1]) - 1 === 10 && isLeapYear === true)
      addedDate += 305;
    // 30
    else if (Number(selectedDate[1]) - 1 === 11 && isLeapYear === false)
      addedDate += 334;
    else if (Number(selectedDate[1]) - 1 === 11 && isLeapYear === true)
      addedDate += 335;
    // 31 (now add days)
    addedDate += Number(selectedDate[2]);
    return addedDate;
  };

  const handleAdd = () => {
    if (date === null) {
      Alert.alert("You need to select a date");
    } else {
      showModal(false);
      setEvents([...events, { date: calculateDate, title: title }]);
      setCalculateDate(null);
      setTitle(null);
      setDate(null);
    }
  };

  const deleteEventItem = (index) => {
    let itemsCopy = [...events];
    itemsCopy.splice(index, 1);
    setEvents(itemsCopy);
  };

  const handleModal = () => {
    showModal(true);
    setTitle(null);
    setDate(null);
    setCalculateDate(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.sectionTitle}> {widgetTitle}</Text>
        <IconButton
          icon="calendar-plus"
          onPress={handleModal}
          style={{
            right: moderateScale(15),
            marginBottom: moderateScale(-8),
            bottom: moderateScale(8),
          }}
        />
      </View>
      <Modal
        isVisible={modal}
        animationIn="bounceIn"
        animationOut="bounceOut"
        useNativeDriver
        hideModalContentWhileAnimating
        onBackdropPress={() => showModal(false)}
        style={styles.modalBackground}
      >
        <View style={styles.modalHeader}>
          <TextInput
            label="Event Title"
            value={title}
            mode="outlined"
            onChangeText={(text) => setTitle(text)}
            style={{
              width: moderateScale(190),
              marginBottom: moderateScale(20),
            }}
          />
          {date === null ? (
            <Button
              mode="contained"
              icon="calendar-month"
              onPress={openDatePicker}
            >
              Select Date
            </Button>
          ) : (
            <Button
              mode="contained"
              icon="calendar-month"
              onPress={openDatePicker}
            >
              {date}
            </Button>
          )}
          <DatePicker
            isVisible={showDatePicker}
            mode={"single"}
            onCancel={onCancel}
            onConfirm={onConfirm}
            initialDate={new Date()}
          />
          <Button
            mode="contained"
            onPress={handleAdd}
            style={{
              position: "absolute",
              left: moderateScale(195),
              top: moderateScale(190),
            }}
          >
            Add
          </Button>
        </View>
      </Modal>
      {events != null ? (
        events.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => deleteEventItem(index)}
            >
              <Events text={item.date} title={item.title} />
            </TouchableOpacity>
          );
        })
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingRight: 10,
  },
  title: {
    width: 200,
    height: 40,
    backgroundColor: "tomato",
    borderColor: "black",
    borderWidth: 4,
    marginBottom: 10,
  },
  date: {
    width: 200,
    height: 40,
    backgroundColor: "tomato",
    borderColor: "black",
    borderWidth: 4,
  },
  row: {
    flexDirection: "row",
  },
  modalBackground: {
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    width: 140,
    height: 55,
    top: 190,
    left: 150,
    borderRadius: 20,
    backgroundColor: "#553AF6",
    position: "absolute",
  },
  modalHeader: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "80%",
    height: "30%",
    backgroundColor: "#FFF",
  },
});

export default CustomDatePicker;

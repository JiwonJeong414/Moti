import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  Button,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "react-native-neat-date-picker";
import Events from "./Events";

const CustomDatePicker = ({ widgetTitle }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [title, setTitle] = useState();
  const [date, setDate] = useState(null);
  const [modal, showModal] = useState(false);
  const [events, setEvents] = useState([]);

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onCancel = () => {
    setShowDatePicker(false);
  };

  const onConfirm = (date) => {
    setShowDatePicker(false);
    setDate(date.dateString);
  };

  const handleAdd = () => {
    showModal(false);
    setDate(null);
    setEvents([...events, date]);
  };

  const deleteEventItem = (deleteTitle) => {
    let newDataArray = events.filter((title) => title != deleteTitle);
    setTitle(null);
    setEvents(newDataArray);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.sectionTitle}> {widgetTitle}</Text>
        <Button title={"Choose Date"} onPress={() => showModal(true)} />
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
          <View style={styles.title}>
            <TextInput
              placeholder="Type your event title here"
              placeholderTextColor={"gray"}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
          </View>
          <TouchableWithoutFeedback onPress={openDatePicker}>
            <View style={styles.date}>
              <DatePicker
                isVisible={showDatePicker}
                mode={"single"}
                onCancel={onCancel}
                onConfirm={onConfirm}
                initialDate={new Date()}
              />
              {events != null ? <Text>{date}</Text> : <></>}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleAdd}>
            <View style={styles.closeButton}></View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
      {events != null ? (
        events.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => deleteEventItem(item)}>
              <Events text={item} title={title} />
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
    display: "flex",
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

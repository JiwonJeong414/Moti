import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "react-native-neat-date-picker";
import Events from "./Events";
import { Button, IconButton, TextInput } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import { AntDesign } from "@expo/vector-icons";
import { RootContext } from "../config/RootContext";

const CustomDatePicker = forwardRef((props, ref) => {
  const { textTheme } = React.useContext(RootContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [title, setTitle] = useState();
  const [date, setDate] = useState(null);
  const [modal, showModal] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const retrieveEventItems = async () => {
      let retrieveData = await AsyncStorage.getItem("Events");
      retrieveData = JSON.parse(retrieveData);
      if (retrieveData == null) {
        firstLoginEvent([
          { date: "2022-12-25", title: "Christmas", id: Math.random() },
        ]);
      } else setEvents(retrieveData);
    };
    retrieveEventItems();
  }, []);

  useImperativeHandle(ref, () => ({
    openModal: () => {
      console.log("CustomDatePicker openModal called");
      showModal(true);
    },
  }));

  const firstLoginEvent = async (array) => {
    await AsyncStorage.setItem("Events", JSON.stringify(array));
    setEvents(array);
  };

  const handleAdd = async () => {
    if (date === null) {
      Alert.alert("You need to select a date");
    } else {
      showModal(false);
      let newData = [
        ...events,
        { date: date, title: title, id: Math.random() },
      ];
      await AsyncStorage.setItem("Events", JSON.stringify(newData));
      setEvents(newData);
      setTitle(null);
      setDate(null);
    }
  };

  const deleteEventItem = async (item) => {
    let newDataArray = events.filter((obj) => obj.id != item.id);
    await AsyncStorage.setItem("Events", JSON.stringify(newDataArray));
    setEvents(newDataArray);
  };

  const handleModal = () => {
    showModal(true);
    setTitle(null);
    setDate(null);
  };

  const openDatePicker = async () => {
    setShowDatePicker(true);
  };

  const onCancel = () => {
    setShowDatePicker(false);
  };

  const onConfirm = (date) => {
    setShowDatePicker(false);
    setDate(date.dateString);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* <IconButton
          icon="calendar-plus"
          onPress={handleModal}
          color={textTheme.text}
          style={{
            right: moderateScale(15),
            top: moderateScale(2),
          }}
        /> */}
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
          <View style={styles.modal}>
            <Text
              style={{
                color: "white",
                fontFamily: "NotoSans_400Regular",
                fontSize: moderateScale(20),
              }}
            >
              Add Event
            </Text>
          </View>
          <TextInput
            label="Event Title"
            value={title}
            mode="outlined"
            activeOutlineColor="#55BCF6"
            onChangeText={(text) => setTitle(text)}
            style={{
              top: moderateScale(10),
              width: moderateScale(190),
              marginBottom: moderateScale(20),
            }}
          />
          {date === null ? (
            <TouchableWithoutFeedback onPress={openDatePicker}>
              <View
                style={{
                  width: moderateScale(190),
                  height: moderateScale(50),
                  backgroundColor: "#FAFAFA",
                  borderRadius: moderateScale(4),
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: moderateScale(1),
                  borderColor: "#616161",
                  flexDirection: "row",
                }}
              >
                <AntDesign
                  name="calendar"
                  size={moderateScale(25)}
                  style={{
                    marginRight: moderateScale(9),
                    right: moderateScale(10),
                    bottom: moderateScale(1),
                  }}
                />
                <Text
                  style={{
                    fontSize: moderateScale(15),
                    right: moderateScale(10),
                    color: "#818589",
                  }}
                >
                  Select Date
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback onPress={openDatePicker}>
              <View
                style={{
                  width: moderateScale(190),
                  height: moderateScale(50),
                  backgroundColor: "#FAFAFA",
                  borderRadius: moderateScale(4),
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: moderateScale(1),
                  borderColor: "#616161",
                  flexDirection: "row",
                }}
              >
                <AntDesign
                  name="calendar"
                  size={moderateScale(25)}
                  style={{
                    marginRight: moderateScale(9),
                    right: moderateScale(10),
                    bottom: moderateScale(1),
                  }}
                />
                <Text
                  style={{
                    fontSize: moderateScale(15),
                    right: moderateScale(10),
                    color: "black",
                  }}
                >
                  {date}
                </Text>
              </View>
            </TouchableWithoutFeedback>
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
              top: moderateScale(215),
              backgroundColor: "#55BCF6",
            }}
          >
            Add
          </Button>
        </View>
      </Modal>
      {events != null ? (
        events.map((item, index) => {
          return (
            <TouchableWithoutFeedback key={item.id}>
              <Events
                date={item.date}
                index={index}
                length={events.length}
                title={item.title}
                deleteItem={deleteEventItem}
                item={item}
              />
            </TouchableWithoutFeedback>
          );
        })
      ) : (
        <></>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: moderateScale(22),
    paddingTop: moderateScale(10),
    fontWeight: "bold",
    paddingLeft: moderateScale(18),
    paddingRight: moderateScale(9),
  },
  row: {
    flexDirection: "row",
  },
  modalBackground: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: moderateScale(270),
    height: moderateScale(260),
    backgroundColor: "#FFF",
  },
  modal: {
    position: "absolute",
    width: "100.4%",
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(50),
    top: moderateScale(0),
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
    backgroundColor: "black",
  },
});

export default CustomDatePicker;

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  Button,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "react-native-neat-date-picker";
import Events from "./Events";

const CustomDatePicker = ({ widgetTitle }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [events, setEvents] = useState([]);

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onCancel = () => {
    setShowDatePicker(false);
  };

  const onConfirm = (date) => {
    setShowDatePicker(false);
    setEvents([...events, date.dateString]);
  };

  const deleteEventItem = (deleteTitle) => {
    let newDataArray = events.filter((title) => title != deleteTitle);
    setEvents(newDataArray);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.sectionTitle}> {widgetTitle}</Text>
        <Button title={"Choose Date"} onPress={openDatePicker} />
      </View>
      <DatePicker
        isVisible={showDatePicker}
        mode={"single"}
        onCancel={onCancel}
        onConfirm={onConfirm}
        initialDate={new Date()}
      />
      {events != null ? (
        events.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => deleteEventItem(item)}>
              <Events text={item} />
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
  row: {
    flexDirection: "row",
  },
});

export default CustomDatePicker;

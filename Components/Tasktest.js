import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import TaskTestTwo from "./TaskTestTwo";

const Tasktest = () => {
  const [tasks, setTasks] = useState();

  return (
    <View>
      <Text style={styles.taskTitle}>Add Task</Text>
      <ScrollView style={{ flex: 1 }}></ScrollView>
      <TaskTestTwo />
      <TaskTestTwo />
      <TaskTestTwo />
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    width: "100%",
    alignItems: "center",
  },
  task: {
    width: "90%",
    height: "90%",
    justifyContent: "center",
    paddingLeft: 20,
    backgroundColor: "white",
    borderRadius: 10,
    // Shadow for iOS
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  taskTitle: {
    fontSize: 40,
  },
  iconContainer: {
    height: "90%",
    width: "90%",
    position: "absolute",
    right: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Tasktest;

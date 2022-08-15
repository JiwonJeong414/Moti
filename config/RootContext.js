import React from "react";
import moment from "moment";

export const RootContext = React.createContext({
  onbarded: false,
  setOnboard: () => {},
  colorTheme: "",
  setColorTheme: () => {},
  textTheme: "",
  setTextTheme: () => {},
  habits: [],
  setHabits: () => {},
  testData: [],
  setTestData: () => {},
  continuousDate: moment().format("YYYY/MM/DD"),
});

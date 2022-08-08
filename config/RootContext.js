import React from "react";

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
});

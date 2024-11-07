// RootContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const RootContext = createContext();

const themes = {
  light: {
    primary: "#ffffff",
    neutral: "#f5f5f5",
    accent: "#007AFF",
    text: {
      primary: "#000000",
      secondary: "#666666",
    },
  },
  dark: {
    primary: "#1a1a1a",
    neutral: "#2a2a2a",
    accent: "#0A84FF",
    text: {
      primary: "#ffffff",
      secondary: "#999999",
    },
  },
};

export const RootProvider = ({ children }) => {
  const [onboarded, setOnboarded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const colorTheme = isDarkMode ? themes.dark : themes.light;
  const textTheme = isDarkMode ? themes.dark.text : themes.light.text;

  useEffect(() => {
    checkOnboarding();
    loadThemePreference();
  }, []);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("onboarded");
      setOnboarded(value === "true");
    } catch (error) {
      console.log("Error checking onboarding status:", error);
    }
  };

  const loadThemePreference = async () => {
    try {
      const theme = await AsyncStorage.getItem("theme");
      setIsDarkMode(theme === "dark");
    } catch (error) {
      console.log("Error loading theme preference:", error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      await AsyncStorage.setItem("theme", newTheme ? "dark" : "light");
      setIsDarkMode(newTheme);
    } catch (error) {
      console.log("Error saving theme preference:", error);
    }
  };

  return (
    <RootContext.Provider
      value={{
        onboarded,
        setOnboarded,
        colorTheme,
        textTheme,
        isDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Animated,
  Linking,
} from "react-native";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import { RootContext } from "../config/RootContext";
import {
  useFonts,
  NotoSans_400Regular,
  NotoSans_700Bold,
} from "@expo-google-fonts/noto-sans";
import { moderateScale } from "react-native-size-matters";
import call from "react-native-phone-call";

const HotlineScreen = () => {
  const { colorTheme, textTheme } = React.useContext(RootContext);
  const [selectedCategory, setSelectedCategory] = useState("techniques");
  const slideAnim = React.useRef(new Animated.Value(0)).current;

  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  const categories = [
    { id: "techniques", label: "Study Tips", icon: "school" },
    { id: "wellness", label: "Wellness", icon: "meditation" },
    { id: "immediate", label: "Get Help", icon: "phone-alert" },
  ];

  const studyTechniques = [
    {
      title: "Pomodoro Timer",
      description: "25min focus, 5min break",
      action: "Start",
      icon: "timer",
      color: "#FF9800",
      gradient: ["#FF9800", "#F57C00"],
    },
    {
      title: "Active Recall",
      description: "Test your knowledge",
      action: "Begin",
      icon: "brain",
      color: "#7C4DFF",
      gradient: ["#7C4DFF", "#651FFF"],
    },
    {
      title: "Mind Mapping",
      description: "Visualize concepts",
      action: "Create",
      icon: "scatter-plot",
      color: "#00BCD4",
      gradient: ["#00BCD4", "#00838F"],
    },
    {
      title: "Spaced Repetition",
      description: "Schedule your review",
      action: "Plan",
      icon: "calendar-clock",
      color: "#4CAF50",
      gradient: ["#4CAF50", "#388E3C"],
    },
  ];

  const wellnessTools = [
    {
      title: "Guided Meditation",
      description: "5-minute calming",
      action: "Start",
      icon: "meditation",
      color: "#FFB74D",
      gradient: ["#FFB74D", "#FFA726"],
    },
    {
      title: "Breathing Exercise",
      description: "Box breathing",
      action: "Begin",
      icon: "weather-windy",
      color: "#4FC3F7",
      gradient: ["#4FC3F7", "#29B6F6"],
    },
    {
      title: "Journal Entry",
      description: "Write your thoughts",
      action: "Write",
      icon: "pencil",
      color: "#81C784",
      gradient: ["#81C784", "#66BB6A"],
    },
    {
      title: "Mood Check-in",
      description: "Track your feelings",
      action: "Check",
      icon: "emoticon-outline",
      color: "#BA68C8",
      gradient: ["#BA68C8", "#AB47BC"],
    },
  ];

  const immediateHelp = [
    {
      title: "Crisis Support",
      description: "24/7 Support Line",
      number: "988",
      color: "#FF6B6B",
      icon: "phone-in-talk",
      action: "Call Now",
    },
    {
      title: "Talk to Counselor",
      description: "Professional Help",
      number: "8007848433",
      color: "#4DB6AC",
      icon: "account-tie",
      action: "Connect",
    },
    {
      title: "Student Support",
      description: "Academic Assistance",
      number: "8002467743",
      color: "#FFB74D",
      icon: "school",
      action: "Reach Out",
    },
  ];

  const renderCard = (item, index) => (
    <TouchableOpacity
      key={index}
      style={[styles.card, { backgroundColor: colorTheme.secondary }]}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: item.color,
            shadowColor: item.color,
            shadowOpacity: 0.3,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
          },
        ]}
      >
        <MaterialCommunityIcons name={item.icon} size={24} color="#FFF" />
      </View>
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: "#E4D5B7" }]}>
          {item.title}
        </Text>
        <Text style={[styles.cardDescription, { color: "#8B8FA3" }]}>
          {item.description}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: "#E4D5B7" }]}
      >
        <Text style={[styles.actionButtonText, { color: colorTheme.primary }]}>
          {item.action}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
  const renderContent = () => {
    switch (selectedCategory) {
      case "techniques":
        return (
          <View style={styles.contentContainer}>
            {studyTechniques.map((item, index) => renderCard(item, index))}
          </View>
        );
      case "wellness":
        return (
          <View style={styles.contentContainer}>
            {wellnessTools.map((item, index) => renderCard(item, index))}
          </View>
        );
      case "immediate":
        return (
          <View style={styles.contentContainer}>
            {immediateHelp.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.card, { backgroundColor: colorTheme.secondary }]}
                onPress={() => handleCall(item.number)}
              >
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor: item.color,
                      shadowColor: item.color,
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      shadowOffset: { width: 0, height: 4 },
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={24}
                    color="#FFF"
                  />
                </View>
                <View style={styles.cardContent}>
                  <Text style={[styles.cardTitle, { color: "#E4D5B7" }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.cardDescription, { color: "#8B8FA3" }]}>
                    {item.description}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: item.color }]}
                >
                  <Text style={[styles.actionButtonText, { color: "#FFF" }]}>
                    {item.action}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  if (!fontsLoaded) return null;

  return (
    <View style={[styles.container, { backgroundColor: colorTheme.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: "#E4D5B7" }]}>Support Hub</Text>
        <Text style={[styles.subtitle, { color: "#8B8FA3" }]}>
          Tools for success
        </Text>
      </View>

      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              {
                backgroundColor:
                  selectedCategory === category.id
                    ? colorTheme.secondary
                    : "transparent",
              },
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <MaterialCommunityIcons
              name={category.icon}
              size={24}
              color={selectedCategory === category.id ? "#E4D5B7" : "#8B8FA3"}
            />
            <Text
              style={[
                styles.categoryLabel,
                {
                  color:
                    selectedCategory === category.id ? "#E4D5B7" : "#8B8FA3",
                },
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? moderateScale(60) : moderateScale(40),
  },
  header: {
    paddingHorizontal: moderateScale(20),
    marginBottom: moderateScale(20),
  },
  title: {
    fontSize: moderateScale(32),
    fontFamily: "NotoSans_700Bold",
    marginBottom: moderateScale(8),
  },
  subtitle: {
    fontSize: moderateScale(16),
    fontFamily: "NotoSans_400Regular",
  },
  categoryContainer: {
    flexDirection: "row",
    paddingHorizontal: moderateScale(20),
    marginBottom: moderateScale(20),
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(20),
    marginRight: moderateScale(12),
  },
  categoryLabel: {
    marginLeft: moderateScale(8),
    fontSize: moderateScale(14),
    fontFamily: "NotoSans_400Regular",
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: moderateScale(20),
  },
  emergencyCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: moderateScale(16),
    borderRadius: moderateScale(16),
    marginBottom: moderateScale(12),
  },
  emergencyCardContent: {
    flex: 1,
    marginLeft: moderateScale(16),
  },
  resourceCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: moderateScale(16),
    borderRadius: moderateScale(16),
    marginBottom: moderateScale(12),
  },
  resourceIcon: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    alignItems: "center",
    justifyContent: "center",
  },
  resourceContent: {
    flex: 1,
    marginLeft: moderateScale(16),
  },
  communityCard: {
    borderRadius: moderateScale(16),
    marginBottom: moderateScale(12),
    overflow: "hidden",
  },
  communityHeader: {
    padding: moderateScale(16),
  },
  communityContent: {
    padding: moderateScale(16),
  },
  communityTitle: {
    color: "#FFF",
    fontSize: moderateScale(18),
    fontFamily: "NotoSans_700Bold",
  },
  memberCount: {
    marginTop: moderateScale(4),
    fontSize: moderateScale(14),
    fontFamily: "NotoSans_400Regular",
  },
  cardTitle: {
    fontSize: moderateScale(16),
    fontFamily: "NotoSans_700Bold",
    marginBottom: moderateScale(4),
  },
  cardDescription: {
    fontSize: moderateScale(14),
    fontFamily: "NotoSans_400Regular",
  },
  actionButton: {
    backgroundColor: "#E4D5B7",
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(20),
  },
  actionButtonText: {
    color: "#1C2331",
    fontSize: moderateScale(14),
    fontFamily: "NotoSans_700Bold",
  },
  joinButton: {
    backgroundColor: "#E4D5B7",
    padding: moderateScale(12),
    alignItems: "center",
  },
  joinButtonText: {
    color: "#1C2331",
    fontSize: moderateScale(14),
    fontFamily: "NotoSans_700Bold",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: moderateScale(16),
    borderRadius: moderateScale(16),
    marginBottom: moderateScale(12),
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    alignItems: "center",
    justifyContent: "center",
    marginRight: moderateScale(16),
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: moderateScale(16),
    fontFamily: "NotoSans_700Bold",
    marginBottom: moderateScale(4),
  },
  cardDescription: {
    fontSize: moderateScale(14),
    fontFamily: "NotoSans_400Regular",
    opacity: 0.8,
  },
  actionButton: {
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: moderateScale(14),
    fontFamily: "NotoSans_700Bold",
  },
});

export default HotlineScreen;

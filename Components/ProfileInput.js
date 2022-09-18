import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootContext } from "../config/RootContext";
import { moderateScale } from "react-native-size-matters";
import * as FileSystem from "expo-file-system";
import {
  downloadImage,
  handleUploadImage,
  getUniqueDeviceID,
  deleteFile,
  IMG_TYPE_PROFILE,
} from "../firebase";

const ProfileInput = ({ imageUri, onChangeImage }) => {
  const [loading, setLoading] = useState(false);

  const { textTheme } = React.useContext(RootContext);
  // Check Deleted Branch
  useEffect(() => {
    getUniqueDeviceID();
    const retrieveImage = async () => {
      let retrieveImageObj = await AsyncStorage.getItem("Profile");
      try {
        const img = await fetch(retrieveImageObj);
        const blob = await img.blob();
        if (blob) {
          onChangeImage(retrieveImageObj);
        } else {
          downloadProfileImage();
        }
      } catch (error) {
        downloadProfileImage();
      }
    };
    requestPermision();
    retrieveImage();
  }, []);

  const saveToLocal = async (uri) => {
    FileSystem.downloadAsync(
      uri,
      FileSystem.documentDirectory + "profile.jpg"
    ).then(({ uri }) => {
      setProfile(uri);
    });
  };

  const setProfile = async (uri) => {
    await AsyncStorage.setItem("Profile", uri);
  };

  const downloadProfileImage = async () => {
    const url = await downloadImage(IMG_TYPE_PROFILE);
    if (url) {
      onChangeImage(url);
      saveToLocal(url);
    } else {
      onChangeImage(null);
    }
  };

  const requestPermision = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: deleteImage },
        { text: "No" },
      ]);
  };

  const deleteImage = async () => {
    await AsyncStorage.removeItem("Profile");
    onChangeImage(null);
    deleteFile(IMG_TYPE_PROFILE);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        quality: 0.2,
        allowsEditing: true,
        aspect: [224, 224],
      });
      // console.log(result.uri);
      if (!result.cancelled) {
        // await AsyncStorage.setItem("Profile", JSON.stringify(result.uri));
        setLoading(true);
        await uploadImageAsync(result.uri);
        if (loading === false) {
          onChangeImage(result.uri);
        }
      }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  const uploadImageAsync = async (uri) => {
    await handleUploadImage(uri, IMG_TYPE_PROFILE, setLoading);
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        style={{
          position: "absolute",
          bottom: moderateScale(-40),
          width: moderateScale(112),
          height: moderateScale(112),
          borderRadius: moderateScale(100),
          borderWidth: moderateScale(3),
          alignItems: "center",
          backgroundColor: "#D3D3D3",
          overflow: "hidden",
          justifyContent: "center",
          borderColor: textTheme.text,
        }}
      >
        {imageUri === null && loading === false ? (
          <MaterialCommunityIcons name="camera" size={40} />
        ) : imageUri !== null && loading === false ? (
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{ uri: imageUri }}
          />
        ) : (
          <ActivityIndicator size={"small"} color="black" />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileInput;

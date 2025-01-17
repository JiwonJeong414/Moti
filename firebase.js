import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBIVsdF7PE0S9-OMUnYPAwFHE1ohoAcR18",
  authDomain: "moti-29485.firebaseapp.com",
  projectId: "moti-29485",
  storageBucket: "moti-29485.appspot.com",
  messagingSenderId: "62709121008",
  appId: "1:62709121008:web:9771a5a7834c2bf67aa735",
  measurementId: "G-4Q2E5E5V99",
};

let myApp = initializeApp(firebaseConfig);
export const storage = getStorage();

export const IMG_TYPE_PROFILE = "profile";
export const IMG_TYPE_BACKGROUND = "image";

export const getUniqueDeviceID = async () => {
  try {
    let deviceID = await AsyncStorage.getItem("DeviceID");
    if (!deviceID) {
      deviceID = uuidv4();
      await AsyncStorage.setItem("DeviceID", deviceID);
    }
    return deviceID;
  } catch (error) {
    return null;
  }
};

export const setUniqueDeviceID = async () => {
  try {
    let uuid = uuidv4();
    await AsyncStorage.setItem("DeviceID", uuid);
  } catch (error) {
    return null;
  }
};

export const handleUploadImage = async (uri, imageType, setLoading) => {
  const img = await fetch(uri);
  const blob = await img.blob();
  await uploadImage(blob, imageType, setLoading);
};

export const uploadImage = async (blob, imageType, setLoading) => {
  let deviceID = await getUniqueDeviceID();
  const imageRef =
    imageType === IMG_TYPE_PROFILE
      ? ref(storage, `images/${deviceID}/profile.jpg`)
      : ref(storage, `images/${deviceID}/image.jpg`);

  const uploadTask = uploadBytesResumable(imageRef, blob);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (error) => {
      this.setState({ isLoading: false });
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        saveToLocal(downloadURL);
      });
      setLoading(false);
    }
  );
  const saveToLocal = async (uri) => {
    FileSystem.downloadAsync(
      uri,
      FileSystem.documentDirectory +
        (imageType === IMG_TYPE_PROFILE ? "profile.jpg" : "image.jpg")
    ).then(({ uri }) => {
      setImage(uri);
    });

    const setImage = async (uri) => {
      await AsyncStorage.setItem(
        imageType === IMG_TYPE_PROFILE ? "Profile" : "Image",
        uri
      );
    };
  };
};

export const downloadImage = async (imageType) => {
  let deviceID = await getUniqueDeviceID();
  const imageRef =
    imageType === IMG_TYPE_PROFILE
      ? ref(storage, `images/${deviceID}/profile.jpg`)
      : ref(storage, `images/${deviceID}/image.jpg`);
  const fileRef = ref(imageRef);
  // Get the download URL
  return getDownloadURL(fileRef)
    .then((url) => {
      return url;
    })
    .catch((error) => {
      switch (error.code) {
        case "storage/object-not-found":
          // File doesn't exist
          break;
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        case "storage/unknown":
          // Unknown error occurred, inspect the server response
          break;
      }
      return null;
    });
};

export const deleteFile = async (imageType) => {
  let deviceID = await getUniqueDeviceID();
  const imageRef =
    imageType === IMG_TYPE_PROFILE
      ? ref(storage, `images/${deviceID}/profile.jpg`)
      : ref(storage, `images/${deviceID}/image.jpg`);

  // Delete the file
  deleteObject(imageRef)
    .then(() => {
      // File deleted successfully
      console.log("File deleted successfully");
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
};

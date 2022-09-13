import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
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
export const getUniqueDeviceID = async () => {
  try {
    let deviceID = await AsyncStorage.getItem("DeviceID");
    if (!deviceID) {
      deviceID = uuidv4();
      await AsyncStorage.setItem("DeviceID", deviceID);
    }
    console.log(
      "🚀 ~ file: firebase.js ~ line 34 ~ getUniqueDeviceID ~ deviceID",
      deviceID
    );
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

export const uploadImage = async (file) => {
  let deviceID = await getUniqueDeviceID();
  const profileImgRef = ref(storage, `images/${deviceID}/profile.jpg`);
  // 'file' comes from the Blob or File API
  uploadBytes(profileImgRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
};

export const uploadImage2 = async (file) => {
  let deviceID = await getUniqueDeviceID();
  const imageImgRef = ref(storage, `images/${deviceID}/image.jpg`);
  // 'file' comes from the Blob or File API
  uploadBytes(imageImgRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
};

export const downloadImage = async () => {
  let deviceID = await getUniqueDeviceID();
  const profileImgRef = ref(storage, `images/${deviceID}/profile.jpg`);
  const fileRef = ref(profileImgRef);
  // Get the download URL
  return getDownloadURL(fileRef)
    .then((url) => {
      return url;
    })
    .catch((error) => {
      console.log(
        "🚀 ~ file: firebase.js ~ line 60 ~ downloadImage ~ error",
        error
      );
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

export const downloadImage2 = async () => {
  let deviceID = await getUniqueDeviceID();
  const imageImgRef = ref(storage, `images/${deviceID}/image.jpg`);
  const fileRef = ref(imageImgRef);
  // Get the download URL
  return getDownloadURL(fileRef)
    .then((url) => {
      return url;
    })
    .catch((error) => {
      console.log(
        "🚀 ~ file: firebase.js ~ line 60 ~ downloadImage ~ error",
        error
      );
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

export const deleteFile = async () => {
  let deviceID = await getUniqueDeviceID();
  const profileImgRef = ref(storage, `images/${deviceID}/profile.jpg`);
  // Delete the file
  deleteObject(profileImgRef)
    .then(() => {
      // File deleted successfully
      console.log("File deleted successfully");
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
};

export const deleteFile2 = async () => {
  let deviceID = await getUniqueDeviceID();
  const imageImgRef = ref(storage, `images/${deviceID}/image.jpg`);
  // Delete the file
  deleteObject(imageImgRef)
    .then(() => {
      // File deleted successfully
      console.log("File deleted successfully");
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
};

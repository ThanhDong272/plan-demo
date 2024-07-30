import { Dimensions } from "react-native";
import Toast from "react-native-toast-message";

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;

export const showFlashError = (message: string) => {
  Toast.show({
    type: "error",
    text1: message,
    visibilityTime: 3000,
  });
};

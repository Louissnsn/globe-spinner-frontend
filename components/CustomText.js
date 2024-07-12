import React from "react";
import { Text as CustomRNText, StyleSheet } from "react-native";
import { useFonts, KronaOne_400Regular } from "@expo-google-fonts/krona-one";
import { NunitoSans_400Regular } from "@expo-google-fonts/nunito-sans";

// CustomText component to display text with custom fonts and styles
export const CustomText = ({ style, ...props }) => {
  const [fontsLoaded] = useFonts({
    KronaOne_400Regular,
    NunitoSans_400Regular,
  });

  // Display loading indicator while fonts are loading
  if (!fontsLoaded) {
    return <CustomRNText>⏳</CustomRNText>; // or a loading spinner
  }

  // Return text with combined styles
  return <CustomRNText style={[styles.text, style]} {...props} />;
};

// Styles for the custom text component
const styles = StyleSheet.create({
  text: {
    fontFamily: "NunitoSans_400Regular",
    color: "#515151",
    fontSize: 18,
    // Add other fonts/styles if needed
  },
});

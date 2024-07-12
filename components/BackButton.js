import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const BackButton = () => {
  const navigation = useNavigation();

  // Handle back button click
  const handleBackClick = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={handleBackClick}>
        <Icon name="angle-left" size={35} color="#515151" />
      </TouchableOpacity>
    </View>
  );
};

// Styles for the back button
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 35,
    left: 1,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    zIndex: 99,
  },
  touchable: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
  },
});

export default BackButton;

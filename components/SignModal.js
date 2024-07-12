import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { CustomText } from "./CustomText";
import GradientFontColor from "./GradientFontColor";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// SignModal component to handle user sign-in and sign-up actions
const SignModal = ({ onClose, onSignIn, onSignUp, closeSignModal }) => {
  // Get user information from Redux store
  const userInfo = useSelector((state) => state.userInfo.value);
  //console.log(userInfo.isConnected); // Debugging log for user connection status

  return (
    <View style={styles.container}>
      {/* Title with gradient color */}
      <View style={styles.titleContainer}>
        <GradientFontColor>
          <Text style={styles.title}>Welcome!</Text>
        </GradientFontColor>
      </View>

      {/* Close button */}
      <TouchableOpacity style={styles.closeButton} onPress={closeSignModal}>
        <FontAwesome name="close" size={30} color="black" />
      </TouchableOpacity>

      {/* Container for sign-in and sign-up buttons */}
      <View style={styles.buttonContainer}>
        {/* Sign-in prompt */}
        <CustomText style={styles.text}>Already have an account?</CustomText>
        {/* Sign-in button */}
        <TouchableOpacity style={styles.button} onPress={onSignIn}>
          <CustomText style={styles.buttonText}>Sign In</CustomText>
        </TouchableOpacity>

        {/* Sign-up section */}
        <View style={styles.signUpContainer}>
          <CustomText style={styles.text}>Don't have an account?</CustomText>
          {/* Sign-up button */}
          <TouchableOpacity style={styles.button} onPress={onSignUp}>
            <CustomText style={styles.buttonText}>Sign Up</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontFamily: "KronaOne_400Regular",
    marginTop: 50,
    marginBottom: 30,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#3972D9",
    borderRadius: 25,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
  },
  signUpContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  closeButton: {
    width: 40,
    height: 40,
    right: 10,
    top: 15,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignModal;

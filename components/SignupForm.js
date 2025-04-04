import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  useWindowDimensions,
  Alert,
  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import GradientFontColor from "./GradientFontColor";
import { CustomText } from "./CustomText";

export default function SignupForm({ submit, closeModal }) {
  const { width } = useWindowDimensions(); // Get device width for responsive design
  const [firstname, setFirstname] = useState(""); // State for first name input
  const [lastname, setLastname] = useState(""); // State for last name input
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password input
  const [errorMsg, setErrorMsg] = useState(""); // State for error message

  const EMAIL_REGEX = // Regular expression for email validation
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Function to check if any fields are empty
  const checkHasEmptyField = (fields) => {
    return fields.some((field) => !field || field.trim() === "");
  };

  // Handle form submission
  const handlePressSubmit = async () => {
    if (
      checkHasEmptyField([
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
      ])
    ) {
      return Alert.alert("Some fields are missing!");
    }
    if (!EMAIL_REGEX.test(email)) {
      return Alert.alert("Invalid email address!");
    }
    if (password !== confirmPassword) {
      return Alert.alert("Passwords don't match!");
    }
    if (password.length < 5) {
      return Alert.alert("Password must be at least 5 characters long!");
    }
    const response = await submit(firstname, lastname, email, password);
    if (!response.result) {
      return Alert.alert("An error occurred during signup!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollView, { width: width }]}>
        <StatusBar style="auto" />

        {/* Close button */}
        <View>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <FontAwesome name="close" size={30} color="black" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <GradientFontColor style={styles.title}>Sign</GradientFontColor>
          <Text style={styles.titleUp}>up</Text>
        </View>

        {/* Input fields */}
        <KeyboardAvoidingView
          enabled={true}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ width: width }}
        >
          <View style={styles.inputsContainerRow}>
            <View style={styles.textAndInput}>
              <CustomText style={{ fontSize: 20, color: "black" }}>
                First name
              </CustomText>
              <TextInput
                placeholder="First name"
                style={styles.textInput}
                value={firstname}
                onChangeText={setFirstname}
                autoFocus={true}
              />
            </View>

            <View style={styles.textAndInput}>
              <CustomText style={{ fontSize: 20, color: "black" }}>
                Last name
              </CustomText>
              <TextInput
                placeholder="Last name"
                style={styles.textInput}
                value={lastname}
                onChangeText={setLastname}
              />
            </View>

            <View style={styles.textAndInput}>
              <CustomText style={{ fontSize: 20, color: "black" }}>
                Email
              </CustomText>
              <TextInput
                placeholder="Email"
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.textAndInput}>
              <CustomText style={{ fontSize: 20, color: "black" }}>
                Password
              </CustomText>
              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                style={styles.textInput}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.textAndInput}>
              <CustomText style={{ fontSize: 20, color: "black" }}>
                Confirm password
              </CustomText>
              <TextInput
                placeholder="Confirm password"
                secureTextEntry={true}
                style={styles.textInput}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          </View>
        </KeyboardAvoidingView>

        {/* Submit button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handlePressSubmit}
        >
          <CustomText style={styles.submitButtonText}>Submit</CustomText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
  },
  scrollView: {
    alignItems: "center",
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "center",
  },
  title: {
    marginVertical: 45,
    fontSize: 40,
    fontFamily: "KronaOne_400Regular",
  },
  titleUp: {
    marginVertical: 45,
    fontSize: 40,
    fontFamily: "KronaOne_400Regular",
    color: "#515151",
    marginLeft: 10,
  },
  inputsContainerRow: {
    width: "100%",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textAndInput: {
    width: "600%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  textInput: {
    width: "10%",
    fontSize: 16,
    borderBottomColor: "#BA99FE",
    borderBottomWidth: 2,
    paddingVertical: 5,
    marginTop: 10,
  },
  closeButton: {
    width: 60,
    height: 30,
    top: 10,
    right: -200,
    marginBottom: 50,
    zIndex: 99,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#3972D9",
    borderRadius: 25,
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});

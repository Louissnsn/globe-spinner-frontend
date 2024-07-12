import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Alert,
  Platform,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import GradientFontColor from "../components/GradientFontColor";

export default function SigninForm({ submit, closeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to check if any fields are empty
  const checkHasEmptyField = (fields) => fields.some((field) => !field.trim());

  // Handle form submission
  const handlePressSubmit = async () => {
    if (checkHasEmptyField([email, password])) {
      Alert.alert("Some fields are missing!");
      return;
    }
    await submit(email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
          <FontAwesome name="close" size={30} />
        </TouchableOpacity>

        <View style={styles.title}>
          <GradientFontColor>
            <Text style={styles.signInText}>Sign in</Text>
          </GradientFontColor>
        </View>

        <View style={styles.inputsContainer}>
          <View style={styles.textAndInput}>
            <FontAwesome name="user" size={30} color="#BA99FE" />
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Email"
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <View style={styles.textAndInput}>
            <FontAwesome name="lock" size={30} color="#BA99FE" />
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Password"
                style={styles.textInput}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.submitButton} onPress={handlePressSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    flex: 1,
  },
  closeButton: {
    width: 40,
    height: 40,
    right: -20,
    top: 15,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    alignItems: "center",
    marginBottom: 80,
    marginTop: 50,
  },
  signInText: {
    fontSize: 30,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "KronaOne_400Regular",
    marginTop: 50,
    marginBottom: 30,
  },
  inputsContainer: {
    width: "80%",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textAndInput: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  textInputContainer: {
    fontSize: 16,
    borderBottomColor: "#BA99FE",
    borderBottomWidth: 2,
    paddingVertical: 5,
    marginTop: 10,
    marginLeft: 15,
    flexDirection: "row",
  },
  textInput: {
    width: "100%",
    fontSize: 15,
    padding: 5,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
    fontFamily: "NunitoSans_400Regular",
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
    marginTop: 60,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 25,
  },
});

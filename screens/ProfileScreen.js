import React from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function ProfileScreen({ navigation }) {
  const handleSubmit = () => {
    navigation.navigate("Suggestions");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleSubmit()}>
        <Text style={styles.text}>
          Hello this is the profile screen and if you click me you'll go on
          suggestions screen
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 38,
  },
});

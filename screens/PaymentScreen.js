import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, FontAwesome, Entypo } from "@expo/vector-icons";
import GradienFontColor from "../components/GradientFontColor";
import {
  useFonts,
  NunitoSans_400Regular,
} from "@expo-google-fonts/nunito-sans";
const PaymentScreen = () => {
  const navigation = useNavigation();
  const [saveCardDetails, setSaveCardDetails] = useState(false);
  const [checked, setChecked] = useState(false);

  const handlePayPress = () => {
    navigation.navigate("RecapHomeStack");
  };

  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={[styles.subtitleContainer, { height: 30 }]}>
          <MaterialIcons name="person" size={21} color="#BA99FE" />

          <Text style={[styles.signInText, { color: "#414141" }]}>
            Bank Card User
          </Text>
        </View>

        <TextInput
          style={[styles.input, { fontFamily: "NunitoSans_400Regular" }]}
          placeholder="Enter your name"
        />

        <View style={styles.subtitleContainer}>
          <FontAwesome name="credit-card" size={20} color="#BA99FE" />
          <Text style={[styles.signInText, { color: "#414141" }]}>
            Card Number
          </Text>
        </View>
        <TextInput
          style={[styles.input, { fontFamily: "NunitoSans_400Regular" }]}
          placeholder="Enter card number"
          maxLength={16}
          keyboardType="numeric"
        />

        <View style={styles.subtitleContainer}>
          <Entypo name="calendar" size={20} color="#BA99FE" />
          <Text style={[styles.signInText, { color: "#414141" }]}>
            Expiry Date
          </Text>
        </View>
        <TextInput
          style={[styles.input, { fontFamily: "NunitoSans_400Regular" }]}
          placeholder="MM/YYYY"
        />

        <View style={styles.subtitleContainer}>
          <FontAwesome name="lock" size={20} color="#BA99FE" />
          <Text style={[styles.signInText, { color: "#414141" }]}>Code</Text>
        </View>
        <TextInput
          style={[styles.input, { fontFamily: "NunitoSans_400Regular" }]}
          placeholder="CVV"
        />

        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={checked}
            onValueChange={setChecked}
          />
          <Text
            style={[
              styles.checkboxLabel,
              { fontFamily: "KronaOne_400Regular" },
            ]}
          >
            Do you want to save your bank card details?
          </Text>
        </View>

        <Text
          style={[styles.amountText, { fontFamily: "KronaOne_400Regular" }]}
        >
          Amount:
        </Text>

        <TouchableOpacity style={styles.payButton} onPress={handlePayPress}>
          <Text
            style={[
              styles.payButtonText,
              { fontFamily: "KronaOne_400Regular" },
            ]}
          >
            Pay
          </Text>
        </TouchableOpacity>

        <Image
          source={require("../assets/bendy-dotted-line_2.jpg")}
          style={styles.mapImage}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 70,
    backgroundColor: "white",
    flex: 1,
    position: "relative",
    marginTop: 30,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 15,
  },
  signInText: {
    fontFamily: "KronaOne_400Regular",
    fontSize: 13,
  },

  subtitle: {
    fontSize: 16,
    marginHorizontal: 30,
    flex: 1,
  },
  subtitleIcon: {
    marginRight: 4,
  },
  fontAwesomeIcon: {
    color: "#EDB8FE",
  },

  input: {
    backgroundColor: "#ECE8F2",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    margin: -10,
    borderRadius: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 15,
    justifyContent: "center",
  },
  checkboxLabel: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 11,
    color: "#414141",
  },

  amountText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 10,
    padding: 10,
    color: "#3972D9",
    backgroundColor: "white",
  },
  payButton: {
    borderRadius: 5,
    paddingVertical: 15,
    fontSize: 16,
    marginHorizontal: 35,
    marginBottom: 20,

    borderRadius: 50,

    paddingHorizontal: 60,
    elevation: 4,
    backgroundColor: "#BA99FE",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  payButtonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "KronaOne_400Regular",
  },
  mapImage: {
    width: "190%",
    height: 100,
    resizeMode: "contain",
    marginTop: 5,
    marginLeft: -90,
  },
  imageContainer: {
    width: "50%",
    alignItems: "center",
    marginTop: 20,
  },
  customText: {
    fontFamily: "KronaOne_400Regular",
    fontSize: 24,
  },
});

export default PaymentScreen;

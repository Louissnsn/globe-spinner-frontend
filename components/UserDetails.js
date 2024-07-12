import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import GradientFontColor from "../components/GradientFontColor";
import { CustomText } from "../components/CustomText";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";

// UserDetails component to display user information and logout button
export default function UserDetails({ logout }) {
  const userInfo = useSelector((state) => state.userInfo.value); // Get user info from Redux store
  const { height, width } = useWindowDimensions(); // Get device dimensions for responsive design

  // Commented out because it causes a promise error during sign-in
  // useEffect(() => {
  //   fetch(`http://${ipAddress}:${port}/users/${userInfo.token}/savedTrips`)
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       console.log("data: ", data);
  //     });
  // }, []);

  return (
    <SafeAreaView style={[styles.container, { height }]}>
      <ScrollView contentContainerStyle={[styles.scrollView, { width }]}>
        <StatusBar style="auto" />

        {/* Logout button */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <FontAwesome name="sign-out" size={40} />
        </TouchableOpacity>

        {/* Welcome message */}
        <GradientFontColor style={styles.hello}>
          Hello {userInfo.firstname}!
        </GradientFontColor>

        {/* User details */}
        <View style={styles.userDetailsContainer}>
          <CustomText style={styles.text}>My account info:</CustomText>
          <CustomText style={styles.text}>
            First name: {userInfo.firstName}
          </CustomText>
          <CustomText style={styles.text}>
            Last name: {userInfo.lastName}
          </CustomText>
          <CustomText style={styles.text}>Email: {userInfo.email}</CustomText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
  },
  scrollView: {
    alignItems: "center",
  },
  hello: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
    fontFamily: "KronaOne_400Regular",
    fontSize: 40,
  },
  text: {
    color: "black",
    fontSize: 26,
    margin: 20,
  },
  logoutButton: {
    width: 60,
    height: 60,
    position: "absolute",
    right: -10,
    marginTop: 20,
  },
  userDetailsContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 60,
  },
});

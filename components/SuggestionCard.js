import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { CustomText } from "./CustomText";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// SuggestionCard component to display a trip suggestion
export default function SuggestionCard({
  tripIndex,
  cityName,
  activities,
  img,
  leaveDate,
  returnDate,
  price,
  leaveTransportType,
  returnTransportType,
  accommodationType,
  selectTrip,
  bookmarkTrip,
  isBookmarked,
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => selectTrip(tripIndex)}
    >
      <View style={styles.cityImgContainer}>
        {/* Bookmark button */}
        <TouchableOpacity
          style={styles.bookmark}
          onPress={() => bookmarkTrip(tripIndex)}
        >
          <FontAwesome
            name="bookmark"
            size={30}
            color={isBookmarked ? "#BA99FE" : "white"}
          />
        </TouchableOpacity>

        {/* City name overlay */}
        <CustomText
          style={{
            ...styles.cityTitle,
            color: "#ffffff",
            width: "100%",
            textAlign: "center",
          }}
        >
          {cityName}
        </CustomText>
        {/* City image */}
        <Image source={img} style={styles.cityImg} />
        {/* Overlay to darken the image */}
        <View style={styles.overlay} />
      </View>

      {/* Information container */}
      <View style={styles.infosContainer}>
        {/* List of activities */}
        <View style={styles.activitiesContainer}>
          {activities.map((activity, index) => (
            <CustomText key={index} style={styles.text}>
              - {activity}
            </CustomText>
          ))}
        </View>
        {/* Accommodation type */}
        <View style={styles.accommodationContainer}>
          <CustomText>{accommodationType}</CustomText>
        </View>
        {/* Transport details and dates */}
        <View style={styles.transportsContainer}>
          <CustomText>
            {leaveDate} - {returnDate}
          </CustomText>
          <CustomText>
            {leaveTransportType} - {returnTransportType}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 200,
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    borderRadius: 25,
    shadowColor: "black",
    elevation: 5,
    backgroundColor: "white",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  cityTitle: {
    fontSize: 24,
    position: "absolute",
    zIndex: 1,
  },
  cityImgContainer: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  bookmark: {
    position: "absolute",
    zIndex: 2,
    right: -3,
    top: 4,
    padding: 10,
  },
  cityImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  infosContainer: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  activitiesContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 12,
  },
  accommodationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  transportsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

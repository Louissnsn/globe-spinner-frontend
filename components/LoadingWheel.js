import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

// LoadingWheel component to display a spinning wheel
export default function LoadingWheel() {
  const [angle, setAngle] = useState(0);

  // Increment the angle every 10ms to create a spinning effect
  useEffect(() => {
    const interval = setInterval(() => setAngle((prev) => prev + 5), 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={[styles.loadingWheel, { transform: [{ rotate: `${angle}deg` }] }]}
    />
  );
}

const styles = StyleSheet.create({
  loadingWheel: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 100,
    height: 100,
    marginTop: -50, // half of height
    marginLeft: -50, // half of width
    zIndex: 100,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderRadius: 50,
    borderColor: "#BA99FE",
  },
});

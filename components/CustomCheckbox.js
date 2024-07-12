import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

// CustomCheckbox component to display a styled checkbox with text
const CustomCheckbox = ({ selectTransportationMode, text }) => {
  return (
    <BouncyCheckbox
      size={25}
      fillColor="#ba99fe"
      unfillColor="#FFFFFF"
      text={text}
      isChecked={true}
      iconStyle={{ borderColor: "#FFFFFF", marginLeft: 10 }}
      innerIconStyle={{ borderWidth: 2 }}
      textStyle={{
        fontFamily: "NunitoSans_400Regular",
        textDecorationLine: "none",
        fontSize: 18,
        color: "#515151",
        marginLeft: -10,
      }}
      onPress={() => selectTransportationMode(text)}
    />
  );
};

export default CustomCheckbox;

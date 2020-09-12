import React from "react";
import { Text, View } from "react-native";

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <View
      style={{
        padding: 30,
        backgroundColor: "aquamarine",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default Header;

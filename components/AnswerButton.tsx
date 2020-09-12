import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  onPress: () => void;
  choice: {
    answer: string;
    correct: boolean;
  };
}

const AnswerButton: React.FC<Props> = ({ choice, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          backgroundColor: "skyblue",
          borderRadius: 10,
          textAlign: "center",
          marginTop: 20,
          padding: 10,
          color: "black",
          fontSize: 20,
        }}
      >
        {choice.answer}
      </Text>
    </TouchableOpacity>
  );
};

export default AnswerButton;

import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  setPlayerName: (e: string) => void;
}

const Player: React.FC<Props> = ({ setPlayerName }) => {
  const [text, setText] = useState("");
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Player Name</Text>
      <View style={{ flexDirection: "row", margin: 20 }}>
        <TextInput
          style={{ borderWidth: 1, borderColor: "black", width: "50%" }}
          placeholder="Input Player Name"
          onChangeText={(text) => setText(text)}
          value={text}
        />

        <TouchableOpacity
          disabled={text.length === 0 ? true : false}
          onPress={() => {
            setText("");
          }}
        >
          <MaterialCommunityIcons
            style={{ marginLeft: 25 }}
            name="backspace-outline"
            size={24}
            color={text.length === 0 ? "grey" : "black"}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Button
          title="Start"
          color="green"
          onPress={() => setPlayerName(text)}
        />
      </View>
    </View>
  );
};

export default Player;

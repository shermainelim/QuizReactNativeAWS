import React from "react";
import { View, Text, FlatList, ListView, ScrollView } from "react-native";
import { LeaderBoardDataType } from "../App";

interface Props {
  leaderBoardData: [] | LeaderBoardDataType[];
}

const LeaderBoard: React.FC<Props> = ({ leaderBoardData }) => {
  const renderItem = ({ item }: any) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ marginRight: 20 }}>
          <Text style={{ fontSize: 20 }}>
            <Text style={{ fontWeight: "bold" }}>Player Name: </Text>
            {item.name}
          </Text>
        </View>
        <Text style={{ fontSize: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Score: </Text>
          {item.score}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          textAlign: "center",
          paddingTop: 25,
          paddingBottom: 10,
        }}
      >
        LeaderBoard
      </Text>
      <FlatList
        data={leaderBoardData}
        renderItem={renderItem}
        keyExtractor={(item) => item.date.toString()}
      />
    </View>
  );
};

export default LeaderBoard;

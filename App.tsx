import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import Header from "./components/Header";
import Player from "./components/Player";
import Game from "./components/Game";
import LeaderBoard from "./components/LeaderBoard";
import { getLeaderBoard, firestore } from "./lib/firebaseUtils";
import { useNetInfo } from "@react-native-community/netinfo";
import Axios from "axios";

export interface LeaderBoardDataType {
  date: number;
  name: string;
  score: number;
}

export default function App() {
  const [playerName, setPlayerName] = useState("");
  const [leaderBoardData, setLeaderBoardData] = useState<
    [] | LeaderBoardDataType[]
  >([]);

  const updateLeaderboard = async () => {
    const response = await Axios({
      method: "GET",
      url: `https://foj2g9tu5m.execute-api.ap-southeast-1.amazonaws.com/default/LeaderBoardGETV2`,
    });

    setLeaderBoardData(response.data as any);
  };

  useEffect(() => {
    updateLeaderboard();
  }, []);

  const toLeaderBoards = async (playerName: string, score: number) => {
    // const axios = require("axios");
    // await axios.post(
    //   "https://1jez6roic6.execute-api.ap-southeast-1.amazonaws.com/default/LeaderBoardLambda",
    //   {
    //     date: 12345,
    //     name: "Test2",
    //     score: 4,
    //   }
    // );

    await Axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      url: `https://1jez6roic6.execute-api.ap-southeast-1.amazonaws.com/default/LeaderBoardLambda`,
      data: { date: Date.now().toString(), name: playerName, score: score },
    });

    updateLeaderboard();
    setPlayerName("");
  };

  const netInfo = useNetInfo();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header title="Quiz" />

      {netInfo.isConnected ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {playerName.length ? (
            <Game playerName={playerName} toLeaderBoards={toLeaderBoards} />
          ) : (
            <>
              <Player setPlayerName={(value) => setPlayerName(value)} />
              <LeaderBoard leaderBoardData={leaderBoardData} />
            </>
          )}
        </View>
      ) : (
        <View>
          <Text>Connect Online</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

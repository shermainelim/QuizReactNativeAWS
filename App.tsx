import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import Header from "./components/Header";
import Player from "./components/Player";
import Game from "./components/Game";
import LeaderBoard from "./components/LeaderBoard";
import { getLeaderBoard, firestore } from "./lib/firebaseUtils";
import { useNetInfo } from "@react-native-community/netinfo";

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
    const data = await getLeaderBoard();
    setLeaderBoardData(data as any);
  };

  useEffect(() => {
    updateLeaderboard();
  }, []);

  const toLeaderBoards = (playerName: string, score: number) => {
    firestore
      .collection("LeaderBoard")
      .add({ date: Date.now(), name: playerName, score: score });

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

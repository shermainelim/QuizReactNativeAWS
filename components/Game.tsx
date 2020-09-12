import React, { useState, useEffect } from "react";
import { View, Text, Button, Dimensions } from "react-native";
import quizData from "../lib/quizData";
import AnswerButton from "./AnswerButton";
import { showToast } from "../lib/toast";

interface Props {
  playerName: string;
  toLeaderBoards: (playerName: string, score: number) => void;
}

const Game: React.FC<Props> = ({ playerName, toLeaderBoards }) => {
  const [quizIndex, setquizIndex] = useState(0);
  const [score, setScore] = useState(0);

  const width = Dimensions.get("screen").width;

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: width - 100,
        }}
      >
        <Text style={{ fontSize: 24, marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Player:</Text> {playerName}
        </Text>

        <Text style={{ fontSize: 24, marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Score:</Text> {score}/
          {quizData.length}
        </Text>
      </View>

      <View>
        {quizIndex !== quizData.length ? (
          <>
            <Text style={{ fontSize: 24, marginTop: 20 }}>
              <Text style={{ fontWeight: "bold" }}>
                Question {quizData[quizIndex].id}/{quizData.length}:
              </Text>{" "}
              {quizData[quizIndex].question}
            </Text>

            {quizData[quizIndex].choices.map((choice) => (
              <AnswerButton
                key={choice.answer}
                onPress={() => {
                  if (choice.correct === true) {
                    showToast("Correct Answer");
                    setScore(score + 1);
                    setquizIndex(quizIndex + 1);
                  } else {
                    showToast("Incorrect Answer");
                    setquizIndex(quizIndex + 1);
                  }
                }}
                choice={choice}
              />
            ))}
          </>
        ) : (
          <View>
            <Text
              style={{
                fontSize: 24,
                margin: 20,
                textAlign: "center",
              }}
            >
              Game Over
            </Text>
            <Button
              title="To  LeaderBoard"
              color="skyblue"
              onPress={() => {
                toLeaderBoards(playerName, score);
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Game;

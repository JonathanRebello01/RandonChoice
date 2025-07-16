import { View, Text, StyleSheet, Alert, FlatList, useWindowDimensions, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/ui/GuessLogItem";

function generateRandomBeween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBeween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoudary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBeween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const {width, height} = useWindowDimensions()

  useEffect(() => {
    if (currentGuess == userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoudary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Não minta", "Você sabe que está errado", [
        { text: "Srry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoudary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBeween(
      minBoudary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((previousGuessrounds) => [
      newRndNumber,
      ...previousGuessrounds,
    ]);
  }

  const guessRoundslistlenght = guessRounds.length;
  const marginTopDistance = height < 380 ? 30 : 100


  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Maior ou Menor?
        </InstructionText>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.button}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );
  
  if (width > 500) {
    content = (
      <View style={styles.buttonContainerWide}>
        <View style={styles.button}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="remove" size={24} color="white" />
          </PrimaryButton>
        </View>
  
        <NumberContainer>{currentGuess}</NumberContainer>
  
        <View style={styles.button}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="add" size={24} color="white" />
          </PrimaryButton>
        </View>
      </View>
    );
  }
  

  return (
    <View style={styles.screen}>
      <Title> Número Escolhido </Title>
      
      {content}

      {/* <View style={styles.logContainer}> */}
        {/* {guessRounds.map(guessRounds => <Text key={guessRounds}> {guessRounds}</Text>)} */}

        <FlatList style={styles.listContainer}
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundslistlenght - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
  listContainer:{
    flex: 1,
    padding: 16
  },
  logContainer:{
    flex:1
  },
  buttonContainerWide:{
    flexDirection: 'row',
    alignItems:'center'
  }

});

export default GameScreen;

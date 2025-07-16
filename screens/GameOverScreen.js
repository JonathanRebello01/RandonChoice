import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  useWindowDimensions,
  ScrollView,
  
} from "react-native";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../util/colors";

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
  const { width, height } = useWindowDimensions();
  const marginTopDistance = height < 380 ? 30 : 100;

  let imageSize = 300;

  if (width < 380) {
    imageSize = 150;
  }

  if (height < 400) {
    imageSize = 80;
  }

  const imageeStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title
        // title="Fim de Jogo!"
        >
          Fim de jogo
        </Title>
        <View style={styles.imageContainer}>
          <Image
            style={[styles.image, imageeStyle]}
            source={require("../assets/image/success.png")}
          />
        </View>

        <View>
          <Text style={styles.summaryText}>
            Seu celular precisou de{" "}
            <Text style={styles.highlight}> {roundsNumber} </Text> rodadas para
            adivinhar o número{" "}
            <Text style={styles.highlight}>{userNumber} </Text>
          </Text>
          <PrimaryButton onPress={onStartNewGame}>Novo Jogo</PrimaryButton>
        </View>
      </View>
    </ScrollView>
  );
}

export default GameOverScreen;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  screen:{
    flex:1
  },
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  imageContainer: {
    margin: 36,
  },
  image: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 215,
    borderBlockColor: Colors.primary800,
    borderWidth: 3,
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    fontWeight: "open-sans-bold",
    color: Colors.primay500,
  },
});

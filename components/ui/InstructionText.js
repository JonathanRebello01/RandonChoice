import { Text, StyleSheet } from "react-native";
import Colors from "../../util/colors";

function InstructionText(props){
    return <Text style={[styles.instuctionText, props.style]}>{props.children}</Text>
}
const styles = StyleSheet.create({
    instuctionText: {
        fontFamily: 'open-sans',
      color:Colors.accent500,
      fontSize: 20
    },
  });
export default InstructionText;
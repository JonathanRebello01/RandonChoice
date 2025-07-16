import { Text, StyleSheet, Platform } from "react-native";
import  Colors  from "../../util/colors";

function Title(props){
    return <Text style={styles.title}> {props.children} </Text>
}


  const styles = StyleSheet.create({
    title: {
      fontFamily: 'open-sans-bold',
        fontSize: 24,
        color: "white",
        textAlign: 'center',
        // borderWidth: Platform.OS === 'android' ? 2 : 4,
        borderWidth: Platform.select({ios: 2 , android: 2 , web: 4}),
        borderColor: "white",
        padding: 12,
        maxWidth: '80%',
        width: 300
      },
  });

export default Title;
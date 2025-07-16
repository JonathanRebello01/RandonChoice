import { View, Text, Pressable, StyleSheet } from 'react-native'
import Colors from '../../util/colors';


function PrimaryButton(props) {


    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
            onPress={props.onPress}
            android_ripple={{ color: Colors.primay600 }}
            style={ ({pressed}) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer} 
                >
                <Text style={styles.buttonText} >
                    {props.children}
                </Text>
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden'
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primay500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    pressed: {
    opacity: 0.75,

}});

export default PrimaryButton
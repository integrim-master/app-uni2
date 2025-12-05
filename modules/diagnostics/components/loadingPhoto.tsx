import { useTheme } from "@/context/ThemeContext";
import LottieView from 'lottie-react-native';
import { StyleSheet, Text, View } from "react-native";

const SendPhoto = () => {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <View style={styles.animationWrapper}>
                <LottieView
                    source={require('../../../assets/animations/uploading.json')}
                    autoPlay
                    loop
                    style={styles.animation}
                />
            </View>
            <Text style={[styles.text, { color: colors.text }]}>Enviando foto...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'transparent',
    },
    animationWrapper: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
    },
    animation: {
        width: 200,
        height: 200,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default SendPhoto;

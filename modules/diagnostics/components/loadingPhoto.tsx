import { useTheme } from "@/context/ThemeContext";
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from "react-native";

type SendPhotoProps = {
    onComplete?: () => void;
};

const SendPhoto = ({ onComplete }: SendPhotoProps) => {
    const { colors } = useTheme();
    const [messageIndex, setMessageIndex] = useState(0);
    
    const messages = [
        "Enviando foto...",
        "Analizando rostro...",
        "Procesando datos...",
        "Generando diagnóstico...",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => {
                if (prev < messages.length - 1) {
                    return prev + 1;
                }
                return prev;
            });
        }, 2000);

        const timeout = setTimeout(() => {
            clearInterval(interval);
            onComplete?.();
        }, 8000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

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
            <Text style={[styles.text, { color: colors.text }]}>{messages[messageIndex]}</Text>
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

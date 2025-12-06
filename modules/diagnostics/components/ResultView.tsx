import BodyText from '@/components/shared/BodyText';
import SubtitleText from '@/components/shared/SubtitleText';
import TitleText from '@/components/shared/TitleText';
import { useTheme } from '@/context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type ResultViewProps = {
    photoUri: string;
    onReset: () => void;
    onClose?: () => void;
};

export default function ResultView({ photoUri, onReset, onClose }: ResultViewProps) {
    const { colors } = useTheme();

    const diagnosticResults = [
        { label: 'Estado general', value: 'Bueno', icon: 'check-circle', color: '#4CAF50' },
        { label: 'Hidratación', value: 'Adecuada', icon: 'water-drop', color: '#2196F3' },
        { label: 'Tono de piel', value: 'Saludable', icon: 'face', color: '#FF9800' },
        { label: 'Puntos de atención', value: '2 detectados', icon: 'warning', color: '#FFC107' },
    ];

    return (
        <View style={{ flex: 1 }}>
            <Pressable
                style={styles.fabClose}
                onPress={onClose ? onClose : onReset}
                android_ripple={{ color: colors.primary + '22' }}
            >
                <MaterialIcons name="close" size={30} color={colors.primary} />
            </Pressable>
            <ScrollView 
                style={[styles.container, { backgroundColor: colors.background }]}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
            <View style={styles.header}>
                <MaterialIcons name="check-circle" size={64} color={colors.primary} />
                <TitleText style={[styles.title, { color: colors.text }]}>
                    ¡Diagnóstico completo!
                </TitleText>
                <SubtitleText style={[styles.subtitle, { color: colors.textSecondary }]}>
                    Aquí están los resultados de tu análisis facial
                </SubtitleText>
            </View>

            <View style={[styles.photoContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Image source={{ uri: photoUri }} style={styles.photo} />
            </View>

            <View style={[styles.resultsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Resultados del análisis</Text>
                
                {diagnosticResults.map((result, index) => (
                    <View 
                        key={index} 
                        style={[
                            styles.resultItem, 
                            { borderBottomColor: colors.border },
                            index === diagnosticResults.length - 1 && styles.lastItem
                        ]}
                    >
                        <View style={styles.resultLeft}>
                            <View style={[styles.iconWrapper, { backgroundColor: result.color + '22' }]}>
                                <MaterialIcons name={result.icon as any} size={24} color={result.color} />
                            </View>
                            <BodyText style={[styles.resultLabel, { color: colors.text }]}>
                                {result.label}
                            </BodyText>
                        </View>
                        <Text style={[styles.resultValue, { color: colors.textSecondary }]}>
                            {result.value}
                        </Text>
                    </View>
                ))}
            </View>

            <View style={[styles.recommendationCard, { backgroundColor: colors.card, borderColor: colors.primary }]}>
                <MaterialIcons name="lightbulb" size={28} color={colors.primary} />
                <SubtitleText style={[styles.recommendationTitle, { color: colors.primary }]}>
                    Recomendación
                </SubtitleText>
                <BodyText style={[styles.recommendationText, { color: colors.textSecondary }]}>
                    Tu piel se encuentra en buen estado. Continúa con tu rutina de cuidado diario y mantén una hidratación adecuada, teb sugerimmos acercarte a nuestras instalaciones para obtener un diagnostico mucho mas detallado .
                </BodyText>
            </View>

            <Pressable 
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={onReset}
            >
                <Text style={styles.buttonText}>Realizar nuevo diagnóstico</Text>
            </Pressable>
               
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    fabClose: {
        position: 'absolute',
        top: 32,
        right: 24,
        zIndex: 10,
        backgroundColor: '#fff',
        borderRadius: 24,
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginTop: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginTop: 8,
        textAlign: 'center',
    },
    photoContainer: {
        width: '100%',
        height: 300,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 24,
        borderWidth: 1,
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    resultsCard: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        elevation: 2,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 16,
    },
    resultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 0.5,
    },
    lastItem: {
        borderBottomWidth: 0,
    },
    resultLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    resultLabel: {
        fontSize: 15,
        fontWeight: '500',
    },
    resultValue: {
        fontSize: 14,
        fontWeight: '600',
    },
    recommendationCard: {
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        borderWidth: 1,
        alignItems: 'center',
    },
    recommendationTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginTop: 12,
        marginBottom: 8,
        textAlign: 'center',
    },
    recommendationText: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
    button: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});


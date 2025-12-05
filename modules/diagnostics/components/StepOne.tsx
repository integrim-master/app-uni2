import TitleText from '@/components/shared/TitleText';
import { MaterialIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { DiagnosticScreenProps } from '../types/diagnostics.types';

type StepOneProps = Partial<Pick<DiagnosticScreenProps, 'facing' | 'setFacing' | 'permission' | 'requestPermission'>>;

export default function StepOne(props?: StepOneProps) {
  const { colors } = useTheme();


  const tips = [
    { icon: 'face', text: 'Relaja tu rostro' },
    { icon: 'remove-red-eye', text: 'Quita gafas, tapabocas o gorra' },
    { icon: 'wb-sunny', text: 'Busca un lugar bien iluminado' },
    { icon: 'camera', text: 'Mantén tu rostro centrado' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.card, justifyContent: 'center' }}>
      <View
   
      >
        <View style={[styles.card, { backgroundColor: colors.card,  }]}> 
          <View style={[styles.animationWrapper, { borderColor: colors.primary }]}>
            <LottieView
              source={require('../../../assets/animations/profile-avatar-of-young-boy.json')}
              autoPlay
              loop={true}
              style={styles.animation}
            />
          </View>
          <TitleText style={[styles.title, { color: colors.primary }]}> 
            Bienvenido al diagnóstico
          </TitleText>
          <Text style={[styles.description, { color: colors.textSecondary }]}> 
            Para mejores resultados, por favor retírate gafas, gorra o cualquier cosa
            que obstruya tu rostro.
          </Text>
          <Text style={[styles.subtitle, { color: colors.text }]}> 
            Algunos tips para mejorar el diagnóstico:
          </Text>
          <View style={styles.tipsContainer}> 
            {tips.map((tip, index) => (
              <View key={index} style={styles.tipItem}> 
                <View style={[styles.tipIconWrapper, { backgroundColor: colors.primary+'22' }]}> 
                  <MaterialIcons
                    name={tip.icon as any}
                    size={22}
                    color={colors.primary}
                  />
                </View>
                <Text style={[styles.tipText, { color: colors.textSecondary }]}> 
                  {tip.text}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 370,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 24,
  },
  animationWrapper: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#e0e0e0',

  },
  animation: {
    width: 220,
    height: 220,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 18,
    opacity: 0.85,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 14,
    marginTop: 8,
  },
  tipsContainer: {
    width: '100%',
    gap: 14,
    marginTop: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
  },
  tipIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  tipText: {
    fontSize: 16,
    flex: 1,
  },
});

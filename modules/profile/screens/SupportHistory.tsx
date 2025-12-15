import EmptySvg from '@/assets/svg/Empty.svg';
import BodyText from '@/components/shared/BodyText';
import SubtitleText from '@/components/shared/SubtitleText';
import TitleText from '@/components/shared/TitleText';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

const SupportHistory: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.emptyContainer}>
      <EmptySvg width={280} height={280} style={styles.emptyImage} />
      <TitleText style={[styles.emptyTitle, { color: colors.primaryDark }]}>No hay historial</TitleText>
      <SubtitleText style={[styles.emptySubtitle, { color: colors.text }]}>Tu historial de soporte aparecerá aquí</SubtitleText>
      <BodyText style={[styles.emptyBody, { color: colors.textSecondary }]}>Cuando tengas solicitudes resueltas, podrás consultarlas en este espacio.</BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyImage: {},
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 2,
  },
  emptyBody: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 2,
    paddingHorizontal: 16,
  },
});

export default SupportHistory;
import EmptySvg from '@/assets/svg/Empty.svg';
import ThemedText from '@/src/components/shared/themed-text';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

const SupportHistory: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.emptyContainer}>
      <EmptySvg width={280} height={280} style={styles.emptyImage} />
      <ThemedText type="title" style={[styles.emptyTitle, { color: colors.primaryDark }]}>No hay historial</ThemedText>
      <ThemedText type="subtitle" style={[styles.emptySubtitle, { color: colors.text }]}>Tu historial de soporte aparecerá aquí</ThemedText>
      <ThemedText style={[styles.emptyBody, { color: colors.textSecondary }]}>Cuando tengas solicitudes resueltas, podrás consultarlas en este espacio.</ThemedText>
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
    textAlign: 'center',
    marginBottom: 4,
  },
  emptySubtitle: {
    textAlign: 'center',
    marginBottom: 2,
  },
  emptyBody: {
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 2,
    paddingHorizontal: 16,
  },
});

export default SupportHistory;
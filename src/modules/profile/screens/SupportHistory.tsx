import EmptySvg from '@/assets/svg/Empty.svg';
import ThemedText from '@/src/components/shared/themed-text';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const SupportHistory: React.FC = () => {
  return (
    <View style={styles.emptyContainer}>
      <EmptySvg width={280} height={280} />
      <View style={styles.copy}>
        <ThemedText type="title" tone="primary" align="center">
          No hay historial
        </ThemedText>
        <ThemedText type="subtitle" align="center">
          Tu historial de soporte aparecerá aquí
        </ThemedText>
        <ThemedText type="body" tone="secondary" align="center">
          Cuando tengas solicitudes resueltas, podrás consultarlas en este espacio.
        </ThemedText>
      </View>
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
  copy: {
    gap: 4,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});

export default SupportHistory;

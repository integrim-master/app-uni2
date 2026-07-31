import EmptySvg from '@/assets/svg/Empty.svg';
import ThemedText from '@/src/components/shared/themed-text';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const SupportRequests: React.FC = () => {
  return (
    <View style={styles.emptyContainer}>
      <EmptySvg width={280} height={280} />
      <View style={styles.copy}>
        <ThemedText type="title" tone="primary" align="center">
          ¡Sin solicitudes!
        </ThemedText>
        <ThemedText type="subtitle" tone="muted" align="center">
          Aquí aparecerán tus solicitudes de soporte
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
  },
});

export default SupportRequests;

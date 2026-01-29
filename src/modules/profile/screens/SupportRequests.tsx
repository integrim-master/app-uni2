import EmptySvg from '@/assets/svg/Empty.svg';
import ThemedText from '@/src/components/shared/themed-text';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

const SupportRequests: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.emptyContainer}>
      <EmptySvg width={280} height={280} style={styles.emptyImage} />
      <ThemedText type="title" style={[styles.emptyTitle, { color: colors.primaryLight }]}>¡Sin solicitudes!</ThemedText>
      <ThemedText type="subtitle" style={[styles.emptySubtitle, { color: colors.textLight }]}>Aquí aparecerán tus solicitudes de soporte</ThemedText>
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
});

export default SupportRequests;
import EmptySvg from '@/assets/svg/Empty.svg';
import SubtitleText from '@/components/shared/SubtitleText';
import TitleText from '@/components/shared/TitleText';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

const SupportRequests: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.emptyContainer}>
      <EmptySvg width={280} height={280} style={styles.emptyImage} />
      <TitleText style={[styles.emptyTitle, { color: colors.primaryLight }]}>¡Sin solicitudes!</TitleText>
      <SubtitleText style={[styles.emptySubtitle, { color: colors.textLight }]}>Aquí aparecerán tus solicitudes de soporte</SubtitleText>
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
});

export default SupportRequests;
import EmptySvgPush from '@/assets/svg/Push.svg';
import BodyText from '@/src/components/shared/BodyText';
import { Screen } from '@/src/components/shared/Screen';
import TitleText from '@/src/components/shared/TitleText';
import { useTheme } from '@/src/context/ThemeContext';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const NotificationsScreen: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Screen style={[styles.container]}> 
    
      <View style={styles.centerContent}>
        <EmptySvgPush width={320} height={320} style={styles.emptyImage} />
        <TitleText style={[styles.emptyTitle, { color: colors.primaryLight }]}>Sin notificaciones</TitleText>
  
        <BodyText style={[styles.emptyBody, { color: colors.textSecondary }]}>Cuando recibas novedades, las verás en este espacio.</BodyText>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
  },
  emptyImage: {

  },
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
    paddingHorizontal: 8,
  },
});

export default NotificationsScreen;
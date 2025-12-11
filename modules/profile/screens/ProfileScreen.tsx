
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MenuSection } from '../../../components/shared/MenuSection';
import { Screen } from '../../../components/shared/Screen';
import { useTheme } from '../../../context/ThemeContext';
import { ProfileHeader } from '../components/ProfileHeader';

export function ProfileScreen() {
  const { colors, toggleTheme, isDark } = useTheme();
  const userName = 'Valeria contreras';

  const accountItems = [
    {
      icon: 'person-outline',
      label: 'Información personal',
      onPress: () => console.log('Información personal'),
    },
    {
      icon: 'settings-outline',
      label: 'Configuración',
      onPress: () => console.log('Configuración'),
    },
  ];

  const generalItems = [
    {
      icon: 'home-outline',
      label: 'Inicio',
      onPress: () => console.log('Inicio'),
    },
    {
      icon: 'star-outline',
      label: 'Favoritos',
      onPress: () => console.log('Favoritos'),
    },
  ];

  const supportItems = [
    {
      icon: 'help-circle-outline',
      label: 'Obtener ayuda',
      onPress: () => console.log('Obtener ayuda'),
    },
    {
      icon: 'chatbubble-outline',
      label: 'Contactar soporte',
      onPress: () => console.log('Contactar soporte'),
    },
  ];

  return (
    <Screen >


      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.safeArea}>
          <ProfileHeader
            userName={userName}
            onPress={() => router.push('/profile/details')}
          />

          <MenuSection title="Cuenta" items={accountItems} />
          <MenuSection title="General" items={generalItems} />
          <MenuSection title="Soporte" items={supportItems} />
{/* 
          <Pressable
            onPress={toggleTheme}
            style={[
              styles.themeButton,
              {
                backgroundColor: colors.primaryLight,
                shadowColor: '#000',
              },
            ]}
          >
            <Ionicons
              name={isDark ? 'sunny' : 'moon'}
              size={20}
              color="#fff"
              style={styles.themeIcon}
            />
            <Text style={styles.themeButtonText}>
              {isDark ? 'Modo claro' : 'Modo oscuro'}
            </Text>
          </Pressable> */}

          <View style={styles.logoutContainer}>
            <Pressable
              onPress={() => {
                router.replace('/login');
              }}
            >
              <Text style={[styles.logoutText, { color: colors.textSecondary }]}>
                Cerrar sesión
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
  },
  safeArea: {
    paddingHorizontal: 20,
  },
  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 14,
    marginBottom: 32,
  },
  themeIcon: {
    marginRight: 10,
  },
  themeButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  logoutContainer: {
    alignItems: 'center',
    paddingTop: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

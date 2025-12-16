
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MenuSection } from '../../../components/shared/MenuSection';
import { Screen } from '../../../components/shared/Screen';
import { useTheme } from '../../../context/ThemeContext';
import { ProfileHeader } from '../components/ProfileHeader';
import ConfirmActionModal from '@/components/shared/Modal';

export function ProfileScreen() {
  const { colors, toggleTheme, isDark } = useTheme();
  const {user, logout} = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const userName = user?.user_name || 'Usuario';

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
      onPress: () => router.push('profile/support'),
    },
    {
      icon: 'chatbubble-outline',
      label: 'Contactar soporte',
      onPress: () => console.log('Contactar soporte'),
    },
  ];

 return (
  <Screen>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.safeArea}>
        <ProfileHeader
          userName={userName}
          onPress={() => router.push("/profile/details")}
        />

        <MenuSection title="Cuenta" items={accountItems} />
        <MenuSection title="General" items={generalItems} />
        <MenuSection title="Soporte" items={supportItems} />

        <Pressable
          onPress={() => setShowLogoutConfirm(true)}
          style={[
            styles.themeButton,
            { backgroundColor: colors.primaryLight },
          ]}
        >
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </View>
    </ScrollView>

    <ConfirmActionModal
      visible={showLogoutConfirm}
      title="Cerrar sesión"
      description="¿Estás seguro que deseas cerrar sesión?"
      confirmText="Sí, cerrar sesión"
      cancelText="Cancelar"
      variant="danger"
      onCancel={() => setShowLogoutConfirm(false)}
      onConfirm={async () => {
        setShowLogoutConfirm(false);
        await logout();
        router.replace("/login");
      }}
    />
  </Screen>
);

}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
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
    marginBottom: 100,
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
    marginBottom: 50,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});

import { Stack } from 'expo-router';
import { ProfileScreen } from '../../modules/profile/screens/ProfileScreen';

export default function Profile() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Perfil',
          headerShadowVisible: false,
        }}
      />
      <ProfileScreen />
    </>
  );
}

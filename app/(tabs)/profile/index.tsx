import { ProfileScreen } from '@/src/modules/profile/screens/ProfileScreen';
import { Stack } from 'expo-router';

export default function Profile() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Perfil',
          headerShadowVisible: false,
          presentation: 'card',
          
        }}
      />
      <ProfileScreen />
    </>
  );
}

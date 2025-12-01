import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useContext, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async () => {
    try {
      await login(user, pass);
    } catch {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Iniciar Sesión</Text>
      <TextInput
        placeholder="Usuario"
        value={user}
        onChangeText={setUser}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        placeholder="Contraseña"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

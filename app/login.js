import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useContext, useState } from 'react';
import { AuthContext, useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { TextContent, TextSubTitles, TextTitles } from '../components/TextCustom';


export default function LoginScreen() {
  const { login, setLoading, loading } = useAuth();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!user || !pass) {
      Alert.alert('Error', 'Por favor ingresa usuario y contraseña');
      return;
    }
    setLoading(true);
    try {
      await login(user, pass);
      router.replace('/(tabs)');
    } catch {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <View style={styles.form}>
        <TextTitles className={'mb-3 font-bold'}>¡Tu espacio te espera!</TextTitles>
        <TextContent className={'mb-6'}>Inicia sesión en tu cuenta</TextContent>
        <TextInput
          placeholder="Usuario"
          value={user}
          onChangeText={setUser}
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña"
          value={pass}
          onChangeText={setPass}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text className={'text-white text-xl'}>{loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    height: 52,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#B0B0B0',
  },
})

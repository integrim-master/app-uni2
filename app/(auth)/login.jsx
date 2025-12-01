import { View, Text, TextInput, Button, Alert, StyleSheet, Image, Pressable } from 'react-native';
import { useContext, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import imageLogo from '../../assets/images/logo-careme-black.png';
import { Colors } from '../../themes/colors';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.containerImage}>
        <View style={styles.imageContainer}>
          <Image source={imageLogo} style={styles.image} />
        </View>
      </View>
 
      <View style={styles.form}>
        <Text style={styles.text}>Iniciar Sesión</Text>
        <TextInput
          placeholder="Usuario"
          value={user}
          onChangeText={setUser}
          style={styles.TextInput}
          placeholderTextColor="#666"
        />
        <TextInput
          placeholder="Contraseña"
          value={pass}
          onChangeText={setPass}
          secureTextEntry
          style={styles.TextInput}
          placeholderTextColor="#666"
        />
        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  containerImage: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: '25%',
    width: '100%',
  },
  imageContainer: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  form: {
    backgroundColor: '#fff',
    borderEndStartRadius: 30,
    borderStartStartRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
    padding: 30,
    width: '100%',
    height: '70%',
    alignItems: 'center',
    gap: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  TextInput: {
    fontSize: 16,
    fontWeight: '500',
    borderBottomWidth: 2,
    borderBottomColor: Colors.secondary,
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 5,
    color: '#2c3e50',

  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

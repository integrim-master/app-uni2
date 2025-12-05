import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

export default function StepTwo() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const { colors } = useTheme();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}> 
        <Text style={[styles.message, { color: colors.text }]}> 
          Necesitamos tu permiso para mostrar la cámara
        </Text>
        <Pressable 
          style={[styles.permissionButton, { backgroundColor: colors.primary }]}
          onPress={requestPermission}
        >
          <Text style={styles.text}>Conceder Permiso</Text>
        </Pressable>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={styles.centeredContent}>
        <View style={[styles.cameraContainer, { borderColor: colors.border }]}> 
          <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
        </View>
        <TouchableOpacity 
          style={[styles.switchButton, { backgroundColor: colors.primary }]} 
          onPress={toggleCameraFacing}
        >
          <Text style={styles.text}>Cambiar Cámara</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    height: '100%',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 16,
    fontSize: 16,
  },
  cameraContainer: {
    width: 280,
    height: 380,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#000',
    borderWidth: 2,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  camera: {
    flex: 1,
  },
  switchButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: 160,
  },
  permissionButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: 160,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

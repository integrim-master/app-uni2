import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import SendPhoto from './loadingPhoto';

export default function StepTwo() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showLoaderSendPhoto, setShowLoaderSendPhoto] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const { colors } = useTheme();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}> 
        <Text style={[styles.permissionMessage, { color: colors.text }]}> 
          Necesitamos tu permiso para usar la cámara
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

  const takePicture = async () => {
    try {
      setLoading(true);
      const photo = await cameraRef.current?.takePictureAsync();
      if (photo) setPhotoUri(photo.uri);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
     {
      showLoaderSendPhoto ? (
        <SendPhoto />
        
      ) : (

         <View style={styles.centeredContent}>
        <View style={[styles.cameraContainer, { borderColor: colors.border }]}> 
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.camera} />
          ) : (
            <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
          )}
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
        </View>

        <View style={styles.buttonRow}>
          <Pressable 
            style={[styles.roundButton, { backgroundColor: colors.primary }]}
            onPress={toggleCameraFacing}
          >
            <Text style={styles.text}>Cambiar</Text>
          </Pressable>

          <Pressable 
            style={[styles.roundButton, { backgroundColor: colors.primary }]}
            onPress={photoUri ? () => setPhotoUri(null) : takePicture}
          >
            <Text style={styles.text}>{photoUri ? 'Repetir' : 'Capturar'}</Text>
          </Pressable>
        </View>

        {photoUri && (
          <Pressable onPress={()=>{setShowLoaderSendPhoto(true)}} style={[styles.successMessage]}> <Text>Enviar photo pa</Text> </Pressable>
        )}
      </View>
      )
     }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  permissionMessage: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
    opacity: 0.8,
  },
  cameraContainer: {
    width: 300,
    height: 420,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#000',
    borderWidth: 1.5,
    marginBottom: 28,
    elevation: 6,
  },
  camera: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  roundButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 50,
    minWidth: 140,
    alignItems: 'center',
  },
  permissionButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 180,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  successMessage: {
    marginTop: 14,
    fontSize: 16,
    opacity: 0.9,
  },
});

import BodyText from '@/components/shared/BodyText';
import SubtitleText from '@/components/shared/SubtitleText';
import { MaterialIcons } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import SendPhoto from './loadingPhoto';
import ResultView from './ResultView';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function StepTwo() {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showLoaderSendPhoto, setShowLoaderSendPhoto] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const { colors } = useTheme();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}> 
        <MaterialIcons name="camera-alt" size={70} color={colors.primary} style={{ marginBottom: 20 }} />

        <SubtitleText style={[styles.permissionMessage, { color: colors.text }]}>
          Necesitamos tu permiso para usar la cámara
        </SubtitleText>

        <BodyText style={[styles.permissionSubtext, { color: colors.textSecondary }]}>
          Esto nos permitirá capturar tu foto para el diagnóstico
        </BodyText>

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

  const handleSendPhoto = () => setShowLoaderSendPhoto(true);
  const handleAnalysisComplete = () => {
    setShowLoaderSendPhoto(false);
    setShowResults(true);
  };
  const handleReset = () => {
    setPhotoUri(null);
    setShowResults(false);
    setShowLoaderSendPhoto(false);
  };

  if (showResults && photoUri) {
    return <ResultView photoUri={photoUri} onReset={handleReset} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      {showLoaderSendPhoto ? (
        <SendPhoto onComplete={handleAnalysisComplete} />
      ) : (
        <View style={styles.centeredContent}>

          <SubtitleText style={[styles.instructionText, { color: colors.text }]}>
            {photoUri ? '¡Foto capturada!' : 'Centra tu rostro'}
          </SubtitleText>
          
          <View 
            style={[
              styles.cameraContainer,
              { 
                borderColor: colors.primary,
                shadowColor: colors.primary,
              }
            ]}
          >
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.camera} />
            ) : (
              <>
                <CameraView ref={cameraRef} style={styles.camera} facing={facing} />

                {/* Marco guía reducido para pantallas pequeñas */}
                <View style={styles.faceGuide}>
                  <View style={[styles.corner, styles.topLeft, { borderColor: colors.primary }]} />
                  <View style={[styles.corner, styles.topRight, { borderColor: colors.primary }]} />
                  <View style={[styles.corner, styles.bottomLeft, { borderColor: colors.primary }]} />
                  <View style={[styles.corner, styles.bottomRight, { borderColor: colors.primary }]} />
                </View>
              </>
            )}

            {loading && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.loadingText}>Capturando...</Text>
              </View>
            )}
          </View>

          {!photoUri && (
            <BodyText style={[styles.tipText, { color: colors.textSecondary }]}>
              Asegúrate de estar en un lugar bien iluminado
            </BodyText>
          )}


          <View style={styles.controlsContainer}>
            {!photoUri && (
              <Pressable 
                style={[styles.smallButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={toggleCameraFacing}
              >
                <MaterialIcons name="flip-camera-ios" size={24} color={colors.primary} />
              </Pressable>
            )}

            <Pressable 
              style={[
                styles.captureButton,
                { backgroundColor: photoUri ? colors.backgroundLight : colors.primary }
              ]}
              onPress={photoUri ? () => setPhotoUri(null) : takePicture}
            >
              {photoUri ? (
                <MaterialIcons name="refresh" size={28} color={colors.primary} />
              ) : (
                <View style={[styles.captureInner]} />
              )}
            </Pressable>

            {photoUri && (
              <Pressable 
                style={[styles.smallButton, { backgroundColor: colors.primary }]}
                onPress={handleSendPhoto}
              >
                <MaterialIcons name="check" size={24} color="#fff" />
              </Pressable>
            )}

            {!photoUri && <View style={styles.smallButtonPlaceholder} />}
          </View>
        </View>
      )}
    </View>
  );
}

const CAMERA_WIDTH = SCREEN_WIDTH * 0.85;
const CAMERA_HEIGHT = SCREEN_HEIGHT * 0.48;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContent: {
    width: "100%",
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  instructionText: {
    fontSize: SCREEN_HEIGHT < 700 ? 18 : 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },

  /* PERMISOS */
  permissionMessage: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  permissionSubtext: {
    fontSize: 14,
    marginBottom: 28,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  permissionButton: {
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 10,
  },

  /* CÁMARA */
  cameraContainer: {
    width: CAMERA_WIDTH,
    height: CAMERA_HEIGHT,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 2,
    backgroundColor: '#000',
    marginBottom: 12,
  },
  camera: {
    flex: 1,
  },


  faceGuide: {
    position: 'absolute',
    top: '18%',
    left: '12%',
    right: '12%',
    bottom: '18%',
  },
  corner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderWidth: 3,
    borderRadius: 6,
  },
  topLeft: { left: 0, top: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  topRight: { right: 0, top: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  bottomLeft: { left: 0, bottom: 0, borderRightWidth: 0, borderTopWidth: 0 },
  bottomRight: { right: 0, bottom: 0, borderLeftWidth: 0, borderTopWidth: 0 },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  loadingText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 10,
    fontWeight: '600',
  },

  tipText: {
    fontSize: 13,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },


  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
    paddingTop: 12,
  },
  smallButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  smallButtonPlaceholder: {
    width: 48,
    height: 48,
  },

  captureButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
  },

  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

import * as ImagePicker from "expo-image-picker";
import { useContext, useEffect, useState } from "react";
import { Button, View, Alert, ScrollView, Text, Pressable, FlatList, TouchableOpacity } from "react-native";
import { useAuth } from "../../context/AuthContext";
import ReportCard from "../../components/screen/Diagnostico/ReportCard";
import wpService from "../../services/wordpress";
import { useLoading } from "../../context/LoadingContext";
import { PostsContext } from "../../context/PostsContext";
import { Screen } from "../../components/Screen";
import { CameraIcon } from "../../components/Icons";
import { TextSubTitles, TextTitles } from "../../components/TextCustom";
import { ProductsContext } from "../../context/ProductsContext";
import ItemProduct from "../../components/screen/Diagnostico/ItemProduct";
import { Animated, Easing, Image } from "react-native";

export default function diagnostico() {
  const { user, token, membership, loadAuth } = useAuth();
  const { lastReport, uploadReport, getDiagnosticos, loadingDiagnostico } = useContext(PostsContext)
  const { runWithLoading } = useLoading();
  const {products} = useContext(ProductsContext)
  const [active, setActive] = useState('')
  const { color1:dark, color2:light, color3:colorFondo } = membership.colors;
  const [processing, setProcessing] = useState(false);
  const [photo, setPhoto] = useState(null);
  const scanY = new Animated.Value(0);

  useEffect(() =>{
    loadAuth();
    if(token) getDiagnosticos();
    setActive('');
  }, [token])

  useEffect(() => {
    if (processing) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanY, {
            toValue: 400, // misma altura que la imagen
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
          Animated.timing(scanY, {
            toValue: 0,
            duration: 0,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      scanY.stopAnimation();
    }
  }, [processing]);

  const handleTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso requerido", "Se necesita permiso para usar la cámara");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 1 });
      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
        setProcessing(true);

        try {
          await uploadReport(result.assets[0]);
        } finally {
          setProcessing(false);
          setPhoto(null);
        }
      }
    } catch (err) {
      console.error("Error ❌", err);
      setProcessing(false);
    }
  };

  const toggleTakePhoto = () =>{
    if(active){
      setActive('')
    } else {
      setActive('active')
    }
  }

  if (loadingDiagnostico) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>Cargando citas...</Text>
      </View>
    );
  }
  if (processing && photo) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
        <View style={{ width: 300, height: 400, overflow: "hidden", borderRadius: 20 }}>
          <Image
            source={{ uri: photo }}
            style={{ width: "100%", height: "100%", opacity: 0.9 }}
          />
          {/* Animación tipo scanner */}
          <Animated.View
            style={{
              position: "absolute",
              top: scanY,
              left: 0,
              width: "100%",
              height: 6,
              backgroundColor: "rgba(0,255,0,0.6)",
              shadowColor: "#00FF00",
              shadowOpacity: 0.8,
              shadowRadius: 8,
            }}
          />
        </View>
        <Text style={{ color: "#fff", marginTop: 20, fontSize: 18 }}>Analizando imagen...</Text>
      </View>
    );
  }
  return (
      <ScrollView
        className="flex-1" 
        showsVerticalScrollIndicator={false}

      > 
        <Screen withTopInset={false}>
            <View>
              {
                lastReport && !
                active?(
                  <View>
                    <Pressable onPress={toggleTakePhoto}>
                      {
                        ({pressed})=>(
                        <View className="justify-between flex-row py-3 items-center">
                          <TextTitles>Tu Análisis</TextTitles>
                          <TextSubTitles className="text-white p-3 rounded-3xl" style={{backgroundColor: dark}}>Realizar otro analisis</TextSubTitles>
                        </View>
                        )
                      }
                    </Pressable>
                    {
                      active&&(
                        <View className="bg-white justify-center items-center border-dashed border-2 border-gray-300 rounded-3xl p-6 gap-8 mb-5">
                          <View style={{backgroundColor: colorFondo}} className="p-10 rounded-full">
                            <CameraIcon size={30}/>
                          </View>
                          <TextTitles className="text-center">Toma una foto de tu rostro para comenzar el analisis</TextTitles>
                          <Pressable
                            onPress={handleTakePhoto}
                            className="w-full" 
                          >
                            {
                              ({pressed})=>(
                                <View className={`w-full py-4 justify-center items-center rounded-2xl ${pressed? 'opacity-50':'opacity-100'}`} style={{backgroundColor: dark}}>
                                  <TextTitles className="text-white">Tomar foto</TextTitles>
                                </View>
                              )
                            }
                
                          </Pressable>
                        </View>
                      )
                    }
                  </View>
                ):(
                  <View className="bg-white justify-center items-center border-dashed border-2 border-gray-300 rounded-3xl p-6 gap-8 mb-5">
                    <View style={{backgroundColor: colorFondo}} className="p-10 rounded-full">
                      <CameraIcon size={30}/>
                    </View>
                    <TextTitles className="text-center">Toma una foto de tu rostro para comenzar el analisis</TextTitles>
                    <Pressable
                      onPress={handleTakePhoto}
                      className="w-full" 
                    >
                      {
                        ({pressed})=>(
                          <View className={`w-full py-4 justify-center items-center rounded-2xl ${pressed? 'opacity-50':'opacity-100'}`} style={{backgroundColor: dark}}>
                            <TextTitles className="text-white">Tomar foto</TextTitles>
                          </View>
                        )
                      }
          
                    </Pressable>
                  </View>
                )
              }

              <View className="gap-5">
                <ReportCard report={lastReport} baseUrl={wpService.baseUrl} />
                <ItemProduct data={products} fondo={colorFondo} productReport={lastReport.procedimientos}/>
              </View>
            </View>
        </Screen>
      </ScrollView>
  );
}

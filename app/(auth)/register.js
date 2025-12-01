import { View, Text, StyleSheet, Pressable, TextInput, Image } from 'react-native'
import React from 'react'
import videoIntro from '../../assets/videos/intro-sesion.mp4';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { TextContent, TextIntro, TextTitles } from '../../components/TextCustom';

export default function register() {

  return (
        <View edges={['top']} className="flex-1 bg-golden-blackPage">
            <View className="basis-80 items-center justify-center px-8 pt-8 gap-5">      
                <TextIntro className="capitalize text-center text-white">únete a nuestra experiencia</TextIntro>
                <TextContent className="text-center text-white">¡Regístrate y empieza a disfrutar de lo que tenemos para ti!</TextContent>
            </View> 
            <View className="flex-1 justify-center items-center bg-white rounded-s-3xl">
                <Text className='text-3xl capitalize font-semibold'>Porque te lo mereces</Text>
                <View className="p-2">
                    <Pressable          
                        style={({ pressed }) => [
                            styles.button,
                            { opacity: pressed ? 0.5 : 1 }
                        ]}
                        onPress={() => router.navigate("/")}
                    >
                        <Text className="text-xl text-black">REGISTER</Text>
                    </Pressable>
                    <Pressable          
                        style={({ pressed }) => [
                            styles.button,
                            { opacity: pressed ? 0.5 : 1 }
                        ]}
                        onPress={() => router.navigate("/")}
                    >
                        <Text className="text-xl text-black">Volver</Text>
                    </Pressable>
                </View> 
            </View>
        </View>
  )
}
import { View, Text, StyleSheet, Pressable, TextInput, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import imageLogo from '../../../assets/images/logo-careme-black.png';
import videoIntro from '../../../assets/videos/intro-sesion.mp4';
import { useVideoPlayer, VideoView } from 'expo-video';
import Animated, { SharedTransition, useEvent } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { muteIcon, pauseIcon, playIcon, soundIcon } from '../../../components/Icons';
import { TextContent, TextTitles } from '../../../components/TextCustom';
export default function HomeScreen() {
      const router = useRouter();
    const player = useVideoPlayer(videoIntro, player => {
      player.loop = true;
      player.play();
    });
    const [muted, setMuted] = useState(false);
    const [play, setPlay] = useState(false);
    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });


    const toggleMute = () => {
        if (muted) {
            player.volume = 1; // 🔊 sonido activado
        } else {
            player.volume = 0; // 🔇 mute
        }
            setMuted(!muted);
    };
    const togglePlay = () => {
        if (play) {
            player.play();
            setPlay(true)
        } else {
            player.pause();
        }
        setPlay(!play)
    };

  
    return (
        <SafeAreaView edges={['top']} className="flex-1">
            <View className="flex-2">       
                <View>
                    <VideoView
                    style={{ width: "100%", height: 330 }}
                    player={player}
                    fullscreenOptions={{
                        enabled: false, // reemplaza allowsFullscreen={false}
                    }}
                    pictureInPictureOptions={{
                        enabled: false, // reemplaza allowsPictureInPicture={false}
                    }}
                    nativeControls={false}
                    pointerEvents="none"   // sigue funcionando igual
                    />

                    <Pressable
                        onPress={toggleMute}
                        className="absolute top-5 right-5 bg-black/50 px-4 py-2 rounded-full"

                    >
                        {muted ?  muteIcon : soundIcon}
                    </Pressable>
                    <Pressable
                        onPress={togglePlay}
                        className="absolute top-20 right-5 bg-black/50 px-4 py-2 rounded-full"
                    >
                        {play ? playIcon : pauseIcon}
                    </Pressable>
                </View>
            </View> 
            <View className="flex-1 items-center justify-center py-9 px-6 gap-10">
                <Image source={imageLogo} className='w-full h-1/6' resizeMode='cover'/>
                <TextTitles className='capitalize font-semibold'>Este es tu espacio</TextTitles>
                <TextContent className='text-xl text-center font-poppinsBold'>Regístrate o inicia sesión y continúa dándote el gusto que mereces</TextContent>
                <View className="p-2 gap-5">
                    <Pressable
                        onPress={() => {
                            player.pause(); // 🔹 pausar antes de navegar
                            router.push("/register");
                        }}
                        className="rounded-full items-center"
                    >
                        {({ pressed }) => (
                            <Text
                            className={`text-xl text-white rounded-full w-80 text-center py-5 items-center ${
                                pressed ? "bg-yellow-200" : "bg-yellow-500"
                            }`}
                            >
                            Registrarse
                            </Text>
                        )}
                    </Pressable>
                    <Pressable
                       onPress={() => {
                            player.pause(); // 🔹 pausar antes de navegar
                            router.push("/login");
                        }}
                    className="rounded-full items-center"
                    >
                        {({ pressed }) => (
                            <Text
                            className={`text-xl text-white rounded-full w-80 text-center py-5 items-center ${
                                pressed ? "bg-yellow-200" : "bg-yellow-400"
                            }`}
                            >
                            Iniciar Sesion
                            </Text>
                        )}
                    </Pressable>
                </View> 
            </View>
        </SafeAreaView>
    )
}
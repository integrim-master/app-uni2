import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useAuth } from '../context/AuthContext';
import { CalendarIcon, GiftIcon, HomeIcon } from 'lucide-react-native';
import { AddIcon, UserICon } from './Icons';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const TabBarButton = ({onPress, onLongPress, routName, isFocused, color, label}) => {
    const { membership, loading, token, user } = useAuth();
    if (loading) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        </View>
    );
    }

    if (!token || !membership || !user) {
    return null;
    }

    const icon = {
        index: (props) => <HomeIcon size={24} color={"#fff"} {...props}/>,
        citas: (props) => <CalendarIcon  size={24} color={"#fff"} {...props}/>,
        agendar: (props) => <AddIcon size={24}  color={"#fff"} {...props}/>,
        beneficios: (props) => <GiftIcon size={24}  color={"#fff"} {...props}/>,
        perfil: (props) => <UserICon  size={24} color={"#fff"} {...props}/>
    }
    const scale = useSharedValue(0)
    useEffect(()=>{
        scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1:0) : isFocused, {duration: 800})
    },[scale, isFocused])

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
        const top = interpolate(scale.value, [0, 1], [0, 9])
        return {
            transform:[{
                scale: scaleValue
            }],
            top
        }
    })


    // Si manejamos texto activamos el Animate.Text
    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scale.value, [0, 1], [1, 0])

        return {
            opacity
        }
    })
  return (
    <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        className='flex-1 justify-center items-center gap-2'
    >
        <Animated.View style={animatedIconStyle}> 
            {
                icon[routName]({
                    color
                })
            }
        </Animated.View>
        <Animated.Text style={[{ color, fontSize: 12}, animatedTextStyle]}>{label}</Animated.Text>
    </Pressable>
  )
}

export default TabBarButton
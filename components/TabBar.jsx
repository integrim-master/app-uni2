import { View, Platform, ActivityIndicator } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { useContext, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DotIcon } from 'lucide-react-native';
import { AddIcon, CalendarIcon, GiftIcon, HomeIcon, UserICon } from './Icons';
import TabBarButton from './TabBarButton';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export function TabBar({ state, descriptors, navigation }) {
    const { membership, loading, token, user } = useAuth();
    if (loading) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        </View>
    );
    }

    if (!token || !membership || !user) {
    return null; // Evita que se intente acceder a membership
    }

    const { color1:dark, color2:light, color3:transparent } = membership.colors;

  const [dimensions, setDimensions] = useState({height:20, width:100})

  const buttonWidth = dimensions.width / state.routes.length;

  const onTabbarLayout = (e) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    })
  }

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: tabPositionX.value}]
    }
  })
  return (
    <View onLayout={onTabbarLayout} className='flex-row justify-between items-center rounded-full py-4'>
      <Animated.View style={[animatedStyle,{
        position: 'absolute',
        backgroundColor: dark, 
        left: '3.2%',
        borderRadius: 50,
        height: dimensions.height - 20, 
        width: buttonWidth-26,
        }]}/>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {duration: 1500})
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
            <TabBarButton
                key={route.name}
                onPress={onPress}
                onLongPress={onLongPress}
                isFocused={isFocused}
                routName={route.name}
                color={isFocused ? 'white' : dark}
                label={label}
            />
        //   <PlatformPressable
        //     key={route.name}
        //     href={buildHref(route.name, route.params)}
        //     accessibilityState={isFocused ? { selected: true } : {}}
        //     accessibilityLabel={options.tabBarAccessibilityLabel}
        //     testID={options.tabBarButtonTestID}
        //     onPress={onPress}
        //     onLongPress={onLongPress}
        //     className='flex-1 justify-center items-center gap-2'
        //   >
        //     {
        //         icon[route.name]({
        //             color: isFocused ? dark : "#fff"
        //         })
        //     }
        //   </PlatformPressable>
        );
      })}
    </View>
  );
}

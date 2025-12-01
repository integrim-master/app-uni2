import { View, Text, TextBase } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { Screen } from '../components/Screen'
import { useAuth } from '../context/AuthContext';
import { TextContent, TextIntro, TextTitles } from '../components/TextCustom';

export default function Detail() {
    const { user, membership, loading } = useAuth();
    const {beneficioID} = useLocalSearchParams()
    const benefit = membership.benefits.find(b => b.procedimiento === beneficioID);
    return (
    <Screen>
        <Stack.Screen
          options={{
            headerShown: true
          }}/>
        {benefit ? (
        <View>
            <TextTitles className="text-black">{benefit.procedimientoLabel}</TextTitles>
            <View>
              <TextContent>{benefit.descripcion}</TextContent>
            </View>
        </View>
        ) : (
        <Text>paila</Text>
        )}
    </Screen>
    );
}
import { StyleSheet, Text, View } from 'react-native'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import React from 'react'

export const toastConfig = {

    success: (props) => (
        <View>
            <BaseToast
            {...props}
            style={{ borderColor: '#17c964' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 16,
                fontWeight: '600',
                color: "#17c964"
            }}
            text2Style={{
                fontSize:12,
                color: "#17c964"
            }}
            />
        </View>
    ),
    error: (props) => (
        <ErrorToast
        {...props}
        style={{ borderColor: '#C91717' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
            fontSize: 16,
            fontWeight: '600',
            color: "#C91717"
        }}
        text2Style={{
            fontSize: 12,
            color: "#C91717"
        }}
        />
    ),
    tomatoToast: ({ text1, props }) => (
        <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        <View>
            <Text>{text1}</Text>
            <Text>{props.uuid}</Text>
        </View>
        </View>
    )
}

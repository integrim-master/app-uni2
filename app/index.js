import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../context/AuthContext";


export default function Index() {
    const {user, loading} = useAuth();
    const router = useRouter();
    
    useEffect(() => {
        if(loading) return;
            if(user) {
                router.replace('/(tabs)')
            } else {
                router.replace('/login')
            }
    }, [user, loading]);

    return (
        <View className="flex-1 justify-center items-center bg-white">
            <ActivityIndicator size="large" color="#007aff"/>
        </View>
    )
}
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import HomeScreen from "../modules/home/components/HomeScreen";


export default function Index() {
    const {user, loading} = useAuth();
    const router = useRouter();
    
    useEffect(() => {
        if(loading) return;
            if(user) {
                router.replace('/(tabs)')
            } else {
              
            }
    }, [user, loading]);

    return (      
        <HomeScreen/>
    )
}
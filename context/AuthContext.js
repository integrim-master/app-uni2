// context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import wpService from '../services/wordpress';
import { useLoading } from "./LoadingContext";
import { loginApi, meApi } from '../services/auth';
import { registerForPushNotificationsAsync } from '../provider/NotificationProvider';

const AuthContext = createContext(undefined);

export function AuthProvider ({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [membership, setMembership] = useState(null);
    const [loading, setLoading] = useState(true);
    const {showLoading, hideLoading} = useLoading();

    useEffect(() => {
        loadAuth();
    }, []);

    const loadAuth = async () => {
        try {
            const saved = await AsyncStorage.getItem("wp_token");
            if (saved) {
                const { userInfo, token, membership } = JSON.parse(saved);
                setUser(userInfo);
                setToken(token)
                setMembership(membership);
                registerForPushNotificationsAsync(user.id);
            }
        } catch (e) {
            console.error("Error cargando sesión:", e);
        } finally {
            setLoading(false);
        }
    };

    const refreshUserData = async () =>  {
        if (!token) return;
        try {
        await fetchData(token);
        } catch (error) {
        console.error("Error refrescando usuario:", error);
        }
    };

    const applicationBenefit = async (procedimientoLabel, procedimiento) => {
        const name = user.display_name
        const response = await wpService.applicationBenefit(user?.id, name, user?.ciudad, user?.telefono, user?.identificacion, procedimientoLabel, procedimiento );
        return response
    }

    const updateUser = async (data) => {
        const userID = user.id;
        const response = await wpService.updateUserData(userID, data);
        return response;
    }

    const login = async(username, password) => {
        showLoading("Iniciando sesión...");
        try{
            const data = await loginApi(username, password);
            const userData = await meApi(data.token);
            const userConsolid = {token: data.token, userInfo: userData.user_data, membership: userData.membership_data}
            setUser(userData);
            setToken(data.token);
            setMembership(userData.membership_data);
            await AsyncStorage.setItem("wp_token", JSON.stringify(userConsolid));
            hideLoading();
        } catch (error) {
            console.error("Error en login:", error);
            throw error;
        } finally {
            hideLoading();
        }
    }
    const logout = async () => {
        showLoading("Cerrando sesión...");
        try {
            await wpService.logout();
            setToken(null);
            setUser(null)
        } catch (error) {
            console.error("Error en logout:", error)
        } finally {
            hideLoading();
        }
    }
    // const borrarToken = async () => {
    //   try {
    //     await AsyncStorage.removeItem('wp_token');
    //     console.log('✅ Token eliminado correctamente');
    //   } catch (error) {
    //     console.log('❌ Error al eliminar el token:', error);
    //   }
    // };
    //     borrarToken();
    return(
        <AuthContext.Provider 
            value={{
                token,
                login,
                logout,
                loading,
                user,
                membership,
                refreshUserData,
                loadAuth,
                updateUser,
                setLoading,
                applicationBenefit
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
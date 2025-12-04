
import { AuthContextType, AuthProviderProps, MembershipData, UserData } from '@/modules/auth/types/auth.types';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLoading } from "./LoadingContext";



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserData | null>(null);
    const [membership, setMembership] = useState<MembershipData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { showLoading, hideLoading } = useLoading();

    useEffect(() => {
        loadAuth();
    }, []);

    const loadAuth = async (): Promise<void> => {
        try {
            const saved = await SecureStore.getItemAsync("wp_token");
            if (saved) {
                const { userInfo, token, membership } = JSON.parse(saved);
                setUser(userInfo);
                setToken(token);
                setMembership(membership);
            } else {
            
                const mockData = {
                    userInfo: {
                        id: "1",
                        display_name: "Usuario Demo",
                        email: "demo@careme.com",
                        ciudad: "Bogotá",
                        telefono: "3001234567",
                        identificacion: "1234567890"
                    },
                    token: "demo_token_123456",
                    membership: {
                        id: "premium",
                        name: "Membresía Premium",
                        colors: {
                            color1: "#2563eb",
                            color2: "#dbeafe",
                            color3: "rgba(37, 99, 235, 0.1)"
                        }
                    }
                };
                setUser(mockData.userInfo);
                setToken(mockData.token);
                setMembership(mockData.membership);
            }
        } catch (e) {
            console.error("Error cargando sesión:", e);
        } finally {
            setLoading(false);
        }
    };

    const refreshUserData = async (): Promise<void> => {
        if (!token) return;
        try {
         
        } catch (error) {
            console.error("Error refrescando usuario:", error);
        }
    };

    const applicationBenefit = async (procedimientoLabel: string, procedimiento: string): Promise<any> => {
        if (!user) throw new Error("Usuario no autenticado");
        
        return {
            success: true,
            message: `Beneficio ${procedimientoLabel} aplicado correctamente`,
            procedimiento: procedimiento,
            usuario: user.display_name,
            fecha: new Date().toISOString()
        };
    };

    const updateUser = async (data: Partial<UserData>): Promise<any> => {
        if (!user) throw new Error("Usuario no autenticado");
        
    
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        
        const currentData = await SecureStore.getItemAsync("wp_token");
        if (currentData) {
            const parsed = JSON.parse(currentData);
            parsed.userInfo = updatedUser;
            await SecureStore.setItemAsync("wp_token", JSON.stringify(parsed));
        }
        
        return {
            success: true,
            message: "Usuario actualizado correctamente",
            user: updatedUser
        };
    };

    const login = async (username: string, password: string): Promise<void> => {
        showLoading("Iniciando sesión...");
        try {
            if (username === "demo" && password === "123456") {
                const dataMocked = {
                    token: "secure_token_" + Date.now(),
                    userInfo: {
                        id: "1",
                        display_name: "Usuario Demo",
                        email: username + "@careme.com",
                        ciudad: "Bogotá",
                        telefono: "3001234567",
                        identificacion: "1234567890"
                    },
                    membership: {
                        id: "premium",
                        name: "Membresía Premium",
                        colors: {
                            color1: "#2563eb",
                            color2: "#dbeafe", 
                            color3: "rgba(37, 99, 235, 0.1)"
                        }
                    }
                };

                setUser(dataMocked.userInfo);
                setToken(dataMocked.token);
                setMembership(dataMocked.membership);
                await SecureStore.setItemAsync("wp_token", JSON.stringify(dataMocked));
            } else {
                throw new Error("Credenciales inválidas. Use demo/123456");
            }
        } catch (error) {
            console.error("Error en login:", error);
            throw error;
        } finally {
            hideLoading();
        }
    };

    const logout = async (): Promise<void> => {
        showLoading("Cerrando sesión...");
        try {
            setToken(null);
            setUser(null);
            setMembership(null);
            await SecureStore.deleteItemAsync("wp_token");
        } catch (error) {
            console.error("Error en logout:", error);
        } finally {
            hideLoading();
        }
    };

    const contextValue: AuthContextType = {
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
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export type { AuthContextType, MembershipData, UserData };


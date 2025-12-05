import TitleText from "@/components/shared/TitleText";
import { useTheme } from "@/context/ThemeContext";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
    const { colors } = useTheme();
    
    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={styles.header}>
                    <Image 
                        source={require('@/assets/images/logo-careme-black.png')} 
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    
                </View>

                <View style={[styles.formContainer, { backgroundColor: colors.card }]}>
                   <View style={{ marginBottom: 24, alignItems: 'center' }}>

                     <TitleText style={[styles.welcomeText, { color: colors.text }]}>
                        Bienvenido
                    </TitleText>
                    <Text style={[styles.subtitleText, { color: colors.textSecondary }]}>
                        Inicia sesión en tu cuenta
                    </Text>
                   </View>
                    <View style={styles.inputWrapper}>
                        <Text style={[styles.label, { color: colors.text }]}>Usuario o Email</Text>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: colors.backgroundLight,
                                    borderColor: colors.border,
                                    color: colors.text,
                                }
                            ]}
                            placeholder="Ingresa tu usuario"
                            placeholderTextColor={colors.textSecondary}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={[styles.label, { color: colors.text }]}>Contraseña</Text>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: colors.backgroundLight,
                                    borderColor: colors.border,
                                    color: colors.text,
                                }
                            ]}
                            placeholder="Ingresa tu contraseña"
                            placeholderTextColor={colors.textSecondary}
                            secureTextEntry={true}
                        />
                    </View>

                    <Pressable style={styles.forgotPassword}>
                        <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
                            ¿Olvidaste tu contraseña?
                        </Text>
                    </Pressable>

                    <Pressable onPress={()=>router.replace('/home')} style={[styles.loginButton, { backgroundColor: colors.primary }]}>
                        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                    </Pressable>

                    <View style={[styles.divider, { backgroundColor: colors.border }]} />

                   
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logo: {
        width: 200,
        height: 80,
        marginBottom: 16,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 8,
    },
    subtitleText: {
        fontSize: 14,
        fontWeight: '400',
    },
    formContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: 10,
        height: '70%',
        padding: 28,
     
    },
    inputWrapper: {
  
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 15,
        fontWeight: '500',
    },
    forgotPassword: {
        alignSelf: 'center',
    },
    forgotPasswordText: {
        fontSize: 13,
        fontWeight: '500',
    },
    loginButton: {
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 18,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    divider: {
        height: 1,
        marginVertical: 16,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupText: {
        fontSize: 13,
        fontWeight: '400',
    },
    signupLink: {
        fontSize: 13,
        fontWeight: '700',
    },
});

export default Login;

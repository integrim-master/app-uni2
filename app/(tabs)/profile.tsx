import TitleText from '@/components/shared/TitleText';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

export default function Profile() {
  const { colors, toggleTheme, isDark } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView style={styles.safeArea}>
        <TitleText style={[styles.mainTitle, { color: colors.text }]}> 
          Perfil
        </TitleText>

        <Pressable style={[styles.profileSection, { backgroundColor: colors.card, borderColor: colors.border }]}> 
          <View style={styles.profileContent}> 
            <Image  
              source={{ uri: 'https://via.placeholder.com/20' }}  
              style={styles.profileImage}
            />
            <View style={styles.profileTextContainer}> 
              <Text style={[styles.profileName, { color: colors.text }]}> 
                Henry Stan
              </Text>
              <Text style={[styles.profileSubtext, { color: colors.textSecondary }]}> 
                Ver perfil
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </Pressable>

        <View style={styles.section}> 
          <Pressable style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}> 
            <View style={styles.menuContent}> 
              <Ionicons name="person-outline" size={24} color={colors.textSecondary} style={styles.menuIcon} />
              <Text style={[styles.menuText, { color: colors.text }]}> 
                Información personal
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </Pressable>

          <Pressable style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}> 
            <View style={styles.menuContent}> 
              <Ionicons name="settings-outline" size={24} color={colors.textSecondary} style={styles.menuIcon} />
              <Text style={[styles.menuText, { color: colors.text }]}> 
                Cuenta
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </Pressable>
        </View>

        <View style={styles.section}> 
          <Text style={[styles.sectionTitle, { color: colors.text }]}> 
              texto prueba
          </Text>
          <Pressable style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}> 
            <View style={styles.menuContent}> 
              <Ionicons name="home-outline" size={24} color={colors.textSecondary} style={styles.menuIcon} />
              <Text style={[styles.menuText, { color: colors.text }]}> 
                texto prueba
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </Pressable>

          <Pressable style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}> 
            <View style={styles.menuContent}> 
              <Ionicons name="star-outline" size={24} color={colors.textSecondary} style={styles.menuIcon} />
              <Text style={[styles.menuText, { color: colors.text }]}> 
                texto prueba
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </Pressable>
        </View>

        <View style={styles.section}> 
          <Text style={[styles.sectionTitle, { color: colors.text }]}> 
              texto prueba
          </Text>
          <Pressable style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}> 
            <View style={styles.menuContent}> 
              <Ionicons name="help-circle-outline" size={24} color={colors.textSecondary} style={styles.menuIcon} />
              <Text style={[styles.menuText, { color: colors.text }]}> 
                Obtener ayuda
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </Pressable>

          <Pressable style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}> 
            <View style={styles.menuContent}> 
              <Ionicons name="chatbubble-outline" size={24} color={colors.textSecondary} style={styles.menuIcon} />
              <Text style={[styles.menuText, { color: colors.text }]}> 
                Contactar soporte
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </Pressable>
        </View>

        <Pressable
          onPress={toggleTheme}
          style={[styles.themeButton, { backgroundColor: colors.primary }]}
        >
          <Ionicons 
            name={isDark ? "sunny" : "moon"} 
            size={20} 
            color="#fff" 
            style={styles.themeIcon}
          />
          <Text style={styles.themeButtonText}>
            {isDark ?  'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          </Text>
        </Pressable>

        <View style={styles.logoutContainer}> 
          <Pressable onPress={()=>{
            router.replace('/login');
          } }  > 
            <Text style={[styles.logoutText, { color: colors.textSecondary }]}> 
              Cerrar sesión
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  mainTitle: {
    fontSize: 28,
    marginBottom: 24,
    paddingLeft: 4,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
    borderWidth: 0.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  profileContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E7EB',
    marginRight: 16,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 2,
  },
  profileSubtext: {
    fontSize: 14,
    fontWeight: "400",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    paddingLeft: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 8,
    marginBottom: 1,
    borderBottomWidth: 0.5,
    backgroundColor: 'transparent',
  },
  menuContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    marginRight: 16,
    width: 24,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "400",
  },
  themeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  themeIcon: {
    marginRight: 8,
  },
  themeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  logoutContainer: {
    alignItems: "center",
    paddingTop: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
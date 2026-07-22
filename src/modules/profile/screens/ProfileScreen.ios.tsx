import { Screen } from "@/src/components/shared/Screen";
import { useTheme } from "@/src/context/ThemeContext";
import {
  Alert,
  Button,
  Host,
  Label,
  List,
  Section,
  Text,
} from "@expo/ui/swift-ui";
import {
  buttonStyle,
  foregroundStyle,
  listStyle,
  scrollContentBackground,
  tint,
} from "@expo/ui/swift-ui/modifiers";
import { useProfileScreen } from "../hooks/useProfileScreen";

export function ProfileScreen() {
  const { colors } = useTheme();
  const {
    userName,
    showLogoutConfirm,
    setShowLogoutConfirm,
    handleLogout,
    goToProfileDetails,
    goToPrivacy,
    contactAdvisor,
  } = useProfileScreen();

  return (
    <Screen fullWidth>
      <Host style={{ flex: 1 }} colorScheme="dark">
        <List
          modifiers={[
            listStyle("insetGrouped"),
            scrollContentBackground("hidden"),
            tint(colors.primary),
          ]}
        >
          <Section>
            <Button onPress={goToProfileDetails} modifiers={[buttonStyle("plain")]}>
              <Label
                title={userName}
                systemImage="person.crop.circle.fill"
                color={colors.primary}
              />
            </Button>
          </Section>

          <Section title="Soporte">
            <Button onPress={contactAdvisor} modifiers={[buttonStyle("plain")]}>
              <Label
                title="Contactar asesor"
                systemImage="bubble.left.and.bubble.right"
                color={colors.primary}
              />
            </Button>
            <Button onPress={goToPrivacy} modifiers={[buttonStyle("plain")]}>
              <Label
                title="Tratamiento de datos"
                systemImage="doc.text"
                color={colors.primary}
              />
            </Button>
          </Section>

          <Section
            footer={
              <Text modifiers={[foregroundStyle(colors.textSecondary)]}>
                Al cerrar sesión tendrás que volver a iniciar sesión para
                acceder a tu cuenta.
              </Text>
            }
          >
            <Alert
              title="Cerrar sesión"
              isPresented={showLogoutConfirm}
              onIsPresentedChange={setShowLogoutConfirm}
            >
              <Alert.Trigger>
                <Button
                  role="destructive"
                  label="Cerrar sesión"
                  modifiers={[buttonStyle("plain")]}
                />
              </Alert.Trigger>
              <Alert.Message>
                <Text>¿Estás seguro que deseas cerrar sesión?</Text>
              </Alert.Message>
              <Alert.Actions>
                <Button
                  label="Sí, cerrar sesión"
                  role="destructive"
                  onPress={handleLogout}
                />
                <Button label="Cancelar" role="cancel" />
              </Alert.Actions>
            </Alert>
          </Section>
        </List>
      </Host>
    </Screen>
  );
}

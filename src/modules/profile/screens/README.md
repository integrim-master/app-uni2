# Pantallas de perfil multiplataforma

Metro elige el archivo según la plataforma al importar `ProfileScreen`:

| Archivo | Plataforma | UI |
|---------|------------|-----|
| `ProfileScreen.ios.tsx` | iOS | SwiftUI (`@expo/ui`) |
| `ProfileScreen.android.tsx` | Android | React Native |
| `ProfileScreen.tsx` | web / fallback | React Native |

**No fusionar ni borrar** los tres: son intencionales.

La lógica (logout, navegación, nombre de usuario) está en `hooks/useProfileScreen.ts`.

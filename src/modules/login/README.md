# Módulo `login` — flujo de la pantalla de autenticación

**Responsabilidad**

- Hooks de mutación usados por `app/(auth)/login.tsx` (`useLogin`, `useTerms`, `useSendNotifications`)
- Tipos de respuesta del login (`types/login.types`)

El HTTP vive en `src/modules/auth/services/auth.service`.  
No duplicar llamadas axios aquí.

Ver también: [`../auth/README.md`](../auth/README.md)

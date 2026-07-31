# Módulo `auth` — infraestructura de sesión

**Responsabilidad**

- Token en SecureStore (`utils/tokenStorage`)
- Helpers de error 401 (`utils/apiError`)
- Queries que solo corren con sesión (`hooks/useAuthQuery`)
- Cliente HTTP de identidad (`services/auth.service`: login, me, terms, push-token)
- Tipos del AuthContext (`types/auth.types`)

**No confundir con `src/modules/login`**

| Módulo | Qué vive aquí |
|--------|----------------|
| `auth` | Sesión + HTTP compartido |
| `login` | Hooks del flujo de la pantalla de login (`useLogin`, `useTerms`, etc.) |

El provider React está en `src/context/AuthContext.tsx` y consume este módulo.

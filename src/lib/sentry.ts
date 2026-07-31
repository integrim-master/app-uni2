import * as Sentry from "@sentry/react-native";

const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;
const environment =
  process.env.EXPO_PUBLIC_APP_ENV ??
  (__DEV__ ? "development" : "production");

/**
 * Inicializa Sentry solo si hay DSN.
 * En local: pon EXPO_PUBLIC_SENTRY_DSN en `.env`.
 * En EAS: env por profile en `eas.json` (preview / production).
 */
export function initSentry() {
  if (!dsn) {
    if (__DEV__) {
      console.warn(
        "[Sentry] EXPO_PUBLIC_SENTRY_DSN no definido — reporting desactivado.",
      );
    }
    return;
  }

  Sentry.init({
    dsn,
    environment,
    enabled: true,
    sendDefaultPii: true,
    enableLogs: true,
    tracesSampleRate: environment === "production" ? 0.2 : 1,
    replaysSessionSampleRate: environment === "production" ? 0.1 : 0.2,
    replaysOnErrorSampleRate: 1,
    integrations: [
      Sentry.mobileReplayIntegration(),
      Sentry.feedbackIntegration(),
    ],
  });
}

export { Sentry };

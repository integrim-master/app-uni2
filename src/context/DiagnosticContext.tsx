import { DiagnosticsServices } from "@/src/modules/diagnostics/services/diagnostic.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const DIAGNOSTIC_STORAGE_KEY = "diagnosticReport";

interface DiagnosticData {
  diagnostico: any;
  procedimientos: any[];
  imagen_url?: string;
  fecha?: string;
  photoUri?: {
    uri: string;
  };
  [key: string]: any;
}

interface DiagnosticContextType {
  diagnosticReport: DiagnosticData | null;
  loading: boolean;
  refreshDiagnostic: () => Promise<void>;
  clearDiagnostic: () => Promise<void>;
}

const DiagnosticContext = createContext<DiagnosticContextType | undefined>(undefined);

export function DiagnosticProvider({ children }: { children: React.ReactNode }) {
  const [diagnosticReport, setDiagnosticReport] = useState<DiagnosticData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();


  useEffect(() => {
    loadDiagnostic();
  }, [user?.user_id]);

  const loadDiagnostic = async () => {
    try {

      const saved = await AsyncStorage.getItem(DIAGNOSTIC_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setDiagnosticReport(parsed);
      }
      if (user?.user_id) {
        await refreshDiagnostic();
      }
    } catch (e) {
      console.error("Error loading diagnostic:", e);
    } finally {
      setLoading(false);
    }
  };
  const refreshDiagnostic = async () => {
    if (!user?.user_id || !token) return;

    try {
      setLoading(true);
      const result = await DiagnosticsServices.getLastDiagnostic({
        userId: user.user_id.toString(),
        token: token,
      });

      if (result.success && result.data) {
        setDiagnosticReport(result.data);
        await AsyncStorage.setItem(DIAGNOSTIC_STORAGE_KEY, JSON.stringify(result.data));
      } else {
        setDiagnosticReport(null);
        await AsyncStorage.removeItem(DIAGNOSTIC_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error refreshing diagnostic:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearDiagnostic = async () => {
    setDiagnosticReport(null);
    await AsyncStorage.removeItem(DIAGNOSTIC_STORAGE_KEY);
  };

  const value: DiagnosticContextType = {
    diagnosticReport,
    loading,
    refreshDiagnostic,
    clearDiagnostic,
  };

  return <DiagnosticContext.Provider value={value}>{children}</DiagnosticContext.Provider>;
}

export function useDiagnostic() {
  const context = useContext(DiagnosticContext);
  if (!context) throw new Error("useDiagnostic must be used within DiagnosticProvider");
  return context;
}

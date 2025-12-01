import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext, useAuth } from "./AuthContext";
import { getCitasApi } from "../services/citas";

export const CitasContext = createContext();

export const CitasProvider = ({ children }) => {
  const [citas, setCitas] = useState([]);
  const { token, user } = useAuth();
  const [loadingCitas, setLoadingCitas] = useState(true)

  const getCitas = async (limit = null) => {
    if (!user?.id || !token) return;
    try {
      const data = await getCitasApi(user.id, token, limit);
      setCitas(data);
    } catch (error) {
      console.error("Error obteniendo citas:", error);
    } finally {
      setLoadingCitas(false)
    }
  };

  useEffect(() => {
    if (user?.id && token) {
      getCitas();
    }
  }, [user?.id, token]); // 👈 se actualiza si hay token y usuario
  
  return (
    <CitasContext.Provider value={{ citas, getCitas, loadingCitas }}>
      {children}
    </CitasContext.Provider>
  );
};

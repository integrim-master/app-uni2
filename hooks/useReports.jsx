import { useEffect, useState } from "react";
import wpService from "../services/wordpress";
import { analyzeImage } from "../services/n8n";

export default function useReports(user) {
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [lastReport, setLastReport] = useState(null);

  const fetchLastReport = async (user) => {
    setLoading(true);
    setStatusMsg("Cargando último informe...");
    try {
      const data = await wpService.getLastReport(user);
      setLastReport(data);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadReport = async (photo) => {
    setLoading(true);
    setStatusMsg("Analizando imagen...");
    try {
      // Paso 1: análisis en N8N
      const { diagnostico, procedimientos } = await analyzeImage(photo);

      // Paso 2: subir imagen a WP
      setStatusMsg("Subiendo imagen...");
      const imageId = await wpService.uploadImage(photo, token, user.id);

      // Paso 3: crear análisis en WP
      setStatusMsg("Creando informe...");
      const report = await wpService.createReport({
        diagnostico,
        procedimientos,
        identificacion: user.id,
        imagen_id: imageId,
      }, token);

      // Refrescar último informe
      await fetchLastReport();
      return report;
    } finally {
      setLoading(false);
    }
  };


  return { loading, statusMsg, lastReport, fetchLastReport, uploadReport };

}

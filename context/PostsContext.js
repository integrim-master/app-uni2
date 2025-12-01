import { View, Text } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import wpService from '../services/wordpress';
import { analyzeImage } from '../services/n8n';
import { createDiagnosticoApi, getDiagnosticosApi, uploadImage } from '../services/diagnosticos';
import { AuthContext, useAuth } from './AuthContext';

export const PostsContext = createContext()
export const PostsProvider = ({children}) => {
    const [lastReport, setLastReport] = useState(null);
    const {user, token} = useAuth();
    const [loadingDiagnosticos, setLoadingDiagnosticos] = useState(null)

    const uploadReport = async (photo) => {
        try {
            console.log("subiremos reporte")

            const { diagnostico, procedimientos } = await analyzeImage(photo);
            console.log(diagnostico);
            console.log(procedimientos);
            const imageId = await postImage(photo);
            console.log(imageId);
            const report = await createDiagnosticoApi(
                diagnostico,
                procedimientos,
                imageId,
                user.id
            );
            await getDiagnosticos();
            return report;
        } catch {
            console.log("Error ❌", err.message || "No se pudo guardar el reporte");
        }
    };

    const postImage = async (photo) => {
        console.log("subiremos foto");
        const infoImage = await uploadImage(photo, user.id, token);
        console.log(infoImage);
        const data = infoImage
        return data
    }

    const getDiagnosticos = async () => {
        if (!user?.id) return;
        try{
            const data = await getDiagnosticosApi(user.id, token);
            setLastReport(data);
        } catch(error) {
            console.error("Error obteniendo citas:", error);
        } finally {
            setLoadingDiagnosticos(false)
        }
    };

    useEffect(() => {
        if (user?.id) {
            getDiagnosticos();
        }
    }, [user]);

    return(
        <PostsContext.Provider
            value={{
                lastReport,
                getDiagnosticos,
                uploadReport,
                postImage,
                loadingDiagnosticos
            }}
        >
            {children}
        </PostsContext.Provider>
    )
}
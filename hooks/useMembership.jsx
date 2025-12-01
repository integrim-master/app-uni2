import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import wpService from '../services/wordpress';

export const useMembership = (membresia='', token) => {
    const [dataMembership, setDataMembership] = useState(null);
    const [loadingMembership, setLoadingMembership] = useState(null);
    const [error, setError] = useState(null);

    const fetchMembership = useCallback(async () =>{
        try{
            setLoadingMembership(true);
            const membershipInfo = await wpService.getmembership();
            setDataMembership(membershipInfo);
        } catch (err) {
            setError(err)
        } finally {
            setLoadingMembership(false)
        }
    }, [membresia]);

    useEffect(() => {
        if(token) {
            fetchMembership();
        }
    }, [token, fetchMembership]);

    //valores derivados
    const benefit = dataMembership?.benefits;
    const colorPrincipal = dataMembership?.colors.color1;
    const colorSecundario = dataMembership?.colors.color2;
    const colorFondo = dataMembership?.colors.color3;


    return {
        benefit,
        colorPrincipal,
        colorSecundario,
        colorFondo,
        loadingMembership,
        error,
        fetchMembership,
    }
}
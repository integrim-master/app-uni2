import { View, Text } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import wpService from '../services/wordpress';


export const ProductsContext = createContext()
export const ProductsProvider= ({children}) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try{
        const response = await wpService.getProductsColombia()
        return response
        }catch {
        console.log("No se pudo cargar");
        }
    };

    useEffect(()=>{
        const init = async () => {
            try{
                const data = await fetchProducts();
                setProducts(data)
            } catch (error) {
                console.error('Error en AuthProvider:', error);
            }
        }
        init();
    }, [])

    return(
        <ProductsContext.Provider
            value={{
                products,
            }}
        >
            {children}
        </ProductsContext.Provider>
    )
}
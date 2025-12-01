// provider/index.js
import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { CitasProvider } from "../context/CitasContext";
import { PostsProvider } from "../context/PostsContext";
import { ProductsProvider } from "../context/ProductsContext";
// importa otros providers...

export default function AppProviders({ children }) {
  return (
      <AuthProvider>
        <CitasProvider>
          <PostsProvider>
            <ProductsProvider>
                {children}
            </ProductsProvider>
        </PostsProvider>
      </CitasProvider>
    </AuthProvider>
  );
}

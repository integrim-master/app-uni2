// context/LoadingContext.js
import React, { createContext, useContext, useState } from "react";
import { ActivityIndicator, Image, Modal, Text, View } from "react-native";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState("");

  const showLoading = (msg = "Cargando...", photo='') => {
    setPhoto(photo)
    setMessage(msg);
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
    setMessage("");
  };

  const runWithLoading = async (promiseFn, msg = "Cargando...", photo='') => {
    try {
      showLoading(msg, photo);
      const result = await promiseFn();
      hideLoading();
      return result;
    } catch (err) {
      hideLoading();
      throw err;
    }
  };


  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading, runWithLoading }}>
      {children}

      {/* Loader global */}
      <Modal visible={loading} transparent animationType="fade">
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="bg-white p-6 rounded-xl flex-row items-center gap-3">
            {
              photo&&(
                <Image source={photo} className="w-48 h-48" resizeMode="cover"/>
              )
            }
            <ActivityIndicator size="large" color="#007bff" />
            <Text className="text-lg">{message}</Text>
          </View>
        </View>
      </Modal>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

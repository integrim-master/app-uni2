import { View, Text, Animated, ImageBackground, Image, Pressable } from "react-native";
import React, { useEffect, useRef } from "react";
import { ProcedimientoIcon } from "../../GeneratorPicture";
import { TextContent, TextIntro, TextSubTitles, TextTitles } from "../../TextCustom";
import wpService from "../../../services/wordpress";
import { Link, router } from "expo-router";

export default function ItemUnique({ index, data, dark, light }) {
    const url = wpService.baseUrl;
    const originalUrl = data?.imagen;
    let urlFinal = null;
    if (typeof originalUrl === "string" && originalUrl.includes(".local")) {
        urlFinal = url + originalUrl.split(".local")[1];
    }
  return (
        <View className="border-hairline rounded-3xl overflow-hidden">
                <Pressable
                    onPress={()=>router.push(`/${data.procedimiento}`)}
                >
                    <ImageBackground
                    className="border-hairline rounded-3xl w-full h-48 "
                    style={{ borderColor: dark }}
                    source={{uri: urlFinal}}
                    resizeMode="cover"
                    >
                        <View className="flex-1 bg-black opacity-50 absolute w-full h-full">
                            
                        </View>
                        <View className="p-5 justify-end flex-1">

                        <TextIntro className="text-2xl capitalize font-semibold text-white">
                                {data.procedimientoLabel}
                            </TextIntro>
                            <TextSubTitles className="text-white">Cantidad de bonos a usar:{data.cantidad}</TextSubTitles>
                        </View>
                    </ImageBackground>
                </Pressable>
        </View>
  );
}

import { View, Text, Image, FlatList } from "react-native";
import { TextContent, TextSmall, TextSubTitles } from "../../TextCustom";
import { CalendarIcon, HelpIcon } from "../../Icons";
import ItemProduct from "./ItemProduct";

export default function ReportCard({ report, baseUrl }) {
  if (!report) return <Text>No tiene diagnósticos</Text>;
  const originalUrl = report?.imagen;
  let urlFinal = null;
  if (typeof originalUrl === "string" && originalUrl.includes(".local")) {
    urlFinal = baseUrl + originalUrl.split(".local")[1];
  } else {
    urlFinal = originalUrl;
  }


  return (
    <View className="py-5 bg-white rounded-3xl gap-5">
      <View className="justify-center items-center">
        <Text>{urlFinal}</Text>
        <Image source={{ uri: urlFinal }} className="w-96 h-96 rounded-3xl" resizeMode="cover"/>
      </View>
      <View className="px-5">
        <View className="flex-row gap-3 items-center">
          <View>
            <CalendarIcon/>
          </View>
          <View>
            <TextSubTitles style={{ fontWeight: "bold" }}>Fecha de realización: </TextSubTitles>
            <TextContent>{report.fecha}</TextContent>
          </View>

        </View>

        <TextSubTitles style={{ marginTop: 10, fontWeight: "bold" }}>Diagnóstico:</TextSubTitles>
        <View className="gap-5">
          {
            report.diagnostico.map((product, index) => (
              <View key={index} className="bg-gray-300 p-3 rounded-xl">
                <TextSubTitles className="font-bold">{product['nombre_diagnostico']}</TextSubTitles>
                <TextContent>{product['descripcion_diagnostico']}</TextContent>
              </View>
            ))
          }
        </View>
        <View className="flex-row gap-2 items-center mt-3">
          <HelpIcon/>
          <View className="flex-1">
            <TextSmall className="font-bold text-red-500">Importante:</TextSmall>
            <TextSmall className="font-bold text-red-500">Para un diagnóstico completo y preciso, agenda tu cita en nuestra sede y realiza el escáner con nuestra tecnología profesional.</TextSmall>
          </View>
        </View>
      </View>

    </View>
  );
}

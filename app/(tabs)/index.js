import { View, Text, ActivityIndicator, ScrollView, RefreshControl, Pressable, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { Screen } from '../../components/Screen'
import { ProfileElement } from '../../components/screen/home/ProfileElement'
import { Tarjeta } from '../../components/screen/home/Tarjeta'
import { AccesoDirecto } from '../../components/screen/home/AccesoDirecto'
import { HistorialCitas } from '../../components/screen/home/HistorialCitas'
import { Beneficios } from '../../components/screen/home/Beneficios'
import { Espace, Line } from '../../components/ElementsAux'
import { CalendarIcon, GiftIcon, NotificationIcon, TimeIcon } from '../../components/Icons'
import { useAuth } from '../../context/AuthContext'
import { useContext, useEffect } from 'react'
import SectionContainer from '../../components/SectionContainer'
import { Link, Stack, useRouter } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TextContent, TextIntro, TextSubTitles, TextTitles } from '../../components/TextCustom'
import { ItemsHistory } from '../../components/screen/History/ItemsHistory'
import Campana from '../../assets/images/campana.jpg'
import { CitasContext } from '../../context/CitasContext'
import { useNotifications } from '../../context/NotificationsContext'
import { useNotificationListener } from '../../hooks/useNotificationListener'

export default function index() {
  const { user, membership, loadAuth, token } = useAuth();
  const fullName = `${user.first_name} ${user.last_name}`;
  const { color1:dark, color2:light, color3:colorFondo } = membership.colors;
  const {benefits} = membership;
  const {citas, getCitas} = useContext(CitasContext)
  const router = useRouter();
  const { unreadCount } = useNotifications();
  useEffect(() =>{
    loadAuth();
    if(token) getCitas();
  }, [token])
  const dataButtons = [
    {item: "Agendar", routPage: "agendar", icon:CalendarIcon, dark, light, colorFondo},
    {item: "Beneficios", routPage: "beneficios", icon:GiftIcon, dark, light, colorFondo},
    {item: "Historial", routPage: "citas", icon:TimeIcon, dark, light, colorFondo},
  ]
  useNotificationListener();
  return (
    <ScrollView
    className="flex-1 gap-5" 
    showsVerticalScrollIndicator={false}
    >
      <Screen className="gap-8 pt-8">
        <Stack.Screen
          options={{
            headerShown: false
          }}/>
          <View className='justify-between flex-row'>
            <View className='w-10/12'>
              <TextIntro className='text-3xl ' adjustsFontSizeToFit numberOfLines={1}>{user.first_name} {user.last_name} 👋</TextIntro>
            </View>
            <View>
              <Pressable
                onPress={() =>router.push('/notificaciones')}
              >
                <NotificationIcon/>
                {unreadCount > 0 &&(
                  <View className={'absolute right-0 top-0 bg-red-500 rounded-full w-5 h-5 justify-center items-center'}>
                    <TextContent>{unreadCount}</TextContent>
                  </View>
                )
                
                }
              </Pressable>
            </View>
          </View>
          <Tarjeta nombre={fullName} dark={dark} light={light} colorFondo={colorFondo} membresia={user.membresia} amountBenefits={user.amountBenefits} countBenefits={user.countBenefits}/>
          <View className="flex-row gap-5 justify-between">
            {
              dataButtons.map((item, index) => (
                  <AccesoDirecto
                    key={index}
                    item={item.item}
                    icon={item.icon}
                    routPage={item.routPage}
                    dark={item.dark}
                    light={item.light}
                    colorFondo={item.colorFondo}
                  />
              ))
            }
          </View>
          <View className="gap-3">
            <View className="justify-between flex-row items-center">
              <TextTitles className="text-black font-medium">Próximas Citas</TextTitles>
              <Link asChild href={`/(tabs)/citas`}>        
                <Pressable>
                  {({ pressed }) => (
                    <TextContent className={`text-xl font-normal ${pressed ? "opacity-50" : "opacity-100"} text-gray-500`}>Ver todas</TextContent>
                  )}
                </Pressable>
              </Link>
            </View>
            <View className='bg-white rounded-3xl'>
              <View className="gap-1">
                <HistorialCitas dark={dark} citas={citas}/>
                <Line className="border-b-2 border-b-gray-100 h-1 w-full"/>
              </View>
            </View>
          </View>
          <View className="gap-3">
            <View className="justify-between flex-row items-center">
              <TextTitles className="text-black font-medium">Tus Beneficios</TextTitles>
              <Link asChild href={`/(tabs)/beneficios`}>        
                <Pressable>
                  {({ pressed }) => (
                    <TextContent className={`text-xl font-normal ${pressed ? "opacity-50" : "opacity-100"} text-gray-500`}>Ver todas</TextContent>
                  )}
                </Pressable>
              </Link>
            </View>
            <Beneficios dark={dark} light={light} colorFondo={colorFondo} benefits={benefits}/>
          </View>

          <View className="gap-3">
            <View className="justify-between flex-row items-center">
              <TextTitles className="text-black font-medium">Promociones exclusivas</TextTitles>
              <Link asChild href={`https://careme360.com/descubre-nuestras-promociones`}>        
                <Pressable>
                  {({ pressed }) => (
                    <TextContent className={`text-xl font-normal ${pressed ? "opacity-50" : "opacity-100"} text-gray-500`}>Ver todas</TextContent>
                  )}
                </Pressable>
              </Link>
            </View>
            <View className='flex-1 rounded-3xl'>
              <ImageBackground style={{borderRadius: 30}} className="w-full h-42 flex-1 justify-end items-start p-3" source={Campana} resizeMode='cover' >
                <TextTitles>Extreme Yosung</TextTitles>
                <Link asChild href={`https://wa.me/+573170366805?text=Hola%2C+quiero+saber+mas+informaci%C3%B3n+sobre+la+promoci%C3%B3n+de+EXTREME+YOUNG%2C+vengo+del+link+https%3A%2F%2Fcareme360.com%2Fpromocion%2Fextreme-young%2F`}>
                    <Pressable>
                      {({pressed})=>(
                        <TextContent className={`bg-white rounded-full p-3 ${pressed ? "opacity-50":"opacity-100"}`}>Solicitar ahora</TextContent>
                      )}
                    </Pressable>
                </Link>
              </ImageBackground>
            </View>
          </View>
    
      </Screen>
    </ScrollView>
  )
}

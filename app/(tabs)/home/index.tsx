
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import Blog from '../../../assets/svg/Blog.svg';
import SupportIcon from '../../../assets/svg/support.svg';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import HomeScreen from '../../../modules/home/screens/HomeScreen';
import { BenefitData, ButtonData, CitaData } from '../../../modules/home/types/home.types';
const mockCitas: CitaData[] = [
  {
    id: '1',
    procedimiento: 'Limpieza Facial',
    fecha: '2024-12-15',
    hora: '10:00',
    especialista: 'García',
    estado: 'Confirmada'
  },
  {
    id: '2',
    procedimiento: 'Masaje Relajante',
    fecha: '2024-12-20',
    hora: '14:30',
    especialista: 'López',
    estado: 'Pendiente'
  }
];

const mockBenefits: BenefitData[] = [
  {
    id: '1',
    procedimiento: 'Limpieza Facial',
    descripcion: 'Tratamiento completo',
    descuento: 30,
    estado: 'disponible',
    valor: 150000
  },
  {
    id: '2',
    procedimiento: 'Masaje',
    descripcion: 'Relajación total',
    descuento: 25,
    estado: 'disponible',
    valor: 120000
  },
  {
    id: '3',
    procedimiento: 'Manicure',
    descripcion: 'Cuidado de uñas',
    descuento: 15,
    estado: 'disponible',
    valor: 60000
  }
];

export default function Index() {
  const { user, membership, loadAuth } = useAuth();
  const { colors, isDark } = useTheme();

  useEffect(() => {
    loadAuth();
  }, []);

  if (!user || !membership) {
    return null; 
  }

  const fullName = user.display_name || 'Usuario';
  const { color1: dark, color2: light, color3: colorFondo } = membership.colors;

  const dataButtons: ButtonData[] = [
    { 
      item: "Blog", 
      routPage: "dates", 
      icon: Blog, 
      dark, 
      light, 
      colorFondo 
    },
       { 
      item: "Solicitudes", 
      routPage: "home/support", 
      icon:SupportIcon , 
      dark, 
      light, 
      colorFondo 
    },
    
  ];

  return (
    <ScrollView style={{ backgroundColor: colors.background }}
    >
   <StatusBar style={isDark ? "light" : "dark"} />
      <HomeScreen
        user={user}
        fullName={fullName}
        dark={dark}
        light={light}
        colorFondo={colorFondo}
        dataButtons={dataButtons}
        citas={mockCitas}
        benefits={mockBenefits}
      />
    </ScrollView>
  );
}

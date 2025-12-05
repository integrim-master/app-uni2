import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { BenefitData } from '../types/benefits.types';

interface ItemUniqueProps {
  index: number;
  dark: string;
  light: string;
  transparent: string;
  data: BenefitData;
  loading: boolean;
  onPress?: (item: BenefitData) => void;
}

export default function ItemUnique({ 
  index, 
  dark, 
  light, 
  transparent, 
  data, 
  loading,
  onPress 
}: ItemUniqueProps) {
  const { colors } = useTheme();

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'disponible': return colors.primary;
      case 'usado': return colors.primaryLight;
      case 'expirado': return colors.primaryDark;
      default: return colors.primary;
    }
  };

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case 'disponible': return 'Disponible';
      case 'usado': return 'Usado';
      case 'expirado': return 'Expirado';
      default: return 'Desconocido';
    }
  };

  return (
    <Pressable
      onPress={() => onPress?.(data)}
      style={[styles.card,
        {
          borderLeftColor: getEstadoColor(data.estado),
          backgroundColor: colors.card,
          shadowColor: colors.shadow,
        }
      ]}
      disabled={loading || data.estado !== 'disponible'}
    >
      <View style={styles.topRow}>
        <View style={styles.infoCol}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
            {data.procedimiento}
          </Text>
          <Text style={[styles.desc, { color: colors.textSecondary }]} numberOfLines={3}>
            {data.descripcion}
          </Text>
        </View>
        <View style={[styles.estadoBadge, { backgroundColor: getEstadoColor(data.estado) }]}> 
          <Text style={[styles.estadoText, { color: colors.background }]}>
            {getEstadoTexto(data.estado)}
          </Text>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <View>
          {data.descuento && (
            <Text style={[styles.discount, { color: colors.primaryDark }]}>
              {data.descuento}% de descuento
            </Text>
          )}
          {data.valor && (
            <Text style={[styles.value, { color: colors.textSecondary }]}>
              Valor: ${data.valor.toLocaleString()}
            </Text>
          )}
          {data.fechaExpiracion && (
            <Text style={[styles.expiry, { color: colors.primaryDark }]}>
              Expira: {new Date(data.fechaExpiracion).toLocaleDateString()}
            </Text>
          )}
        </View>
        {loading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : data.estado === 'disponible' ? (
          <View style={[styles.applyBtn, { backgroundColor: colors.primary }]}> 
            <Text style={[styles.applyText, { color: colors.background }]}>Aplicar</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    flexDirection: 'column',
    gap: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  infoCol: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#222',
  },
  desc: {
    color: '#666',
    marginBottom: 8,
    fontSize: 14,
  },
  estadoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  estadoText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discount: {
    color: '#B38E2C',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  value: {
    color: '#666',
    fontSize: 13,
  },
  expiry: {
    color: '#B38E2C',
    fontSize: 12,
  },
  applyBtn: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  applyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

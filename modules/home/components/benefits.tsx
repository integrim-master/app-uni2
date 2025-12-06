import { useTheme } from '@/context/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { memo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Giftsvg from '../../../assets/svg/Gift.svg';
import { BeneficiosProps, ItemsBenefitsProps } from '../types/home.types';
const ItemsBenefits = memo(({ dark, light, transparent, data }: ItemsBenefitsProps) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.itemContainer, { backgroundColor: colors.card, borderColor: colors.border }]}> 
      <View style={[styles.iconLeft, { backgroundColor: `${colors.primary}20` }]}> 
        <Giftsvg width={68} height={68} fill="white" />
      </View>
      <View style={styles.infoContent}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>{data.procedimiento}</Text>
        <Text style={[styles.desc, { color: colors.textLight }]} numberOfLines={2}>{data.descripcion}</Text>
        <View style={styles.usageRow}>
          <Text style={[styles.usageText, { color: colors.primary }]}>Usos limitados</Text>
        </View>
      </View>
      <View style={[styles.actionCircle, { backgroundColor: colors.primary }]}> 
        <Ionicons name="chevron-forward" size={26} color="white" />
      </View>
    </View>
  );
});

export function Beneficios({ dark, light, transparent, benefits }: BeneficiosProps) {
  return (
    <FlatList
      data={benefits}
      keyExtractor={(item) => item.id || item.procedimiento.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <ItemsBenefits
          dark={dark}
          light={light}
          transparent={transparent}
          data={item}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 22,
    borderRadius: 22,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 2,
    elevation: 1,
    width: 340,
    marginHorizontal: 14,
    marginVertical: 9,
    backgroundColor: '#fff',
    gap: 18,
  },
  iconLeft: {
    width: 82,
    height: 82,
    borderRadius: 41,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  actionCircle: {
    width: 34,
    height: 34,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  infoContent: {
    flex: 1,
    gap: 4,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 2,
  },
  desc: {
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 6,
  },
  usageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  usageText: {
    fontWeight: '700',
    fontSize: 13,
  },

});

import { useTheme } from '@/context/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { memo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { BeneficiosProps, ItemsBenefitsProps } from '../types/home.types';

const ItemsBenefits = memo(({ dark, light, transparent, data }: ItemsBenefitsProps) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.itemContainer, { backgroundColor: colors.card, borderColor: colors.primary }]}>
      <View style={styles.contentContainer}>
      <View style={[styles.containerIconFirst, { backgroundColor: `${colors.primary}20` }]}>
          <Ionicons name="gift-outline" size={25} color={colors.primary} />
      </View>
      
          <View style={styles.badgeText}>
            <Text style={{ color: colors.text, fontWeight: '600' }}>{data.procedimiento}</Text>
            <Text style={{ color: colors.textLight }}>
              {data.descripcion}
            </Text>
  
        </View>
        <View style={styles.usageContainer}>
          <Text style={[styles.usageText, { color: colors.primary }]}>
            Usos limitados 
          </Text>
        <View style={[styles.containerIcon, { backgroundColor: colors.primary }]}>
            <Ionicons name="chevron-forward-outline" size={20} color="#FFFFFF" />
        </View>
        </View>
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 280,
    marginHorizontal: 8,
  },
  contentContainer: {
    display: 'flex',
    gap: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '',
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    gap: 4,
  },
  usageContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  usageText: {
    fontWeight: '800',
  },
  containerIcon: {
    borderRadius: 999,
    padding: 2,
  },
  containerIconFirst: {
    borderRadius: 999,
    padding: 4,
  },
});

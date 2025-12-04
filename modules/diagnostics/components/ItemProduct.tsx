import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ItemProductProps, Product } from '../types/diagnostics.types';

export default function ItemProduct({ data, fondo, productReport }: ItemProductProps) {
  const filteredProducts = data.filter(product => 
    productReport.some(proc => 
      product.categoria.toLowerCase().includes(proc.toLowerCase()) ||
      product.nombre.toLowerCase().includes(proc.toLowerCase())
    )
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <Pressable style={styles.productCard}>
      {item.imagen && (
        <Image 
          source={{ uri: item.imagen }}
          style={styles.productImage}
        />
      )}
      <Text style={styles.productName} numberOfLines={2}>
        {item.nombre}
      </Text>
      <Text style={styles.productDescription} numberOfLines={3}>
        {item.descripcion}
      </Text>
      <View style={[styles.priceContainer, { backgroundColor: fondo }]}>
        <Text style={styles.priceText}>
          ${item.precio.toLocaleString()}
        </Text>
      </View>
    </Pressable>
  );

  if (filteredProducts.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Productos Recomendados</Text>
        <Text style={styles.noProductsText}>
          No hay productos disponibles para este diagnóstico
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Productos Recomendados
      </Text>
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
    color: '#1a1a1a'
  },
  noProductsText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 14,
    paddingHorizontal: 16
  },
  listContainer: {
    paddingHorizontal: 16
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#1a1a1a'
  },
  productDescription: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
    lineHeight: 18
  },
  priceContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start'
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1a1a1a'
  }
});
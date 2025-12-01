import { View, FlatList, Dimensions } from 'react-native';
import React, { memo } from 'react';
import { ItemsBenefits as OriginalItemsBenefits } from '../Benefits/ItemsBenefits';

// ✅ Memoizamos el componente para evitar renders innecesarios
const ItemsBenefits = memo(OriginalItemsBenefits);

export function Beneficios({ dark, light, transparent, benefits }) {
  const { width } = Dimensions.get('window');
  const SPACING = 0;
  const ITEM_WIDTH = width * 0.8;

  return (
    <FlatList
      data={benefits}
      keyExtractor={(item) => item.procedimiento.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={ITEM_WIDTH + SPACING}
      decelerationRate="fast"
      ItemSeparatorComponent={() => <View style={{ width: SPACING }} />}
      renderItem={({ item }) => (
        <View style={{ width: ITEM_WIDTH }}>
          <ItemsBenefits
            dark={dark}
            light={light}
            transparent={transparent}
            data={item}
          />
        </View>
      )}
      getItemLayout={(_, index) => ({
        length: ITEM_WIDTH + SPACING,
        offset: (ITEM_WIDTH + SPACING) * index,
        index,
      })}
      // ✅ Control de performance
      initialNumToRender={3}
      maxToRenderPerBatch={5}
      windowSize={5}
      removeClippedSubviews
    />
  );
}

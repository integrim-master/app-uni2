import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import ItemUnique from '../../components/screen/Benefits/ItemUnique';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '../../components/Screen';
import SectionContainer from '../../components/SectionContainer';
import { ItemsBenefits } from '../../components/screen/Benefits/ItemsBenefits';

export default function beneficios() {
  const { membership, refreshUserData, loading, token } = useAuth();
  const { color1:dark, color2:light, color3:transparent } = membership.colors;
  const {benefits} = membership
  const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
    setRefreshing(true);
    await refreshUserData(); // actualiza datos desde WP
    setRefreshing(false);
  };

  if (!benefits) {
    return <Text>No hay beneficios disponibles.</Text>;
  }
  return (
    <Screen style={{paddingBottom: 5}}>
      <FlatList
        data={benefits}
        keyExtractor={(item, index) => `${item.procedimiento}-${index}`}
        renderItem={({ item, index }) => (
          <ItemUnique
            index={index}
            dark={dark}
            light={light}
            transparent={transparent}
            data={item}
            loading={loading}
          />
        )}
        ItemSeparatorComponent={() => <View className='h-4' />}
        ListEmptyComponent={<Text>No Cuentas con Beneficios</Text>}
        refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#000']} />
      }
      />
    </Screen>
  )
}
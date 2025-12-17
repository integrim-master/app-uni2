import { Screen } from '@/src/components/shared/Screen';
import { useBenefit } from '@/src/modules/benefits/hooks/useBenefits';
import BenefitScreen from '@/src/modules/benefits/screens/BenefitScreen';
import { BenefitApiResponse } from '@/src/modules/benefits/types/benefits.types';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';


export default function Index() {
  const { id_benefits } = useLocalSearchParams();
  const { mutate, data, isPending } = useBenefit();

  useEffect(() => {
    if (id_benefits) {
      mutate(
        { uid: id_benefits as string },
       
      );
    }
  }, [id_benefits]);

  const benefit = data as BenefitApiResponse

  return (
    <Screen>
      <Stack.Screen
        options={{
          title: benefit?.title ? `${benefit.title}` : `Beneficio ${id_benefits}`,
          headerShadowVisible: false,
        }}
      />

      <BenefitScreen benefit={benefit} isPending={isPending} />
    </Screen>
  );
}
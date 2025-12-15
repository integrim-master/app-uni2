import { Screen } from '@/components/shared/Screen';
import { useBenefit } from '@/modules/benefits/hooks/useBenefits';
import BenefitScreen from '@/modules/benefits/screens/BenefitScreen';
import { BenefitApiResponse } from '@/modules/benefits/types/benefits.types';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';


export default function Index() {
  const { id_benefits } = useLocalSearchParams();
  const { mutate, data, isPending } = useBenefit();

  useEffect(() => {
    if (id_benefits) {
      mutate(
        { uid: id_benefits as string },
        {
          onSuccess: (data) => {
            console.log("Benefit fetch successful:", data);
          },
          onError: (error) => {
            console.log("Error fetching benefit:", error);
          },
        }
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
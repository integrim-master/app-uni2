import { Screen } from '@/src/components/shared/Screen';
import { useBenefit } from '@/src/modules/benefits/hooks/useBenefits';
import BenefitScreen from '@/src/modules/benefits/screens/BenefitScreen';
import { Stack, useLocalSearchParams } from 'expo-router';

export default function Index() {
  const { id_benefits } = useLocalSearchParams<{ id_benefits: string }>();

  const {
    data: benefit,
    isLoading,
    isError,
  } = useBenefit(id_benefits);

  return (
    <Screen>
      <Stack.Screen
        options={{
          title: benefit?.title ?? 'Beneficio',
          headerShadowVisible: false,
        }}
      />

      <BenefitScreen
        benefit={benefit as any}
        isPending={isLoading}
      />
    </Screen>
  );
}

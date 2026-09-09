'use client';

import { Screen, Text, YStack } from '@project/ui';

export function StarterScreen() {
  return (
    <Screen>
      <YStack gap="$md">
        <Text fontSize="$8" fontWeight="700">Starter pack</Text>
        <Text>Cette surface partage les composants de @project/ui entre le web et le mobile.</Text>
      </YStack>
    </Screen>
  );
}

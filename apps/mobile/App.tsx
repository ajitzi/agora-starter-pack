import { StarterScreen } from '@project/screens';
import { UiProvider } from '@project/ui';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <UiProvider>
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom', 'left', 'right']}>
          <StarterScreen />
        </SafeAreaView>
      </UiProvider>
    </SafeAreaProvider>
  );
}

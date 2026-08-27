import type { TamaguiBuildOptions } from '@tamagui/core';

export default {
  components: ['tamagui', '@project/ui', '@project/screens'],
  config: '../../packages/ui/src/config.ts',
  outputCSS: './src/app/tamagui.generated.css',
} satisfies TamaguiBuildOptions;

import type { ReactNode } from 'react';
import './tamagui.generated.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="fr"><body>{children}</body></html>;
}
